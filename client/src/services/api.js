import axios from 'axios';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

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
      toast.error(message);
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