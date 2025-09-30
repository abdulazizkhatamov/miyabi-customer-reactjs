import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.config'

// 🔹 Add item to cart (increment)
export function useAddToCart() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.post('/cart/add', { productId, quantity: 1 }),

    onMutate: async (productId: string) => {
      await qc.cancelQueries({ queryKey: ['session'] })
      const previous = qc.getQueryData(['session'])

      qc.setQueryData(['session'], (old: any) => {
        const cart = old?.cart?.items || []
        const index = cart.findIndex((i: any) => i.id === productId)

        if (index > -1) cart[index].quantity += 1
        else cart.push({ id: productId, quantity: 1 })

        return { ...old, cart: { ...old.cart, items: cart } }
      })

      return { previous }
    },

    onError: (_err, _variables, context: any) => {
      qc.setQueryData(['session'], context?.previous)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['session'] })
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
      await qc.cancelQueries({ queryKey: ['session'] })
      const previous = qc.getQueryData(['session'])

      qc.setQueryData(['session'], (old: any) => {
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
      qc.setQueryData(['session'], context?.previous)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['session'] })
    },
  })
}
