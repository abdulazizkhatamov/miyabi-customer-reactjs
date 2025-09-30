import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
})

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

export type User = z.infer<typeof userSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
