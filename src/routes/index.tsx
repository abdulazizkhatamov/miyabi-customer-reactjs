import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Skeleton, Typography } from '@mui/material'
import type { Banner } from '@/features/banners/schema/banner.schema'
import axiosInstance from '@/config/axios.config'
import BannersCarousel from '@/features/banners/components/banners-carousel'

// ✅ query factory (exportable)
export const bannersQuery = () =>
  queryOptions<Array<Banner>>({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/banners')
      return data
    },
  })

// ✅ prefetch on route load
export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(bannersQuery()),
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isFetching, isError } = useQuery(bannersQuery())

  if (isFetching && !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        maxWidth="1024px"
        mx="auto"
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ borderRadius: 2 }}
        />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography color="error">
          Failed to load banners. Please try again later.
        </Typography>
      </Box>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography color="text.secondary">No banners available</Typography>
      </Box>
    )
  }

  return <BannersCarousel banners={data} />
}
