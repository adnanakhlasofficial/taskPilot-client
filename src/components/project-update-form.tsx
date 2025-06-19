"use client";

import { useParams } from "next/navigation";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/store/api/projectApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectUpdateForm() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProjectByIdQuery(id as string);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [form, setForm] = useState({
    projectName: "",
    projectId: "",
    station: "",
    deadline: "",
    estimateDelivery: "",
    deliveredDate: "",
    value: 0,
    figmaLink: "",
    liveLink: "",
    requirementsLink: "",
    note: "",
    projectStatus: "",
    clientStatus: "",
  });

  useEffect(() => {
    if (data?.success) {
      const p = data.data;
      setForm({
        projectName: p.projectName || "",
        projectId: p.projectId || "",
        station: p.station || "",
        deadline: p.deadline?.split("T")[0] || "",
        estimateDelivery: p.estimateDelivery?.split("T")[0] || "",
        deliveredDate: p.deliveredDate?.split("T")[0] || "",
        value: p.value || 0,
        figmaLink: p.figmaLink || "",
        liveLink: p.liveLink || "",
        requirementsLink: p.requirementsLink || "",
        note: p.note || "",
        projectStatus: p.projectStatus || "",
        clientStatus: p.clientStatus || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        deadline: form.deadline ? new Date(form.deadline) : null,
        estimateDelivery: form.estimateDelivery
          ? new Date(form.estimateDelivery)
          : null,
        deliveredDate: form.deliveredDate ? new Date(form.deliveredDate) : null,
      };

      await updateProject({ id: id as string, payload }).unwrap();
      toast.success("✅ Project updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load project.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Project</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Project Name"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
          />
          <FormField
            label="Project ID"
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
          />
          <FormField
            label="Station"
            name="station"
            value={form.station}
            onChange={handleChange}
          />
          <FormField
            label="Deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
          <FormField
            label="Estimated Delivery"
            name="estimateDelivery"
            type="date"
            value={form.estimateDelivery}
            onChange={handleChange}
          />
          <FormField
            label="Delivered Date"
            name="deliveredDate"
            type="date"
            value={form.deliveredDate}
            onChange={handleChange}
          />
          <SelectField
            label="Project Status"
            name="projectStatus"
            value={form.projectStatus}
            onChange={handleChange}
            options={[
              "new",
              "ui_ux",
              "wip",
              "qa",
              "delivered",
              "revision",
              "cancelled",
            ]}
          />
          <SelectField
            label="Client Status"
            name="clientStatus"
            value={form.clientStatus}
            onChange={handleChange}
            options={[
              "active",
              "satisfied",
              "neutral",
              "dissatisfied",
              "inactive",
            ]}
          />
          <FormField
            label="Value"
            name="value"
            type="number"
            value={form.value}
            onChange={handleChange}
          />
          <FormField
            label="Figma Link"
            name="figmaLink"
            value={form.figmaLink}
            onChange={handleChange}
          />
          <FormField
            label="Live Link"
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
          />
          <FormField
            label="Requirements Link"
            name="requirementsLink"
            value={form.requirementsLink}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <Label className="text-sm">Note</Label>
            <Textarea name="note" value={form.note} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Project"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: any;
  onChange: (e: any) => void;
  type?: string;
}) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <Input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: string[];
}) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md p-2 text-sm"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
