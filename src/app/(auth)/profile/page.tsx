"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

// Default user data
const user = {
  userId: "user123",
  userName: "Shahidul Islam",
  email: "shahidul@example.com",
  role: "member",
  photo: "https://i.pravatar.cc/150?img=3",
  coverPhoto: "https://source.unsplash.com/800x300/?abstract,technology",
};

export default function ProfilePage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-md rounded-2xl relative">
        {/* --- Cover Banner --- */}
        <div
          className="relative h-36 md:h-44 bg-cover bg-center"
          style={{ backgroundImage: `url('${user.photo}')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
              <AvatarImage src={user.photo} alt={user.userName} />
              <AvatarFallback>{user.userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Spacer under Avatar */}
        <div className="h-6" />

        {/* --- Header --- */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Profile Details
          </CardTitle>
        </CardHeader>

        {/* --- Profile Info --- */}
        <CardContent className="space-y-4 px-6 pb-6">
          <div className="text-center -mt-6">
            <span className="font-semibold capitalize bg-green-300 text- text-sm px-3 rounded-sm">{user.role}</span>
          </div>

          <div className="space-y-1">
            <Label>User ID</Label>
            <Input value={user.userId} readOnly />
          </div>

          <div className="space-y-1">
            <Label>User Name</Label>
            <Input value={user.userName} readOnly />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={user.email} readOnly />
          </div>
          <div className="absolute top-58 right-6 border-2 rounded-full p-2 bg-white shadow-md hover:bg-gray-100 transition-colors">
            <Link href={`/updateProfile/22`}>
            <FaRegEdit className="text-xl md:text-2xl text-black text-center" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
