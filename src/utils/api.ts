import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL:'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const apiService = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  // Categories
  getCategories: () => api.get('/category'),
  createCategory: (data: { name: string }) => api.post('/category', data),
  deleteCategory: (id: string) => api.delete(`/category/${id}`),

  // Cards/Products
  getAllCards: () => api.get('/card'),
  getCardsByCategory: (categoryId: string) => api.get(`/card/category/${categoryId}`),
  getCardById: (id: string) => api.get(`/card/${id}`),
  createCard: (formData: FormData) => api.post('/card', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateCard: (id: string, formData: FormData) => api.put(`/card/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteCard: (id: string) => api.delete(`/card/${id}`),

  // Contact
  submitContact: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => api.post('/contact/submit', data),
  getAllContacts: () => api.get('/contact/viewall'),
  deleteContact: (id: string) => api.delete(`/contact/${id}`),
};

export default api;