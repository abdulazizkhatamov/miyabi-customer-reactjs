import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.config'

const fetchProducts = async ({
  pageParam = null,
  categoryId,
}: {
  pageParam?: string | null
  categoryId: string
}) => {
  const res = await axiosInstance.get('/api/products', {
    params: { categoryId, cursor: pageParam, take: 10 },
  })
  return res.data // { products: Product[], nextCursor: string | null }
}

export const useProducts = (categoryId: string) => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, categoryId }),
    initialPageParam: '1',
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: !!categoryId, // wait until categoryId is set
  })
}
