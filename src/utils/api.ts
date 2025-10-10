import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://thekartargroup-backend.vercel.app/api',
  timeout: 30000, // 30 second timeout for image uploads
});

// Add token to requests if available...
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

//response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

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
  
  createCard: (formData: FormData) => {
    console.log('Creating card with FormData');
    return api.post('/card', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  updateCard: (id: string, formData: FormData) => {
    console.log('Updating card:', id);
    return api.put(`/card/${id}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  deleteCard: (id: string) => api.delete(`/card/${id}`),
  
  deleteCardImages: async (cardId: string, publicIds: string[]) => {
    if (!cardId || !publicIds || publicIds.length === 0) {
      throw new Error("Card ID and at least one publicId are required.");
    }
    return api.put(`/card/${cardId}/delete-images`, { publicIds });
  },

  // Contact
  submitContact: (data: {
    name: string;
    email: string;
    message: string;
    organization: string;
    requestCatalogue: String;
  }) => api.post('/contact/submit', data),
  getAllContacts: () => api.get('/contact/viewall'),
  deleteContact: (id: string) => api.delete(`/contact/${id}`),
};

export default api;