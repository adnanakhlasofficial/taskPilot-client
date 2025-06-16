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
interface TeamMember {
    id: string;
    userId: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

interface Team {
    id: string;
    teamName: string;
    createdAt: string;
    updatedAt: string;
    members: TeamMember[];
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export const loginSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://task-pilot-server2.vercel.app",
    }),
    endpoints: (build) => ({
        // Login Mutation
        login: build.mutation({
            query: (Credentials: Credentials) => ({
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
        // Get All Teams
        getAllTeam: build.query<ApiResponse<Team[]>, void>({
            query: () => ({
                url: "/api/v1/team",
                method: "GET"
            }),
        }),
    }),
})
export const { useLoginMutation, useUserCreateQuery, useGetAllTeamQuery } = loginSlice;