import { z } from 'zod'
import { productSchema } from './product.schema'

export const PaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  })

/**
 * Concrete paginated products schema + types
 */
export const PaginatedProductsSchema = PaginatedSchema(productSchema)
export type PaginatedProducts = z.infer<typeof PaginatedProductsSchema>
