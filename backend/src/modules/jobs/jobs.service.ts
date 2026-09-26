import { UserRole } from '@prisma/client';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { CreateJobInput, ApplyJobInput, JobQueryFilters } from './jobs.types';

export class JobsService {
  /**
   * Helper: Sanitize Job Details for Public Viewers (Strip recruiter contact phone & email for privacy)
   */
  private static sanitizePublicJob(job: any) {
    const { contactPhone, contactEmail, ...publicJob } = job;
    return publicJob;
  }

  /**
   * Public: Query & Filter Active Jobs
   */
  static async getJobs(filters: JobQueryFilters) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, Math.min(100, filters.limit || 10));
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      deletedAt: null,
    };

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }

    if (filters.jobType) {
      where.type = filters.jobType;
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          gymOwner: {
            select: {
              id: true,
              companyName: true,
              city: true,
            },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    // Sanitize contact info from all public listings
    const sanitizedJobs = jobs.map(j => this.sanitizePublicJob(j));

    return {
      jobs: sanitizedJobs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Public Sanitized Job Details / Employer Unmasked View
   */
  static async getJobById(id: string, requestingUserId?: string, requestingUserRole?: UserRole) {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        gymOwner: {
          select: {
            id: true,
            companyName: true,
            city: true,
            address: true,
          },
        },
      },
    });

    if (!job || !job.isActive || job.deletedAt) {
      throw ApiError.notFound('Job posting not found');
    }

    // Check if requester is the Gym Owner creator OR an Admin
    const isEmployerOwner = requestingUserId && job.createdById === requestingUserId;
    const isAdmin = requestingUserRole === UserRole.ADMIN;

    if (isEmployerOwner || isAdmin) {
      // Expose recruiter contact info only to job creator or admin
      return job;
    }

    // Public / Candidate view: Strip recruiter phone & email for privacy
    return this.sanitizePublicJob(job);
  }

  /**
   * Protected (GYM_OWNER Only): Post a New Job
   */
  static async createJob(userId: string, input: CreateJobInput) {
    const gymOwner = await prisma.gymOwner.findUnique({
      where: { userId },
    });

    if (!gymOwner) {
      throw ApiError.forbidden('Only registered Gym Owners can post jobs');
    }

    const slug = `${input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    const salaryRange = input.salaryMin && input.salaryMax
      ? `₹${input.salaryMin.toLocaleString()} - ₹${input.salaryMax.toLocaleString()}`
      : 'Competitive';

    const newJob = await prisma.job.create({
      data: {
        gymOwnerId: gymOwner.id,
        createdById: userId,
        title: input.title,
        slug,
        category: input.category || 'Fitness & Training',
        gymName: gymOwner.companyName,
        type: input.jobType,
        experience: input.experience,
        salaryRange,
        location: input.location,
        description: input.description,
        requirements: input.requirements || [],
        isActive: true,
      },
      include: {
        gymOwner: {
          select: { id: true, companyName: true, city: true },
        },
      },
    });

    return newJob;
  }

  /**
   * Protected (JOB_SEEKER Only): Apply for a Job
   */
  static async applyForJob(userId: string, jobId: string, input: ApplyJobInput) {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId },
      include: {
        user: { select: { email: true, mobile: true, name: true } },
      },
    });

    if (!jobSeeker) {
      throw ApiError.forbidden('Only registered Job Seekers can apply for jobs');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || !job.isActive || job.deletedAt) {
      throw ApiError.notFound('Job posting not found or is no longer active');
    }

    // Check duplicate application by jobSeekerId and jobId
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        jobSeekerId: jobSeeker.id,
      },
    });

    if (existingApplication) {
      throw ApiError.conflict('You have already applied for this job');
    }

    const application = await prisma.$transaction(async tx => {
      const app = await tx.jobApplication.create({
        data: {
          jobId,
          jobSeekerId: jobSeeker.id,
          fullName: jobSeeker.fullName || jobSeeker.user.name || 'Applicant',
          mobile: jobSeeker.phone || jobSeeker.user.mobile || '',
          email: jobSeeker.user.email,
          resumeUrl: input.resumeUrl,
          experience: jobSeeker.experience || null,
          preferredCity: jobSeeker.preferredCity || null,
          skills: jobSeeker.skills || [],
        },
      });

      // Increment job applications count
      await tx.job.update({
        where: { id: jobId },
        data: { applicationsCount: { increment: 1 } },
      });

      return app;
    });

    return application;
  }

  /**
   * Protected & Scoped: View Applications & Candidate Resumes for a Job
   * Access Rule: STRICTLY SCOPED to the specific Gym Owner who created the job (or Admin).
   */
  static async getJobApplications(userId: string, userRole: UserRole, jobId: string) {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, createdById: true, title: true },
    });

    if (!job) {
      throw ApiError.notFound('Job posting not found');
    }

    // Ownership Enforcement: Gym Owner MUST be the creator of this job posting
    if (userRole !== UserRole.ADMIN && job.createdById !== userId) {
      throw ApiError.forbidden('You can only view applications for jobs posted by your gym.');
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        jobSeeker: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            preferredCity: true,
            experience: true,
            skills: true,
            resumeUrl: true,
          },
        },
      },
    });

    return {
      jobTitle: job.title,
      totalApplications: applications.length,
      applications,
    };
  }
}
