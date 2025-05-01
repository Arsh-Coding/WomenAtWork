import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    profile: profileReducer,
  },
});

export default store;
