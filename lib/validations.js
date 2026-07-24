import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  budget: z.enum(['Under $1,000', '$1,000–$5,000', '$5,000–$10,000', '$10,000+'], {
    errorMap: () => ({ message: 'Please select a valid budget range.' }),
  }),
  message: z.string().min(20, 'Message must be at least 20 characters.').max(1000, 'Message cannot exceed 1000 characters.'),
});