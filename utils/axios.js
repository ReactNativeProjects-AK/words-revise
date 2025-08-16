import axios from "axios";
import { refreshIdToken } from "./auth";

// Create axios instance
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
});

// Axios interceptor for handling 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newIdToken = await refreshIdToken();

        // Retry the original request with new token
        error.config.params = error.config.params || {};
        error.config.params.auth = newIdToken;

        return api.request(error.config);
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
