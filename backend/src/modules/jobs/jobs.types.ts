import { JobType } from '@prisma/client';

export interface CreateJobInput {
  title: string;
  category?: string;
  jobType: JobType;
  experience: string;
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  city: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  contactPhone?: string;
  contactEmail?: string;
  internalNotes?: string;
}

export interface ApplyJobInput {
  coverLetter?: string;
  resumeUrl: string;
}

export interface JobQueryFilters {
  search?: string;
  location?: string;
  jobType?: JobType;
  page?: number;
  limit?: number;
}
