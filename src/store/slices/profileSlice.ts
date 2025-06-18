import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-pilot-server2.vercel.app",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/api/v1/user/${id}`,
      providesTags: ["Profile"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = profileApi;
