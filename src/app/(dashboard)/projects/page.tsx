"use client";

import Link from "next/link";
import { useGetProjectsQuery } from "@/store/api/projectApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectListPage() {
  const { data, isLoading, error } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-6xl mx-auto">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load projects
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">All Projects</h2>
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Project ID</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Delivery Estimate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Value ($)</TableHead>
              <TableHead>Figma</TableHead>
              <TableHead>Live</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Requirements</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="contents"
              >
                <TableRow className="hover:bg-muted transition cursor-pointer">
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.projectId}</TableCell>
                  <TableCell>{project.station}</TableCell>
                  <TableCell>{project.deadline?.split("T")[0]}</TableCell>
                  <TableCell>
                    {project.estimateDelivery ?? (
                      <span className="text-muted-foreground">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.projectStatus === "wip"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.projectStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.clientStatus}</TableCell>
                  <TableCell className="text-right">{project.value}</TableCell>
                  <TableCell>
                    {project.figmaLink ? (
                      <a
                        href={project.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.deliveredDate ? (
                      project.deliveredDate.split("T")[0]
                    ) : (
                      <span className="text-muted-foreground">
                        Not delivered
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.requirementsLink ? (
                      <a
                        href={project.requirementsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{project.team?.teamName || "No Team"}</TableCell>
                  <TableCell>{project.rating}</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
