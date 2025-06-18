// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// export const profileApi = createApi({
//   reducerPath: 'profileApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://task-pilot-server2.vercel.app',
//   }),
//   tagTypes: ['Profile'],
//   endpoints: (builder) => ({
//     updateUser: builder.mutation({
//       query: ({ id, ...body }) => ({
//         url: `/api/v1/user/${id}`,
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: ['Profile'],
//     }),
//   }),
// })

// export const { useUpdateUserMutation } = profileApi



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://task-pilot-server2.vercel.app',
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/api/v1/user/${id}`,
      providesTags: ['Profile'],  // <-- এখানে ট্যাগ যোগ করতে হবে
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/user/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'], // আপডেটের পর এই ট্যাগ ইনভ্যালিড হবে
    }),
  }),
})

export const { useGetUserByIdQuery, useUpdateUserMutation } = profileApi
