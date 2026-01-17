import { createAsyncThunk } from "@reduxjs/toolkit"
import type { RegisterForm, User, LoginForm } from "../../types/auth"
import type { ServerError } from "../../types/errors"
import axiosClient from "../../utils/axiosClient"
import { AxiosError } from "axios"

// Register user
export const registerUser = createAsyncThunk<
  User, // Return type (User or whatever the API returns)
  RegisterForm, // Argument type
  { rejectValue: ServerError } // Reject value type
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post("/auth", userData)
    return data
  } catch (err) {
    const error = err as AxiosError<ServerError>
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
    return rejectWithValue({ message: "Error in register user action" })
  }
})

// Login user
export const loginUser = createAsyncThunk<
  User, // Return type (User or whatever the API returns)
  LoginForm, // Argument type
  { rejectValue: ServerError } // Reject value type
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post("/auth/login", userData)
    return data
  } catch (err) {
    const error = err as AxiosError<ServerError>
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
    return rejectWithValue({ message: "Error in login user action" })
  }
})
