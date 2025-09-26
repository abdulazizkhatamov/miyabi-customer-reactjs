import { useEffect, useRef } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.config'
import ProductCard from '@/shared/components/product-card'

function CategoryProducts({
  categorySlug,
  categoryName,
}: {
  categorySlug: string
  categoryName: string
}) {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['products', categorySlug],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosInstance.get('/products', {
          params: { categorySlug, page: pageParam, limit: 6 },
        })
        return res.data
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })

  // infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {categoryName}
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }}
          gap={2}
        >
          {data?.pages.flatMap((p: any) =>
            p.data.map((prod: any) => (
              <ProductCard key={prod.id} product={prod} />
            )),
          )}
        </Box>
      )}

      <div ref={loaderRef} />
      {isFetchingNextPage && <CircularProgress />}
    </Box>
  )
}

export default CategoryProducts
