/**
 * Type definitions for API requests and responses
 */

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  createdAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  preferences?: Record<string, any>;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Example data types for your Python backend
export interface DataItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Error types
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
