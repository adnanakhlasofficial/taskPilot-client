"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Plus, Trash2 } from "lucide-react";

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

interface ProjectUpdateFormProps {
  project: Project;
  onClose: () => void;
  onUpdate: (updatedProject: Project) => void;
}

const ProjectUpdateForm = ({
  project,
  onClose,
  onUpdate,
}: ProjectUpdateFormProps) => {
  const [formData, setFormData] = useState<Project>(project);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "uiux" as keyof TeamStructure,
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === "requirement.url") {
      setFormData((prev) => ({
        ...prev,
        requirement: { ...prev.requirement, url: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const addTeamMember = () => {
    if (newMember.name && newMember.email) {
      const member: TeamMember = {
        id: Date.now(), // Simple ID generation
        name: newMember.name,
        email: newMember.email,
        avatar: "/placeholder.svg?height=32&width=32",
      };

      setFormData((prev) => ({
        ...prev,
        team: {
          ...prev.team,
          [newMember.role]: [...prev.team[newMember.role], member],
        },
      }));

      setNewMember({ name: "", email: "", role: "uiux" });
    }
  };

  const removeTeamMember = (role: keyof TeamStructure, memberId: number) => {
    setFormData((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [role]: prev.team[role].filter((member) => member.id !== memberId),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  const projectStatuses = [
    "In Progress",
    "Completed",
    "Pending Kickoff",
    "On Hold",
  ];
  const clientStatuses = [
    "Awaiting Review",
    "Requirements Finalized",
    "Final Approval",
    "Budget Approval",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Update Project - {project.projectId}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  value={formData.projectId}
                  onChange={(e) =>
                    handleInputChange("projectId", e.target.value)
                  }
                  placeholder="PRJ-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) =>
                    handleInputChange("teamName", e.target.value)
                  }
                  placeholder="Alpha Squad"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station">Station</Label>
                <Input
                  id="station"
                  value={formData.station}
                  onChange={(e) => handleInputChange("station", e.target.value)}
                  placeholder="Enter station location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Project Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  placeholder="$12,000"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange("deadline", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="esteemedDelivery">Estimated Delivery</Label>
                <Input
                  id="esteemedDelivery"
                  type="date"
                  value={formData.esteemedDelivery}
                  onChange={(e) =>
                    handleInputChange("esteemedDelivery", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) =>
                    handleInputChange("deliveryDate", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Status and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectStatus">Project Status</Label>
                <Select
                  value={formData.projectStatus}
                  onValueChange={(value) =>
                    handleInputChange("projectStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientStatus">Client Status</Label>
                <Select
                  value={formData.clientStatus}
                  onValueChange={(value) =>
                    handleInputChange("clientStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client status" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", e.target.value)}
                  placeholder="4.5"
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="figma">Figma Link</Label>
                <Input
                  id="figma"
                  value={formData.figma}
                  onChange={(e) => handleInputChange("figma", e.target.value)}
                  placeholder="https://figma.com/example"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liveLink">Live Link</Label>
                <Input
                  id="liveLink"
                  value={formData.liveLink}
                  onChange={(e) =>
                    handleInputChange("liveLink", e.target.value)
                  }
                  placeholder="https://project-alpha.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirement">Requirement Link</Label>
                <Input
                  id="requirement"
                  value={formData.requirement.url}
                  onChange={(e) =>
                    handleInputChange("requirement.url", e.target.value)
                  }
                  placeholder="https://docs.stripe.com/payments"
                />
              </div>
            </div>

            {/* Team Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Team Management</h3>

              {/* Add New Member */}
              <div className="border rounded-lg p-4 bg-muted/20">
                <h4 className="font-medium mb-3">Add Team Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input
                    placeholder="Member name"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Select
                    value={newMember.role}
                    onValueChange={(value: keyof TeamStructure) =>
                      setNewMember((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uiux">UI/UX</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addTeamMember}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Current Team Members */}
              <div className="space-y-4">
                {(["uiux", "frontend", "backend"] as const).map((role) => (
                  <div key={role} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3 capitalize">
                      {role === "uiux" ? "UI/UX" : role} Team (
                      {formData.team[role].length})
                    </h4>
                    <div className="space-y-2">
                      {formData.team[role].map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-muted/30 p-2 rounded"
                        >
                          <div>
                            <span className="font-medium">{member.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {member.email}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTeamMember(role, member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      {formData.team[role].length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No members in this role
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="note">Notes</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                placeholder="Project notes and additional information..."
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Update Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectUpdateForm;
