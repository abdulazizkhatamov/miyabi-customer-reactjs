import z from 'zod'

export const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  quantity: z.number(),
  image: z.string(),
})

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  totalQuantity: z.number(),
  totalPrice: z.string(),
})

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
