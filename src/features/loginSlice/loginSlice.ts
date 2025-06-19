import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Credentials {
  userId: string;
  password: string;
}

interface User {
  id: string;
  userId: string;
  userName: string;
  email: string;
  isActive: boolean;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface createUser {
  userId: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}
export const loginSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskpilot-server2-production.up.railway.app",
  }),
  endpoints: (build) => ({
    // Login Mutation
    login: build.mutation({
      query: (credentials: Credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Get All Users Query
    getAllUser: build.query<User[], void>({
      query: () => ({
        url: "/api/v1/user",
        method: "GET",
      }),
    }),
    //Create All Users
    createAllUser: build.mutation({
      query: (newUser: createUser) => ({
        url: "/api/v1/user/create",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useGetAllUserQuery,
  useCreateAllUserMutation,
} = loginSlice;
