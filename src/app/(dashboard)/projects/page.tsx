"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetProjectsQuery } from "@/store/api/projectApi";

const statusOptions = ["new", "wip", "hold", "completed", "cancelled"];
const clientStatusOptions = ["active", "inactive", "satisfied", "unsatisfied"];

export default function ProjectTable() {
  const { data, isLoading } = useGetProjectsQuery();
  const projects = data?.data || [];

  const [editedProjects, setEditedProjects] = useState<{ [id: string]: any }>(
    {}
  );

  const handleEdit = (id: string, field: string, value: any) => {
    setEditedProjects((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id: string) => {
    const updated = { id, ...editedProjects[id] };
    console.log("Save update:", updated);
    // TODO: Trigger your mutation
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Project Name</th>
            <th className="p-2">Project ID</th>
            <th className="p-2">Station</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Project Status</th>
            <th className="p-2">Client Status</th>
            <th className="p-2">Team</th>
            <th className="p-2">Figma Link</th>
            <th className="p-2">Live Link</th>
            <th className="p-2">Requirements</th>
            <th className="p-2">Note</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const edited = editedProjects[project.id] || {};
            return (
              <tr key={project.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <Input
                    value={edited.projectName ?? project.projectName}
                    onChange={(e) =>
                      handleEdit(project.id, "projectName", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">{project.projectId}</td>
                <td className="p-2">
                  <Input
                    value={edited.station ?? project.station}
                    onChange={(e) =>
                      handleEdit(project.id, "station", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  {dayjs(project.deadline).format("YYYY-MM-DD")}
                </td>
                <td className="p-2">
                  <Select
                    value={edited.projectStatus ?? project.projectStatus}
                    onValueChange={(value) =>
                      handleEdit(project.id, "projectStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Select
                    value={edited.clientStatus ?? project.clientStatus}
                    onValueChange={(value) =>
                      handleEdit(project.id, "clientStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">{project.team?.teamName || "—"}</td>
                <td className="p-2">
                  <Input
                    placeholder="Figma URL"
                    value={edited.figmaLink ?? project.figmaLink ?? ""}
                    onChange={(e) =>
                      handleEdit(project.id, "figmaLink", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <Input
                    placeholder="Live URL"
                    value={edited.liveLink ?? project.liveLink ?? ""}
                    onChange={(e) =>
                      handleEdit(project.id, "liveLink", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <Input
                    placeholder="Req. Link"
                    value={
                      edited.requirementsLink ?? project.requirementsLink ?? ""
                    }
                    onChange={(e) =>
                      handleEdit(project.id, "requirementsLink", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <Input
                    placeholder="Note"
                    value={edited.note ?? project.note ?? ""}
                    onChange={(e) =>
                      handleEdit(project.id, "note", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <Button size="sm" onClick={() => handleSave(project.id)}>
                    Save
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isLoading && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Loading projects...
        </p>
      )}
    </div>
  );
}
