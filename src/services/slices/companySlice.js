// companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../api"; // Adjust path if necessary
import { URLS } from "../urls"; // Adjust the URL for your API

// Define an asynchronous thunk to create the company
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await httpPost(URLS.createCompany, companyData); // Make POST request
      return response; // If successful, return the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create company"
      ); // Return error message if request fails
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  "company/fetchCompanyById",
  async (companyId, { rejectWithValue }) => {
    try {
      console.log("Fetching company with ID:", companyId);
      const response = await httpGet(URLS.companies(companyId)); // e.g., /companies/:id
      console.log("Fetched company data:", response);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch company details"
      );
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ companyId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await httpPost(
        URLS.updateCompany(companyId),
        updatedData
      ); // PUT/PATCH depending on your API
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update company"
      );
    }
  }
);
export const createOrUpdateCompany = createAsyncThunk(
  "company/createOrUpdateCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await httpPost(URLS.createOrUpdateCompany, companyData); // POST to upsert endpoint
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create/update company"
      );
    }
  }
);

// Slice
const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    companyDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload); // Add the created company to the state
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error in the state
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetails = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrUpdateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateCompany.fulfilled, (state, action) => {
        state.loading = false;
        // Replace or add updated company
        const index = state.companies.findIndex(
          (c) => c.companyId === action.payload.companyId
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        } else {
          state.companies.push(action.payload);
        }
      })
      .addCase(createOrUpdateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
