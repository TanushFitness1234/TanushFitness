import { z } from 'zod';

export const createServiceEnquirySchema = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'Service ID is required' }),
    gymName: z.string({ required_error: 'Gym name is required' }).min(2, 'Gym name is required'),
    city: z.string({ required_error: 'City is required' }).min(2, 'City is required'),
    contactName: z.string({ required_error: 'Contact name is required' }),
    contactEmail: z.string({ required_error: 'Contact email is required' }).email('Invalid email address'),
    contactPhone: z.string({ required_error: 'Contact phone is required' }).min(10, 'Valid phone number required'),
    requirements: z.string({ required_error: 'Requirements description is required' }).min(10, 'Please describe your service requirements'),
    preferredDate: z.string().optional(),
  }),
});
