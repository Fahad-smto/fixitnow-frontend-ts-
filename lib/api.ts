import axios from 'axios';
import { useAuthStore } from './auth-store';

// The backend API base URL. Set this in .env.local as NEXT_PUBLIC_API_URL.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Before every request, check if we have a saved token and attach it.
// This means every page just calls api.get(...) / api.post(...) without
// worrying about auth headers manually.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
