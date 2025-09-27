import z from 'zod'
import { imageSchema } from '@/shared/schema/image.schema'

export const bannerSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(imageSchema),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Banner = z.infer<typeof bannerSchema>
