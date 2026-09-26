import { z } from 'zod';

export const productQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    type: z.string().optional(),
    application: z.string().optional(),
    page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 12)),
  }),
});

export const createEquipmentEnquirySchema = z.object({
  body: z.object({
    gymName: z.string({ required_error: 'Gym name is required' }).min(2, 'Gym name must be at least 2 characters'),
    city: z.string({ required_error: 'City is required' }).min(2, 'City is required'),
    contactName: z.string({ required_error: 'Contact name is required' }),
    contactEmail: z.string({ required_error: 'Contact email is required' }).email('Invalid email address'),
    contactPhone: z.string({ required_error: 'Contact phone is required' }).min(10, 'Valid phone number required'),
    notes: z.string().optional(),
    items: z
      .array(
        z.object({
          productId: z.string({ required_error: 'Product ID is required' }),
          quantity: z.number().min(1, 'Quantity must be at least 1').default(1),
          notes: z.string().optional(),
        })
      )
      .min(1, 'At least one equipment item is required in the RFQ enquiry'),
  }),
});
