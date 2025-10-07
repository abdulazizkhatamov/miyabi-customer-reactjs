import { useInfiniteQuery } from '@tanstack/react-query'
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

export const useProducts = (categoryId: string, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, categoryId }),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled,
    initialPageParam: null,
  })
}
