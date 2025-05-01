import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeader, httpGet, httpPut } from "../api";
import { URLS } from "../urls";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User Id not found");
      const response = await httpGet(URLS.user(userId), {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User id not found");

      const response = await httpPut(URLS.updateProfile(userId), formData, {
        headers: getAuthHeader(),
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    progress: 0,
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setProgress } = profileSlice.actions;
export default profileSlice.reducer;
