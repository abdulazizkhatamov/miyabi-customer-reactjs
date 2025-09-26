// features/banners/components/banners-section.tsx
import { Box, Skeleton, Typography } from '@mui/material'
import { useQueryBanners } from '../hooks/useQuery'
import BannersCarousel from './banners-carousel'

export function BannersSection() {
  const { data, isFetching, isError } = useQueryBanners()

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
    return null
  }

  return <BannersCarousel banners={data} />
}
