import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChatRoom {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  // Add more fields as needed based on your API response
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-management-production-7b6f.up.railway.app/api/v1",
  }),
  endpoints: (builder) => ({
    getChatRooms: builder.query<{ success: boolean; data: ChatRoom[] }, void>({
      query: () => ({
        url: "/chat/rooms",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const { useGetChatRoomsQuery } = chatApi;
