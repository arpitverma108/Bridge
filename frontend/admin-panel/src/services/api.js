import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const savePermissions = async (permissions) => {
  const response = await api.post('/permissions/batch', { permissions });
  return response.data;
};

export const getPermissions = async () => {
  const response = await api.get('/permissions');
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const createGroup = async (groupData) => {
  const response = await api.post('/groups', groupData);
  return response.data;
};

export default api;