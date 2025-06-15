import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Credentials {
  userId: string;
  password: string;
}
export const loginSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://172.252.13.77:5011",
        // baseUrl: "https://code-commando.com",
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