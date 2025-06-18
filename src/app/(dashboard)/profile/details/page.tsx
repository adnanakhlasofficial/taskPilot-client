"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();
  const defaultBackgroundImage =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-xl overflow-hidden shadow-md rounded-2xl relative">
        <div
          className="relative h-36 md:h-44 bg-cover bg-center"
          style={{
            backgroundImage: `url('${user?.image || defaultBackgroundImage}')`,
          }}
        >
          <div className="absolute inset-0" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
              {user?.image ? (
                <AvatarImage src={user?.image} alt={user?.userName} />
              ) : (
                <AvatarImage src={defaultBackgroundImage} />
              )}
              <AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="h-6" />
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          <div className="text-center -mt-6">
            <span className="font-semibold capitalize bg-green-300 text-sm px-3 rounded-sm">
              {user?.role}
            </span>
          </div>
          <div className="space-y-1">
            <Label>User ID</Label>
            <Input value={user?.userId} readOnly />
          </div>
          <div className="space-y-1">
            <Label>User Name</Label>
            <Input value={user?.userName} readOnly />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={user?.email} readOnly />
          </div>
          <div className="absolute top-58 right-6 border-2 rounded-full p-2 bg-white shadow-md hover:bg-gray-100 transition-colors">
            <Link href={`/profile/update`}>
              <FaRegEdit className="text-xl md:text-2xl text-black text-center" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
