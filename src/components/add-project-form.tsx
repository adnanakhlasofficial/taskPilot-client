// components/ProjectForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectId: z.string().min(1, "Project ID is required"),
  station: z.string().min(1, "Station is required"),
  deadline: z.string().min(1, "Deadline is required"),
  value: z.coerce.number().min(0, "Value must be positive"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

import React from "react";
import { Project, useCreateProjectMutation } from "@/store/api/projectApi";
import { toast } from "sonner";

const AddProjectForm = () => {
  const [createProject, { isLoading, isSuccess, error }] =
    useCreateProjectMutation();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      projectId: "",
      station: "",
      deadline: "",
      value: 0,
    },
  });

  const onSubmit = async (data: Project) => {
    try {
      await createProject(data).unwrap();
      // Optional: show toast or redirect
      toast.success("Project created successfully!");
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };
  // const onSubmit = (data: ProjectFormValues) => {
  //   console.log("Submitted:", data);
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 border-1 p-4 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="bluedoc123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input placeholder="p0001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="station"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Station</FormLabel>
              <FormControl>
                <Input placeholder="Fiver" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProjectForm;
