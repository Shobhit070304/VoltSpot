import axios from "axios";

// Validate environment variables
if (!import.meta.env.VITE_BASE_URL) {
  console.warn("VITE_BASE_URL is not defined, using default localhost");
}

// Create axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to set token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Dynamically import toast to avoid circular deps
    const toast = (await import("react-hot-toast")).default;
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message || "An error occurred";

      // Show toast for user-facing errors
      if (status >= 400) {
        toast.error(message);
      }

      // If unauthorized, clear auth and redirect
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error("Request timeout. Please try again.");
    } else {
      toast.error("Network error. Please check your connection.");
    }
    
    return Promise.reject(error);
  }
);
