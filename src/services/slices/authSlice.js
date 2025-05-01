import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost } from "../api";
import { URLS } from "../urls";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost(URLS.login, formData);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user.userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost(URLS.signup, formData);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user.userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("authToken") || null,
    status: "idle", // 'idle' || loading | 'succedded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
