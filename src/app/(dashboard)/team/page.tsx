"use client";

import { useState, useEffect } from "react";
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
import { Search, Users, Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

// TypeScript interfaces matching your API response
interface User {
  id: string;
  userId: string;
  userName: string;
  email: string;
  isActive: boolean;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Team {
  id: string;
  teamName: string;
  createdAt: string;
  updatedAt: string;
  members: TeamMember[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Team[];
}

const TeamManagementTable = () => {
  // State management
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://task-pilot-server2.vercel.app/api/v1/team");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setTeams(data.data);
        } else {
          setError(data.message || "Failed to fetch teams");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Refresh data function
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://task-pilot-server2.vercel.app/api/v1/team");
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setTeams(data.data);
      } else {
        setError(data.message || "Failed to refresh data");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  // Filter teams based on search term
  const filteredTeams = teams.filter(team => {
    const searchLower = searchTerm.toLowerCase();
    return (
      team.teamName.toLowerCase().includes(searchLower) ||
      team.members.some(member => 
        member.user.userName.toLowerCase().includes(searchLower) ||
        member.user.email.toLowerCase().includes(searchLower)
      )
    );
  });

  // Handle team selection
  const handleTeamSelect = (id: string) => {
    setSelectedTeam(selectedTeam === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[400px]" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="m-6">
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <Button onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Team Management Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Manage all teams and their members
              </p>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              {selectedTeam && (
                <>
                  <Button variant="outline" onClick={() => setSelectedTeam(null)}>
                    Clear Selection
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Team
                  </Button>
                </>
              )}
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Team
              </Button>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teams or members..."
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
                    <TableHead className="w-12">Select</TableHead>
                    <TableHead className="min-w-[200px]">Team Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead className="min-w-[180px]">Created At</TableHead>
                    <TableHead className="min-w-[180px]">Updated At</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow
                        key={team.id}
                        className={`transition-all duration-200 ${
                          selectedTeam === team.id
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedTeam === team.id}
                            onCheckedChange={() => handleTeamSelect(team.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 border">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {team.teamName
                                  .split(" ")
                                  .map(word => word[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{team.teamName}</div>
                              <div className="text-xs text-muted-foreground">
                                {team.members.length} members
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {team.members.map((member) => (
                              <TooltipProvider key={member.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge 
                                      variant="outline" 
                                      className="flex items-center gap-2 px-2 py-1 hover:bg-accent cursor-pointer"
                                    >
                                      <Avatar className="w-5 h-5">
                                        <AvatarFallback className="text-xs bg-gradient-to-br from-green-500 to-blue-600 text-white">
                                          {member.user.userName
                                            .split(" ")
                                            .map(name => name[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span>{member.user.userName}</span>
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" align="center" className="w-64">
                                    <div className="space-y-1">
                                      <div className="font-bold">{member.user.userName}</div>
                                      <div className="text-sm">{member.user.email}</div>
                                      <div className="flex justify-between items-center pt-2">
                                        <Badge variant={member.user.isActive ? "default" : "secondary"}>
                                          {member.user.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                        <Badge variant="outline">
                                          {member.user.role}
                                        </Badge>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(team.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(team.updatedAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          {teams.length === 0
                            ? "No teams found. Create your first team."
                            : "No teams match your search."}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-muted-foreground gap-4">
            <div>
              Showing {filteredTeams.length} of {teams.length} teams
              {selectedTeam && (
                <span className="ml-2 text-blue-600 font-medium">
                  • Team selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  Total Members:{" "}
                  {teams.reduce((acc, team) => acc + team.members.length, 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Active Teams: {teams.length}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagementTable;