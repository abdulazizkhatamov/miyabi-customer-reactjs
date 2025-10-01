import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User } from '../schema/session.schema'
import axiosInstance from '@/config/axios.config'

// 🔹 Central Session type
export interface Session {
  user: User | null
}

// 🔹 Session query
export function useSession() {
  return useQuery<Session>({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/session')
      return res.data as Session
    },
  })
}

// 🔹 Login mutation
export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      axiosInstance.post('/auth/login', data),
    onSuccess: () => {
      // Refresh session on successful login
      qc.invalidateQueries({ queryKey: ['session'] })
    },
  })
}

// 🔹 Logout mutation
export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: () => {
      // Clear cached session after logout
      qc.invalidateQueries({ queryKey: ['session'] })
    },
  })
}
