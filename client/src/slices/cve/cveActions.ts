import { createAsyncThunk } from "@reduxjs/toolkit"
import type { CVE } from "../../types/cve"
import type { ServerError } from "../../types/errors"
import axiosClient from "../../utils/axiosClient"
import { AxiosError } from "axios"

// Register user
export const getCves = createAsyncThunk<
  CVE[], // Return type (User or whatever the API returns)
  { page: number }, // Argument type
  { rejectValue: ServerError } // Reject value type
>("cve/getCves", async ({ page }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get(`/cve/${page}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ServerError>
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
    return rejectWithValue({ message: "Error in get CVES action" })
  }
})

export const getCVEById = createAsyncThunk<
  CVE,
  { cveId: string },
  { rejectValue: ServerError }
>("cve/getCVEById", async ({ cveId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get(`/cve/cveById/${cveId}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ServerError>
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    }
    return rejectWithValue({ message: "Error in get CVE by ID action" })
  }
})
