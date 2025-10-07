import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import type { Product } from '../schema/product.schema'
import axiosInstance from '@/config/axios.config'

const fetchProducts = async ({
  pageParam = null,
  categoryId,
}: {
  pageParam?: string | null
  categoryId: string
}) => {
  const res = await axiosInstance.get('/products', {
    params: { categoryId, cursor: pageParam },
  })
  return res.data
}

const fetchProduct = async ({ slug }: { slug: string }) => {
  const res = await axiosInstance.get(`/products/${slug}`)
  return res.data as Product
}

export const productsQuery = (categoryId: string, enabled: boolean) => {
  return infiniteQueryOptions({
    queryKey: ['products', categoryId],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, categoryId }),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled,
    initialPageParam: null,
  })
}

export const productQuery = (slug: string) => {
  return queryOptions({
    queryKey: ['products', slug],
    queryFn: () => fetchProduct({ slug }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
