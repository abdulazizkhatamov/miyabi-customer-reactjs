// hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.config'

export async function getCart() {
  const res = await axiosInstance.get('/cart')
  return res.data
}

export async function updateCart(
  items: Array<{ id: string; quantity: number }>,
) {
  const res = await axiosInstance.post('/cart/update', { items })
  return res.data
}

export async function clearCart() {
  const res = await axiosInstance.post('/cart/clear')
  return res.data
}

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  })
}

export function useCartMutations() {
  const queryClient = useQueryClient()

  const addToCart = useMutation({
    mutationFn: async (id: string) => {
      const currentCart = queryClient.getQueryData<any>(['cart'])
      const items = [...(currentCart?.items ?? [])]
      const item = items.find((i) => i.id === id)
      if (item) {
        item.quantity += 1
      } else {
        items.push({ id, quantity: 1 })
      }
      return updateCart(items)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const removeFromCart = useMutation({
    mutationFn: async (id: string) => {
      const currentCart = queryClient.getQueryData<any>(['cart'])
      let items =
        currentCart?.items.map((i: any) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        ) ?? []

      items = items.filter((i: any) => i.quantity > 0)
      return updateCart(items)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return { addToCart, removeFromCart }
}
