import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Cart } from '../schema/cart.schema'
import axiosInstance from '@/config/axios.config'

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await axiosInstance.get('/cart')
      return res.data as Cart
    },
  })
}

// 🔹 Add item to cart (increment)
export function useAddToCart() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.post('/cart/add', { productId, quantity: 1 }),

    onMutate: async (productId: string) => {
      await qc.cancelQueries({ queryKey: ['cart'] })
      const previous = qc.getQueryData(['cart'])

      qc.setQueryData(['cart'], (old: any) => {
        const cart = old?.cart?.items || []
        const index = cart.findIndex((i: any) => i.id === productId)

        if (index > -1) cart[index].quantity += 1
        else cart.push({ id: productId, quantity: 1 })

        return { ...old, cart: { ...old.cart, items: cart } }
      })

      return { previous }
    },

    onError: (_err, _variables, context: any) => {
      qc.setQueryData(['cart'], context?.previous)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

// 🔹 Remove item from cart (decrement)
export function useRemoveFromCart() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.post('/cart/remove', { productId, quantity: 1 }),

    onMutate: async (productId: string) => {
      await qc.cancelQueries({ queryKey: ['cart'] })
      const previous = qc.getQueryData(['cart'])

      qc.setQueryData(['cart'], (old: any) => {
        const cart = old?.cart?.items || []
        const index = cart.findIndex((i: any) => i.id === productId)

        if (index > -1) {
          const newQty = cart[index].quantity - 1
          if (newQty > 0) cart[index].quantity = newQty
          else cart.splice(index, 1)
        }

        return { ...old, cart: { ...old.cart, items: cart } }
      })

      return { previous }
    },

    onError: (_err, _variables, context: any) => {
      qc.setQueryData(['cart'], context?.previous)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
