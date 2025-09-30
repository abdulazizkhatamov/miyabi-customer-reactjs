import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.config'

// 🔹 Add item to cart (increment)
export function useAddToCart() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.post('/cart/add', { productId, quantity: 1 }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['session'] })
    },
  })
}

// 🔹 Remove item from cart (decrement or full remove if <= 0)
export function useRemoveFromCart() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) =>
      axiosInstance.post('/cart/remove', { productId, quantity: 1 }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['session'] })
    },
  })
}
