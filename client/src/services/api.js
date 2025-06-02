import axios from 'axios';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});