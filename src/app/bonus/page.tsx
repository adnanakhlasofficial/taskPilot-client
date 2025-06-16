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
  user,
  User,
  PhoneCall,
  Component,
  DollarSignIcon,
  Receipt,
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

  const members: Member[] = [
    {
      name: "John Doe",
      phone: "01234567890",
      address: "123 Main St",
      designation: "Manager",
      amountToBePaid: "৳5,000",
      lastPaidAmount: "৳2,000",
    },
    {
      name: "Jane Smith",
      phone: "01987654321",
      address: "456 Park Ave",
      designation: "Accountant",
      amountToBePaid: "৳3,000",
      lastPaidAmount: "৳3,000",
    },
    // ➕  Add more members as needed …
  ];

  const filteredMembers = members.filter((m) => {
    const q = searchTerm.toLowerCase().trim();

    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.address.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q) ||
      m.amountToBePaid.toLowerCase().includes(q) ||
      m.lastPaidAmount.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-[calc(100%-var(--sidebar-width))] space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Bonus Management Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Track bonuses with UI/UX, Frontend, and Backend teams
              </p>
            </div>
            <div className="flex gap-4 items-center">
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
                  <TableRow>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Member Name
                      </div>
                    </TableHead>

                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <PhoneCall className="w-4 h-4" />
                        Phone
                      </div>
                    </TableHead>

                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Address
                      </div>
                    </TableHead>

                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Component className="w-4 h-4" />
                        Designation
                      </div>
                    </TableHead>

                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <DollarSignIcon className="w-4 h-4" />
                        Amount to be Paid
                      </div>
                    </TableHead>

                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-1">
                        <Receipt className="w-4 h-4" />
                        Last Paid Amount
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.phone}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.address}</TableCell>
                      <TableCell>{member.designation}</TableCell>
                      <TableCell>{member.amountToBePaid}</TableCell>
                      <TableCell>{member.lastPaidAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                No members found matching your search.
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <div>
              Showing {members.length} of {members.length} members
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTable;
