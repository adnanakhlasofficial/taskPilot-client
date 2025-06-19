import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginCredentials,
  LoginResponse,
  ApiResponse,
  User,
} from "@/types/auth";
import type { RootState } from "@/store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://taskpilot-server2-production.up.railway.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse["data"], LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        if (response.success) {
          return response.data;
        }
        throw new Error(response.message || "Login failed");
      },
      transformErrorResponse: (response) => {
        let message = "Login failed";
        if (
          response.data &&
          typeof response.data === "object" &&
          "message" in response.data
        ) {
          message = (response.data as { message?: string }).message || message;
        }
        return {
          status: response.status,
          message,
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: (response: ApiResponse) => {
        if (response.success) {
          return;
        }
        throw new Error(response.message || "Logout failed");
      },
    }),
    refreshToken: builder.mutation<{ user: User; token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      transformResponse: (
        response: ApiResponse<{ user: User; token: string }>
      ) => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || "Token refresh failed");
      },
    }),
    getProfile: builder.query<User, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
      transformResponse: (response: ApiResponse<{ user: User }>) => {
        if (response.success && response.data) {
          return response.data.user;
        }
        throw new Error(response.message || "Failed to get profile");
      },
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/auth/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: ApiResponse<{ user: User }>) => {
        if (response.success && response.data) {
          return response.data.user;
        }
        throw new Error(response.message || "Failed to update profile");
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
