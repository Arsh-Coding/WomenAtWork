// services/slices/jobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet } from "../api";
import { URLS } from "../urls";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet(URLS.alljobs);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
