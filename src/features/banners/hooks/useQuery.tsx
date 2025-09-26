import { useQuery } from '@tanstack/react-query'
import type { Banner } from '../schema/banner.schema'
import axiosInstance from '@/config/axios.config'

export const useQueryBanners = () => {
  return useQuery<Array<Banner>>({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/banners')
      return data
    },
  })
}
