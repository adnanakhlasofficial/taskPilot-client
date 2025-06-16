import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
export const loginSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://task-pilot-server2.vercel.app",
    }),
    endpoints: (build) => ({
        // Login Mutation
        login: build.mutation({
            query: (Credentials : Credentials) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: Credentials,
            }),
        }),
        // Get All Users Query
        userCreate: build.query<User[], void>({
            query: () => ({
                url: "/api/v1/user",
                method: "GET"
            }),
        }),
    }),
})
export const {useLoginMutation, useUserCreateQuery} = loginSlice;