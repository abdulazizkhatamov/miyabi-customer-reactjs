import { queryOptions } from '@tanstack/react-query'
import type { Category } from '../schema/category.schema'
import axiosInstance from '@/config/axios.config'

const fetchCategories = async () => {
  const res = await axiosInstance.get('/categories')
  return res.data as Array<Category>
}

export function categoriesQuery() {
  return queryOptions({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
