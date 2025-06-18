"use client";

// components/ProjectTable.tsx
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetProjectsQuery } from "@/store/api/projectApi";

export default function ProjectTable() {
  const { data, isLoading, isError } = useGetProjectsQuery();

  if (isLoading) return <Skeleton className="h-10 w-full mt-6" />;
  if (isError || !data?.data?.length)
    return <p className="text-red-500 mt-4">Failed to load projects.</p>;

  return (
    <div className="p-4">
      <div className="border border-gray-200 rounded-md shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Figma</TableHead>
              <TableHead>Live</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.station}</TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>${project.value.toLocaleString()}</TableCell>
                <TableCell>{project.team?.teamName || "—"}</TableCell>
                <TableCell className="capitalize">{project.status}</TableCell>
                <TableCell>
                  {project.figmaLink ? (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Figma
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Live
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
