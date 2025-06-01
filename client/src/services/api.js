import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

// Mock data for charging stations
const mockStations = [
  {
    id: 1,
    name: 'Downtown Fast Charger',
    location: '123 Main St, Downtown',
    latitude: 40.7128,
    longitude: -74.0060,
    status: 'Active',
    powerOutput: 150,
    connectorType: 'CCS',
    createdAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 2,
    name: 'Riverside Charging Hub',
    location: 'Riverside Park, East Wing',
    latitude: 40.7214,
    longitude: -74.0120,
    status: 'Active',
    powerOutput: 50,
    connectorType: 'Type 2',
    createdAt: '2024-03-14T10:45:00Z'
  },
  {
    id: 3,
    name: 'Shopping Mall Charger',
    location: 'City Mall, Level P2',
    latitude: 40.7310,
    longitude: -73.9950,
    status: 'Inactive',
    powerOutput: 75,
    connectorType: 'CCS/CHAdeMO',
    createdAt: '2024-03-13T09:15:00Z'
  }
];

// Mock API functions
export const stationsApi = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: mockStations };
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newStation = {
      ...data,
      id: mockStations.length + 1,
      createdAt: new Date().toISOString()
    };
    mockStations.unshift(newStation);
    return { data: newStation };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockStations.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStations[index] = { ...mockStations[index], ...data };
      return { data: mockStations[index] };
    }
    throw new Error('Station not found');
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockStations.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStations.splice(index, 1);
      return { data: { message: 'Station deleted successfully' } };
    }
    throw new Error('Station not found');
  }
};