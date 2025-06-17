// features/api/projectApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Project = {
  projectName: string;
  projectId: string;
  station: string;
  deadline: string;
  value: number;
};

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-pilot-server2.vercel.app/api/v1/project",
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation<void, Project>({
      query: (project) => ({
        url: "/create",
        method: "POST",
        body: project,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const { useCreateProjectMutation } = projectApi;
