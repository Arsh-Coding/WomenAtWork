// services/slices/jobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet } from "../api";
import { URLS } from "../urls";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await httpGet(
        `${URLS.alljobs}?offset=${offset}&limit=${limit}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

export const updateJobThunk = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData, token }, { rejectWithValue }) => {
    try {
      const res = await updateJob(id, jobData, token);
      return res.job;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error updating job"
      );
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    totalJobs: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(updateJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setJobs, setSelectedJob } = jobSlice.actions;
// export { fetchJobs };
export default jobSlice.reducer;
