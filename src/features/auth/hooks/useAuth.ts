import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser, logout } from '../store/auth.slice'
import type { AppDispatch, RootState } from '@/app/store'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isAuthReady } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthReady) {
      dispatch(fetchUser())
    }
  }, [dispatch, isAuthReady])

  return {
    user,
    isAuthReady,
    fetchAdmin: () => dispatch(fetchUser()),
    logout: () => dispatch(logout()),
  }
}
