"use client";
import { useState, useEffect, use } from "react";
import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useUpdateUserMutation } from "@/store/slices/profileSlice";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function ProfileUpdate() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoginLoading } = useAuth();

  const [updateUser] = useUpdateUserMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const localUser = JSON.parse(localStorage.getItem("user") || "{}");

    const profileData = { userId, userName, email, image };
    localUser.userId = profileData.userId;
    localUser.userName = profileData.userName;
    localUser.image = profileData.image;
    localUser.email = profileData.email;

    try {
      await updateUser({ id: user?.id, ...profileData }).unwrap();
      toast("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Update failed");
    } finally {
      localStorage.setItem("user", JSON.stringify(localUser));
      // window.location = "/profile/details";
      window.location.href = "/profile/details";
      setIsSubmitting(false);
    }
  };

  // Initialize form with user data when user is loaded
  useEffect(() => {
    if (user && !isLoginLoading) {
      setUserId(user.userId || "");
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setImage(user.image || "");
    }
  }, [user, isLoginLoading]);

  // Handle image upload
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time-using_cloudinary");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const uploadedImageUrl = await res.json();
      setImage(uploadedImageUrl?.url);
    } catch (error) {
      console.error("Image upload failed", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const defaultBackgroundImage =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  if (isLoginLoading) {
    return (
      <div className="flex items-center justify-center ">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {/* Profile Background and Avatar */}
        <div
          className="relative h-36 md:h-44 bg-cover bg-center"
          style={{
            backgroundImage: `url('${user?.image || defaultBackgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
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

        {/* Spacer under Avatar */}
        <div className="pt-14 pb-6">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userId">User ID *</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your user ID"
                  disabled={true}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Username *</Label>
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading || isSubmitting}
                    className="flex-1"
                  />
                  {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
