"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  ExternalLink,
  Figma,
  Search,
  Star,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Palette,
  Code,
  Server,
  FileText,
  Edit,
} from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectUpdateForm from "@/components/ProjectUpdateForm";

interface TeamMember {
  id: number;
  name: string;
  avatar?: string;
  email?: string;
}

interface TeamStructure {
  uiux: TeamMember[];
  frontend: TeamMember[];
  backend: TeamMember[];
}

interface Project {
  id: number;
  projectId: string;
  station: string;
  deadline: string;
  value: string;
  teamName: string;
  team: TeamStructure;
  lastUpdate: string;
  lastMeeting: string;
  projectStatus: string;
  esteemedDelivery: string;
  clientStatus: string;
  rating: string;
  figma: string;
  liveLink: string;
  deliveryDate: string;
  requirement: {
    url: string;
  };
  note: string;
}

const ProjectTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [projectData, setProjectData] = useState<Project[]>([
    {
      id: 1,
      projectId: "PRJ-001",
      station: "Tokyo",
      deadline: "2025-06-20",
      value: "$12,000",
      teamName: "Alpha Squad",
      team: {
        uiux: [
          {
            id: 1,
            name: "John Doe",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "john@company.com",
          },
          {
            id: 2,
            name: "Alice Cooper",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "alice@company.com",
          },
        ],
        frontend: [
          {
            id: 3,
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "jane@company.com",
          },
          {
            id: 4,
            name: "Bob Wilson",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "bob@company.com",
          },
          {
            id: 5,
            name: "Carol Davis",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "carol@company.com",
          },
        ],
        backend: [
          {
            id: 6,
            name: "Mark Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "mark@company.com",
          },
        ],
      },
      lastUpdate: "2025-06-12",
      lastMeeting: "2025-06-10",
      projectStatus: "In Progress",
      esteemedDelivery: "2025-06-25",
      clientStatus: "Awaiting Review",
      rating: "4.5",
      figma: "https://figma.com/example",
      liveLink: "https://project-alpha.com",
      deliveryDate: "2025-06-25",
      requirement: {
        url: "https://docs.stripe.com/payments",
      },
      note: "Ensure mobile responsiveness",
    },
    {
      id: 2,
      projectId: "PRJ-002",
      station: "Berlin",
      deadline: "2025-07-05",
      value: "$15,000",
      teamName: "Beta Crew",
      team: {
        uiux: [
          {
            id: 7,
            name: "Emily Davis",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "emily@company.com",
          },
          {
            id: 8,
            name: "Sarah Miller",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "sarah@company.com",
          },
          {
            id: 9,
            name: "Lisa Brown",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "lisa@company.com",
          },
          {
            id: 10,
            name: "Amy Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "amy@company.com",
          },
        ],
        frontend: [
          {
            id: 11,
            name: "Robert Brown",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "robert@company.com",
          },
          {
            id: 12,
            name: "Mike Taylor",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "mike@company.com",
          },
        ],
        backend: [
          {
            id: 13,
            name: "Sophia Wilson",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "sophia@company.com",
          },
          {
            id: 14,
            name: "David Lee",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "david@company.com",
          },
          {
            id: 15,
            name: "Kevin Zhang",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "kevin@company.com",
          },
        ],
      },
      lastUpdate: "2025-06-13",
      lastMeeting: "2025-06-11",
      projectStatus: "Pending Kickoff",
      esteemedDelivery: "2025-07-15",
      clientStatus: "Requirements Finalized",
      rating: "5.0",
      figma: "https://figma.com/example",
      liveLink: "https://project-beta.com",
      deliveryDate: "2025-07-15",
      requirement: {
        url: "https://admin-dashboard-docs.com",
      },
      note: "Optimize for performance",
    },
    {
      id: 3,
      projectId: "PRJ-003",
      station: "New York",
      deadline: "2025-06-30",
      value: "$18,500",
      teamName: "Gamma Force",
      team: {
        uiux: [
          {
            id: 16,
            name: "Michael Lee",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "michael@company.com",
          },
        ],
        frontend: [
          {
            id: 17,
            name: "Jessica Clark",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "jessica@company.com",
          },
        ],
        backend: [
          {
            id: 18,
            name: "Daniel Martinez",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "daniel@company.com",
          },
          {
            id: 19,
            name: "Alex Rodriguez",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "alex@company.com",
          },
        ],
      },
      lastUpdate: "2025-06-14",
      lastMeeting: "2025-06-12",
      projectStatus: "Completed",
      esteemedDelivery: "2025-06-28",
      clientStatus: "Final Approval",
      rating: "4.8",
      figma: "https://figma.com/example",
      liveLink: "https://project-gamma.com",
      deliveryDate: "2025-06-28",
      requirement: {
        url: "https://i18n-documentation.com",
      },
      note: "Client requested last-minute changes",
    },
    {
      id: 4,
      projectId: "PRJ-004",
      station: "London",
      deadline: "2025-08-15",
      value: "$22,000",
      teamName: "Delta Team",
      team: {
        uiux: [
          {
            id: 20,
            name: "Sarah Connor",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "sarah.c@company.com",
          },
          {
            id: 21,
            name: "Emma Stone",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "emma@company.com",
          },
          {
            id: 22,
            name: "Natalie Portman",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "natalie@company.com",
          },
        ],
        frontend: [
          {
            id: 23,
            name: "Alex Turner",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "alex@company.com",
          },
          {
            id: 24,
            name: "Ryan Gosling",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "ryan@company.com",
          },
        ],
        backend: [
          {
            id: 25,
            name: "Chris Evans",
            avatar: "/placeholder.svg?height=32&width=32",
            email: "chris@company.com",
          },
        ],
      },
      lastUpdate: "2025-06-15",
      lastMeeting: "2025-06-13",
      projectStatus: "On Hold",
      esteemedDelivery: "2025-08-20",
      clientStatus: "Budget Approval",
      rating: "4.2",
      figma: "https://figma.com/example",
      liveLink: "https://project-delta.com",
      deliveryDate: "2025-08-20",
      requirement: {
        url: "https://ecommerce-api-docs.com",
      },
      note: "Waiting for client feedback",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Completed: {
        variant: "default" as const,
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      "In Progress": {
        variant: "secondary" as const,
        icon: Clock,
        className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      "Pending Kickoff": {
        variant: "outline" as const,
        icon: AlertCircle,
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      "On Hold": {
        variant: "destructive" as const,
        icon: XCircle,
        className: "bg-red-100 text-red-800 hover:bg-red-200",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig["Pending Kickoff"];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getClientStatusBadge = (status: string) => {
    const statusConfig = {
      "Final Approval": { className: "bg-green-100 text-green-800" },
      "Awaiting Review": { className: "bg-orange-100 text-orange-800" },
      "Requirements Finalized": { className: "bg-blue-100 text-blue-800" },
      "Budget Approval": { className: "bg-purple-100 text-purple-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      className: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge variant="outline" className={config.className}>
        {status}
      </Badge>
    );
  };

  const renderStars = (rating: string) => {
    const numRating = Number.parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating}</span>
      </div>
    );
  };

  const renderTeamMembersByRole = (members: TeamMember[], maxVisible = 3) => {
    if (members.length === 0)
      return <span className="text-muted-foreground text-sm">None</span>;

    const visibleMembers = members.slice(0, maxVisible);
    const remainingCount = members.length - maxVisible;

    return (
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {visibleMembers.map((member) => (
              <Tooltip key={member.id}>
                <TooltipTrigger>
                  <Avatar className="w-6 h-6 border-2 border-white hover:z-10 transition-all hover:scale-110">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <div className="font-medium">{member.name}</div>
                    {member.email && (
                      <div className="text-xs text-muted-foreground">
                        {member.email}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
            {remainingCount > 0 && (
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="w-6 h-6 border-2 border-white bg-muted hover:z-10 transition-all hover:scale-110">
                    <AvatarFallback className="text-xs bg-gray-500 text-white">
                      +{remainingCount}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    {members.slice(maxVisible).map((member) => (
                      <div key={member.id} className="text-sm">
                        <div className="font-medium">{member.name}</div>
                        {member.email && (
                          <div className="text-muted-foreground text-xs">
                            {member.email}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({members.length})
          </span>
        </div>
      </TooltipProvider>
    );
  };

  const getTotalTeamSize = (team: TeamStructure) => {
    return team.uiux.length + team.frontend.length + team.backend.length;
  };

  const handleRowSelect = (id: number) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      console.log(`Deselected row with ID: ${id}`);
    } else {
      setSelectedRow(id);
      console.log(`Selected row with ID: ${id}`);
    }
  };

  const isRowSelected = (id: number) => selectedRow === id;
  const isRowDisabled = (id: number) =>
    selectedRow !== null && selectedRow !== id;

  const clearSelection = () => {
    setSelectedRow(null);
    console.log("Cleared all selections");
  };

  const handleUpdateProject = () => {
    if (selectedRow) {
      setShowUpdateForm(true);
    }
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setProjectData((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    console.log("Project updated:", updatedProject);
  };

  const getSelectedProject = () => {
    return projectData.find((project) => project.id === selectedRow);
  };

  const filteredProjects = projectData.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    const allTeamMembers = [
      ...project.team.uiux,
      ...project.team.frontend,
      ...project.team.backend,
    ];

    return (
      project.projectId.toLowerCase().includes(searchLower) ||
      project.teamName.toLowerCase().includes(searchLower) ||
      project.station.toLowerCase().includes(searchLower) ||
      project.projectStatus.toLowerCase().includes(searchLower) ||
      allTeamMembers.some((member) =>
        member.name.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Project Management Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Track projects with UI/UX, Frontend, and Backend teams
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {selectedRow && (
                <>
                  <Button variant="outline" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                  <Button onClick={handleUpdateProject}>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Project
                  </Button>
                </>
              )}
              <Button>Add Project</Button>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects, teams, or members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-10">Select</TableHead>
                    <TableHead className="font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Project</TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Location
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Timeline
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Value
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Team
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Palette className="w-4 h-4" />
                        UI/UX
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        Frontend
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Server className="w-4 h-4" />
                        Backend
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">
                      Client Status
                    </TableHead>
                    <TableHead className="font-semibold">Rating</TableHead>
                    <TableHead className="font-semibold">Links</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const isDisabled = isRowDisabled(project.id);
                    const isSelected = isRowSelected(project.id);

                    return (
                      <TableRow
                        key={project.id}
                        className={`transition-all duration-200 ${
                          isSelected
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : isDisabled
                            ? "opacity-40 bg-gray-50/50 pointer-events-none"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <TableCell className="w-10">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleRowSelect(project.id)}
                            disabled={isDisabled}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {project.id}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-semibold text-primary">
                              {project.projectId}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Delivery: {project.deliveryDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">
                            {project.station}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">Deadline:</span>{" "}
                              {project.deadline}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Est:</span>{" "}
                              {project.esteemedDelivery}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600">
                            {project.value}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge
                              variant="secondary"
                              className="bg-indigo-100 text-indigo-800"
                            >
                              {project.teamName}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              {getTotalTeamSize(project.team)} total members
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Palette className="w-3 h-3 text-pink-500" />
                              <span className="text-xs font-medium">UI/UX</span>
                            </div>
                            {renderTeamMembersByRole(project.team.uiux)}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Code className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-medium">
                                Frontend
                              </span>
                            </div>
                            {renderTeamMembersByRole(project.team.frontend)}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Server className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium">
                                Backend
                              </span>
                            </div>
                            {renderTeamMembersByRole(project.team.backend)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(project.projectStatus)}
                        </TableCell>
                        <TableCell>
                          {getClientStatusBadge(project.clientStatus)}
                        </TableCell>
                        <TableCell>{renderStars(project.rating)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              disabled={isDisabled}
                            >
                              <Link
                                href={project.figma}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Figma className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              disabled={isDisabled}
                            >
                              <Link
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              disabled={isDisabled}
                            >
                              <Link
                                href={project.requirement.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FileText className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2 max-w-xs">
                            <div className="text-sm">
                              <span className="font-medium">Note:</span>
                              <p className="text-muted-foreground mt-1">
                                {project.note}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>Last Update: {project.lastUpdate}</div>
                              <div>Last Meeting: {project.lastMeeting}</div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                No projects found matching your search.
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <div>
              Showing {filteredProjects.length} of {projectData.length} projects
              {selectedRow && (
                <span className="ml-2 text-blue-600 font-medium">
                  • Row {selectedRow} selected
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 rounded-full"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 rounded-full"></div>
                <span>On Hold</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Form Modal */}
      {showUpdateForm && selectedRow && getSelectedProject() && (
        <ProjectUpdateForm
          project={getSelectedProject()!}
          onClose={() => setShowUpdateForm(false)}
          onUpdate={handleProjectUpdate}
        />
      )}
    </div>
  );
};

export default ProjectTable;
