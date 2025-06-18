// features/api/teamApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  image: string;
}

export interface Member {
  id: string;
  userId: string;
  teamId: string;
  user: User;
}

export interface Team {
  id: string;
  teamName: string;
  createdAt: string;
  members: Member[];
}

interface TeamResponse {
  success: boolean;
  message: string;
  data: Team[];
}

interface CreateTeamPayload {
  teamName: string;
  members: string[];
}

interface CreateTeamResponse {
  success: boolean;
  message: string;
  data: Team;
}

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-pilot-server2.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    getTeams: builder.query<TeamResponse, void>({
      query: () => "/team",
    }),

    createTeam: builder.mutation<CreateTeamResponse, CreateTeamPayload>({
      query: (body) => ({
        url: "/team/create",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamApi;
