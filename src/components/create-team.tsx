"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateTeamMutation } from "@/store/api/teamApi";
import { useGetUsersQuery } from "@/store/api/usersApi";

// Optional: You could fetch users to render labels/names

export default function AddTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const router = useRouter();
  const { data: memberOptions, isLoading: isMemberLoading } =
    useGetUsersQuery();

  const handleToggleMember = (id: string) => {
    setMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeam({ teamName, members }).unwrap();
      toast.success("Team created!");
      router.push("/teams");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  if (isMemberLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Team</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Team Name</label>
          <Input
            placeholder="e.g. Design Ninjas"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Members</label>
          <div className="flex flex-wrap gap-2">
            {memberOptions?.data.map((member) => (
              <Button
                className={`${member?.role === "admin" && "hidden"}`}
                key={member.id}
                type="button"
                variant={
                  members.includes(member?.userId) ? "default" : "outline"
                }
                onClick={() => handleToggleMember(member?.userId)}
              >
                {member?.userName}
              </Button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </div>
  );
}
