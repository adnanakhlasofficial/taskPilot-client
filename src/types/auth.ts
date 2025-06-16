export interface User {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: "admin" | "leader" | "member";
  avatar?: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type UserRole = "admin" | "leader" | "member";
