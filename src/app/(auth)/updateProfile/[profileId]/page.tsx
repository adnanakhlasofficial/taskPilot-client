"use client";

// import { useCreateAllUserMutation} from "@/features/loginSlice/loginSlice";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Loader2, LogIn } from "lucide-react";
// import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [userId, setuserId] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");;
//   const [createAllUser, {isLoading}] = useCreateAllUserMutation()
//   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // try {
    //   const result = await createAllUser({ userId, userName, email, password, role:"member" }).unwrap();
    //   console.log("Login success:", result);
    //   router.push("/dashboard");
    // } catch (err: unknown) {
    //   console.error("Login failed:", err);
    //   setError("Invalid User Id or password");
    // }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {/* <LogIn className="h-6 w-6" /> */}
          </div>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User Id</Label>
              <Input
                id="userId"
                type="userId"
                placeholder="Enter your userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                type="userName"
                placeholder="Enter your userName"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="email"
                type="Email"
                placeholder="Enter your userName"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Update Profile
                </>
              )}
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
