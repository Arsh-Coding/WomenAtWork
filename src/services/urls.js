// const apiEndpoint = "http://localhost:3000/";
const apiEndpoint = "https://woman-at-workforce-backend.onrender.com";

export const URLS = {
  jobs: (jobId) => `${apiEndpoint}jobs/${jobId}`,
  companies: (companyId) => `${apiEndpoint}companies/${companyId}`,
  alljobs: `${apiEndpoint}jobs`,
  categories: `${apiEndpoint}categories`,
  login: `${apiEndpoint}auth/login`,
  signup: `${apiEndpoint}auth/signup`,

  // Profile related URLs
  user: (userId) => `${apiEndpoint}user/${userId}`,
  updateProfile: (userId) => `${apiEndpoint}profile/${userId}`,
  uploadProfilePic: `${apiEndpoint}profile/uploadProfilePic`,

  // Country, State, and City API URLs
  countries: `${apiEndpoint}locations/countries`,
  states: (countryId) => `${apiEndpoint}locations/states/${countryId}`,
  cities: (stateId) => `${apiEndpoint}locations/cities/${stateId}`,
};
