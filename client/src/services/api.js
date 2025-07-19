import axios from 'axios';

// Validate environment variables
if (!import.meta.env.VITE_BASE_URL) {
  console.error('VITE_BASE_URL is not defined in environment variables');
}

// Create axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api',
});

// Add request interceptor to set token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a global response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    // Dynamically import toast to avoid circular deps
    const toast = (await import('react-hot-toast')).default;
    // If error response exists
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message || 'An error occurred';
      
      // Only show toast in development or for user-facing errors
      if (import.meta.env.DEV || status >= 400) {
        toast.error(message);
      }
      
      // If unauthorized, log out and redirect
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Dynamically import navigation
        window.location.href = '/login';
      }
    } else {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);