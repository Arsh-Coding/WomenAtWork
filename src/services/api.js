// import axios from "axios";
import axiosInstance from "./axiosInstance";
import { URLS } from "./urls";

export const httpGet = async (url, options = {}) => {
  // console.log("get request url: ", url);

  try {
    let response = await axiosInstance.get(url, options);
    return response.data;
  } catch (e) {
    console.error("API get error:", e);
    throw e;
  }
};

export const httpPost = async (url, data = {}, options = {}) => {
  // console.log("api js ", url);

  try {
    let response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...getAuthHeader(),
      },
      ...options,
    });
    return response.data;
  } catch (e) {
    console.log("API post error: ", e);
    throw e;
  }
};

export const httpPut = async (url, data = {}, options = {}) => {
  try {
    const response = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (e) {
    console.log("API put error: ", e);
    throw e;
  }
};

export const httpFormPost = async (url, formData, options = {}) => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (err) {
    console.log("API from post error", err);
    throw err;
  }
};
export const getCountries = async () => {
  return await httpGet(URLS.countries);
};

// Function to get states by country ID
export const getStatesByCountry = async (countryId) => {
  // console.log("api function id", countryId);`

  return await httpGet(URLS.states(countryId));
};

// Function to get cities by state ID
export const getCitiesByState = async (stateId) => {
  return await httpGet(URLS.cities(stateId));
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const applyToJob = async (jobId, dateApplied) => {
  return await httpPost(
    URLS.applyJob,
    { jobId, dateApplied },
    {
      headers: getAuthHeader(),
    }
  );
};
//plans
export const getPlans = async () => {
  return await httpGet(URLS.plans);
};
//delete user profile
export const deleteUserProfile = async () => {
  return await axiosInstance.delete(URLS.deleteProfile, {
    headers: getAuthHeader(),
  });
};
