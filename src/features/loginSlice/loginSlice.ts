import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Credentials {
  email: string;
  password: string;
}
export const loginSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://task-pilot-server2.vercel.app",
        baseUrl: "https://code-commando.com",
    }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (Credentials : Credentials) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: Credentials,
            }),
        }),
    }),
})
export const {useLoginMutation} = loginSlice;