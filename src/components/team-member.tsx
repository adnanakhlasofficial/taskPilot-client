"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetTeamsQuery } from "@/store/api/teamApi";

export default function TeamTable() {
  const { data, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) {
    return <Skeleton className="h-10 w-full mt-6" />;
  }

  if (isError || !data?.data.length) {
    return <p className="text-red-500 mt-4">Failed to load teams.</p>;
  }

  return (
    <div className="p-4">
      {data.data.map((team) => (
        <div
          key={team.id}
          className="mb-10 border border-gray-200 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <h2 className="text-lg font-semibold">{team.teamName}</h2>
            <Button variant="outline" className="text-sm">
              Update Team
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.members.map(({ id, user }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>
                          {user.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
