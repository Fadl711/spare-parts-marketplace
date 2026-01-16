import axios from 'axios';
import { Platform } from 'react-native';

// Use special IP for Android Emulator (10.0.2.2), localhost for iOS, or your computer's IP for physical devices
// CHANGE THIS IP to your computer's local IP (e.g., 192.168.1.X) if testing on a real phone!
const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:8000/api/v1'
  : 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

export const ApiService = {
  // Core Data
  getVehicles: async () => {
    try {
      const response = await api.get('/vehicles');
      return response.data;
    } catch (error) {
      console.error('getVehicles Error:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('getCategories Error:', error);
      throw error;
    }
  },

  getPartTypes: async (categoryId: string) => {
    try {
      // Assuming GET /part-types?category_id=X
      const response = await api.get('/part-types', { params: { category_id: categoryId } });
      return response.data;
    } catch (error) {
      console.error('getPartTypes Error:', error);
      throw error;
    }
  },

  // Marketplace
  searchParts: async (filters: any) => {
    try {
      const response = await api.get('/parts', { params: filters });
      return response.data;
    } catch (error) {
      console.error('searchParts Error:', error);
      throw error;
    }
  },

  getPartDetails: async (id: string) => {
    try {
      const response = await api.get(`/parts/${id}`);
      return response.data;
    } catch (error) {
      console.error('getPartDetails Error:', error);
      throw error;
    }
  },
};

export default api;
