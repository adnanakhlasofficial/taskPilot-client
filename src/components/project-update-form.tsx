"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUpdateProjectMembersMutation } from "@/store/api/projectApi";

const schema = z.object({
  teamId: z.string().min(1),
  uiMemberIds: z.array(z.string()),
  frontendMemberIds: z.array(z.string()),
  backendMemberIds: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

const teamOptions = [
  { label: "Team 1", value: "6851d5f4c35435a9e7b1b454" },
  { label: "Team 2", value: "6851d675c35435a9e7b1b458" },
];

const memberOptions = [
  { label: "Mazharul (U0001)", value: "U0001" },
  { label: "Adnan (U0002)", value: "U0002" },
  { label: "Sifat (U0003)", value: "U0003" },
];

export function UpdateProjectForm({ projectId }: { projectId: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      teamId: "",
      uiMemberIds: [],
      frontendMemberIds: [],
      backendMemberIds: [],
    },
  });

  const [updateProject, { isLoading }] = useUpdateProjectMembersMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProject({ projectId, ...values }).unwrap();
      console.log("Project updated successfully!");
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 max-w-xl mx-auto"
      >
        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {["uiMemberIds", "frontendMemberIds", "backendMemberIds"].map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as keyof FormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={memberOptions}
                    values={field.value}
                    onChange={field.onChange}
                    placeholder="Select members"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </Form>
  );
}
