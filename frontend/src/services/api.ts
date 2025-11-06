import axios from 'axios';
import { User, Category, Prompt, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  createUser: async (userData: { name: string; phone: string }): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    return response.data.data!;
  },

  loginOrRegister: async (userData: { name: string; phone: string }): Promise<{ user: User; isNewUser: boolean; message: string }> => {
    const response = await api.post<ApiResponse<{ user: User; isNewUser: boolean; message: string }>>('/users/login', userData);
    return response.data.data!;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data!;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data!;
  },
};

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data!;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data!;
  },
};

export const promptService = {
  createPrompt: async (promptData: {
    userId: number;
    categoryId: number;
    subCategoryId: number;
    prompt: string;
  }): Promise<Prompt> => {
    const response = await api.post<ApiResponse<Prompt>>('/prompts', promptData);
    return response.data.data!;
  },

  getPromptsByUserId: async (userId: number): Promise<Prompt[]> => {
    const response = await api.get<ApiResponse<Prompt[]>>(`/prompts/user/${userId}`);
    return response.data.data!;
  },

  getAllPrompts: async (): Promise<Prompt[]> => {
    const response = await api.get<ApiResponse<Prompt[]>>('/prompts');
    return response.data.data!;
  },
};