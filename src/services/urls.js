// import { createCompany } from "./slices/companySlice";

import { createOrUpdateCompany } from "./slices/companySlice";

export const apiEndpoint = "http://localhost:3000/";
// export const apiEndpoint = "https://woman-at-workforce-backend.onrender.com/";

export const URLS = {
  jobs: (jobId) => `${apiEndpoint}jobs/${jobId}`,
  updateJob: (jobId) => `${apiEndpoint}jobs/update-Job/${jobId}`,
  appliedJobs: `${apiEndpoint}jobs/applied`,
  postedJobs: `${apiEndpoint}jobs/posted`,
  companies: (companyId) => `${apiEndpoint}companies/${companyId}`,
  getAllCompanies: `${apiEndpoint}companies/get`,
  updateCompany: (id) => `${apiEndpoint}companies/${companyId}`,
  createOrUpdateCompany: `${apiEndpoint}companies`,
  alljobs: `${apiEndpoint}jobs`,
  postJob: `${apiEndpoint}jobs`,
  categories: `${apiEndpoint}categories`,
  createCompany: `${apiEndpoint}companies`,

  //auth
  login: `${apiEndpoint}auth/login`,
  signup: `${apiEndpoint}auth/signup`,
  forgotPassword: `${apiEndpoint}auth/forgot-password`,
  resetPassword: (token) => `${apiEndpoint}auth/reset-password/${token}`,
  changePassword: `${apiEndpoint}auth/change-password`,

  // Profile related URLs
  user: (userId) => `${apiEndpoint}user/${userId}`,
  applyJob: `${apiEndpoint}user/apply`,
  updateProfile: (userId) => `${apiEndpoint}profile/${userId}`,
  uploadProfilePic: `${apiEndpoint}profile/uploadProfilePic`,
  deleteProfile: `${apiEndpoint}user/delete-profile`,

  // Country, State, and City API URLs
  countries: `${apiEndpoint}locations/countries`,
  states: (countryId) => `${apiEndpoint}locations/states/${countryId}`,
  cities: (stateId) => `${apiEndpoint}locations/cities/${stateId}`,

  //plans
  plans: `${apiEndpoint}plans`,
};
