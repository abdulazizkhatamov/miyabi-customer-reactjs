import z from 'zod'
import { imageSchema } from '@/shared/schema/image.schema'

export const productSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  weight: z.number(),
  price: z.string(), // string because your API returns it as string
  status: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  category_id: z.string().uuid(),
  images: z.array(imageSchema), // adjust if images are objects
})

export type Product = z.infer<typeof productSchema>
