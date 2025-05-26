import axios from "axios";
// import store from "./store";
import { getStore } from "./storeAccessor";
import { logout } from "./slices/authSlice";
import { apiEndpoint } from "./urls";

const instance = axios.create({
  baseURL: apiEndpoint,
});

//attach tokens to headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//handle token expirations (401 error)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired ir invalid. logging out.");

      getStore().dispatch(logout());

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default instance;
