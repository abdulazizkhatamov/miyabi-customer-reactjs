import { useInfiniteQuery } from '@tanstack/react-query'
import { productsPageSchema } from '../schema/product.schema'
import type { ProductsPage } from '../schema/product.schema'
import axiosInstance from '@/config/axios.config'

export function useProducts(categorySlug?: string, limit = 8) {
  return useInfiniteQuery<ProductsPage>({
    queryKey: ['products', categorySlug],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get('/products', {
        params: { categorySlug, page: pageParam, limit },
      })
      // ✅ validate response at runtime
      return productsPageSchema.parse(res.data)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
