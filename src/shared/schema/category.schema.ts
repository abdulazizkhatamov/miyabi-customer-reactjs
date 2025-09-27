import z from 'zod'
import { imageSchema } from '@/shared/schema/image.schema'

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  images: z.array(imageSchema),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Category = z.infer<typeof categorySchema>
