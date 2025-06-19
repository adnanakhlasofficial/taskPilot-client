import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Project = {
  projectName: string;
  projectId: string;
  station: string;
  deadline: string;
  value: number;
};

export interface GetProjects {
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

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://task-management-production-7b6f.up.railway.app/api/v1/project",
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

    getProjects: builder.query<{ success: boolean; data: GetProjects[] }, void>(
      {
        query: () => ({
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }),
      }
    ),

    getProjectById: builder.query<
      { success: boolean; data: GetProjects },
      string
    >({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),

    updateProject: builder.mutation<
      { success: boolean; message: string },
      { id: string; payload: Partial<Project> }
    >({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation, // 👈 added export
} = projectApi;
