import axios from "axios";
import { URLS } from "./urls";

export const httpGet = async (url, options = {}) => {
  try {
    let response = await axios.get(url, options);
    return response.data;
  } catch (e) {
    console.error("API get error:", e);
    throw e;
  }
};

export const httpPost = async (url, data = {}, options = {}) => {
  // console.log(options);

  try {
    let response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
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
    const response = await axios.put(url, data, {
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
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/ form-data",
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (err) {
    console.log("API from post error", e);
    throw e;
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
