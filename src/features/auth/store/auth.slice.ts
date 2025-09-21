// features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '@/config/axios.config'

export interface User {
  id: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthReady: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthReady: false,
}

// thunk to fetch current admin
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await axiosInstance.get('/auth/profile')
  return res.data.user as User
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthReady = true
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null
        state.isAuthReady = true
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
