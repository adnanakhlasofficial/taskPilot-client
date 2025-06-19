// lib/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskpilot-server2-production.up.railway.app/api/v1",
  }),
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<any[], void>({
      query: () => "/user",
    }),

    // Create a Stripe checkout session
    createCheckoutSession: builder.mutation<
      { url: string }, // response type
      { productName: string; amount: number; userId: string } // payload
    >({
      query: (body) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body,
      }),
    }),
    getPaymentStatus: builder.query<
      { success: boolean; message: string },
      string // session_id
    >({
      query: (session_id) => `/payment/confirm?session_id=${session_id}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateCheckoutSessionMutation,
  useGetPaymentStatusQuery,
} = usersApi;
