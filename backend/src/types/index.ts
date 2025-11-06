export interface CreateUserRequest {
  name: string;
  phone: string;
}

export interface CreatePromptRequest {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}