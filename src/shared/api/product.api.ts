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

const fetchSearchedProducts = async ({
  q,
  category,
  page = 1,
  limit = 7,
}: {
  q: string
  category?: string
  page?: number
  limit?: number
}) => {
  const res = await axiosInstance.get('/products/search', {
    params: { q, category, page, limit },
  })
  return res.data
}

// Query options
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

export const searchProductsQuery = (q: string, category?: string, page = 1) => {
  return queryOptions({
    queryKey: ['searchProducts', { q, category, page }],
    queryFn: () => fetchSearchedProducts({ q, category, page }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1, // 1 minute cache
  })
}
