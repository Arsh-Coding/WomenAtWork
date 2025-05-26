import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import profileReducer from "./slices/profileSlice";
import planReducer from "./slices/planSlice";
import companyReducer from "./slices/companySlice";
import { setStore } from "./storeAccessor";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    profile: profileReducer,
    plans: planReducer,
    company: companyReducer,
  },
});

setStore(store);

export default store;
