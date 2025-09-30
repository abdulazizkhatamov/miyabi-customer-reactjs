import { useQuery } from '@tanstack/react-query'
import type { Category } from '../schema/category.schema'
import axiosInstance from '@/config/axios.config'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosInstance.get('/categories')
      return res.data as Array<Category>
    },
  })
}
