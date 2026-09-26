import { z } from 'zod';
import { JobType } from '@prisma/client';

export const jobQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    jobType: z.nativeEnum(JobType).optional(),
    page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  }),
});

export const createJobSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Job title is required' }).min(3, 'Title must be at least 3 characters'),
    category: z.string().optional(),
    jobType: z.nativeEnum(JobType, { required_error: 'Job type is required' }),
    experience: z.string({ required_error: 'Experience requirement is required' }),
    salaryMin: z.number().optional(),
    salaryMax: z.number().optional(),
    location: z.string({ required_error: 'Job location is required' }),
    city: z.string({ required_error: 'City is required' }),
    description: z.string({ required_error: 'Job description is required' }).min(10, 'Description must be detailed'),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    contactPhone: z.string().optional(),
    contactEmail: z.string().email().optional(),
    internalNotes: z.string().optional(),
  }),
});

export const applyJobSchema = z.object({
  body: z.object({
    coverLetter: z.string().optional(),
    resumeUrl: z.string({ required_error: 'Resume URL is required' }).url('Invalid resume URL link'),
  }),
});
