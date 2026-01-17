import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../types/auth"
import type { ServerError } from "../../types/errors"
import { registerUser, loginUser } from "./authActions"

export interface AuthState {
  user: User | undefined
  isLogin: boolean
  loading: boolean
  error?: ServerError
}

const initialState: AuthState = {
  user: undefined,
  isLogin: false,
  loading: false,
  error: undefined,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Register user ---
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = undefined
      state.loading = false
      state.user = action.payload
      state.isLogin = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload || { message: "Register user failed" }
      state.user = undefined
      state.isLogin = false
      state.loading = false
    })
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = undefined
      state.isLogin = false
      state.user = undefined
    })
    // --- Login user ---
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.error = undefined
      state.loading = false
      state.user = action.payload
      state.isLogin = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload || { message: "Login user failed" }
      state.user = undefined
      state.isLogin = false
      state.loading = false
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = undefined
      state.isLogin = false
      state.user = undefined
    })
  },
})
export default authSlice.reducer
