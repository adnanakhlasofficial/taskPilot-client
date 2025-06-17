export interface Project {
  id: string;
  projectName: string;
  projectId: string;
  station: string;
  deadline: string;
  value: number;
  team: string;
  status: string;
  lastUpdate?: string;
  figmaLink?: string;
  liveLink?: string;
}

// features/api/projectApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-pilot-server2.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<{ success: boolean; data: Project[] }, void>({
      query: () => "/project",
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
