import { createSlice } from "@reduxjs/toolkit"
import type { ServerError } from "../../types/errors"
import { getCves } from "./cveActions"

export interface CveState {
  loading: boolean
  error?: ServerError
}

const initialState: CveState = {
  loading: false,
  error: undefined,
}

export const cveSlice = createSlice({
  name: "cve",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Get CVES ---
    builder.addCase(getCves.fulfilled, (state) => {
      state.error = undefined
      state.loading = false
    })
    builder.addCase(getCves.rejected, (state, action) => {
      state.error = action.payload || { message: "Get CVES failed" }
      state.loading = false
    })
    builder.addCase(getCves.pending, (state) => {
      state.loading = true
      state.error = undefined
    })
  },
})
export default cveSlice.reducer
