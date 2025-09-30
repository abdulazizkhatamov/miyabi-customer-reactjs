// features/session/session.slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '@/config/axios.config'

export interface User {
  id: string
  email: string
}

export interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  image?: string
}

export interface Cart {
  items: Array<CartItem>
  totalQuantity: number
  totalPrice: string
}

interface SessionState {
  user: User | null
  cart: Cart | null
  isLoggedIn: boolean
}

const initialState: SessionState = {
  user: null,
  cart: null,
  isLoggedIn: false,
}

export const fetchSession = createAsyncThunk(
  'session/fetchSession',
  async () => {
    const res = await axiosInstance.get('/session')
    return res.data as { user: User | null; cart: Cart | null }
  },
)

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isLoggedIn = false
    },
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload
    },
    clearCart(state) {
      state.cart = { items: [], totalQuantity: 0, totalPrice: '0.00' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoggedIn = !!action.payload.user
        state.cart = action.payload.cart ?? {
          items: [],
          totalQuantity: 0,
          totalPrice: '0.00',
        }
      })
      .addCase(fetchSession.rejected, (state) => {
        state.user = null
        state.isLoggedIn = false
        state.cart = { items: [], totalQuantity: 0, totalPrice: '0.00' }
      })
  },
})

export const { logout, setCart, clearCart } = sessionSlice.actions
export default sessionSlice.reducer
