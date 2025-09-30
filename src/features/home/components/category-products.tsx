import { useEffect, useRef } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import ProductCard from '@/shared/components/product-card'
import { useProducts } from '@/shared/api/product.api'

function CategoryProducts({
  categorySlug,
  categoryName,
}: {
  categorySlug: string
  categoryName: string
}) {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProducts(categorySlug)

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
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)', // 2 per row on extra-small screens
            md: 'repeat(3, 1fr)', // 3 per row on medium screens
            lg: 'repeat(4, 1fr)', // 4 per row on large screens
          }}
          gap={2}
        >
          {data?.pages.flatMap((page) =>
            page.data.map((prod) => (
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
