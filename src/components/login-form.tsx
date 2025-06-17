"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/types/auth";
import { Eye, EyeOff, Loader2, LogIn, User } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { login, isLoading, error, clearError } = useAuth();

  // Clear errors when component mounts or inputs change
  useEffect(() => {
    if (error) {
      clearError();
    }
    if (localError) {
      setLocalError("");
    }
  }, [userId, password, clearError, error, localError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!userId || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (userId.length < 3) {
      setLocalError("User ID must be at least 3 characters");
      return;
    }

    const credentials: LoginCredentials = { userId, password };
    const result = await login(credentials);
    if (result.success) {
      // Redirect to home page on successful login
      redirect("/dashboard");
    } else {
      // Handle error from login
      setLocalError(
        typeof result.error === "string" ? result.error : "Login failed"
      );
    }
  };

  const fillDemoUser = (demoUserId: string, demoPassword: string) => {
    setUserId(demoUserId);
    setPassword(demoPassword);
  };

  const displayError = localError || error;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <LogIn className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to access TaskPilot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <div className="relative">
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="username"
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {displayError && (
              <Alert variant="destructive">
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Development Helper */}
          {process.env.NODE_ENV === "production" && (
            <div className="space-y-3 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Development Mode - Demo Users
                </p>
              </div>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoUser("U001", "123456")}
                  disabled={isLoading}
                  className="justify-start text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1">
                      <div className="font-medium">Admin User</div>
                      <div className="text-xs text-muted-foreground">
                        User ID: U001
                      </div>
                    </div>
                    <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Admin
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoUser("U002", "123456")}
                  disabled={isLoading}
                  className="justify-start text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1">
                      <div className="font-medium">Leader User</div>
                      <div className="text-xs text-muted-foreground">
                        User ID: U002
                      </div>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Leader
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoUser("U003", "123456")}
                  disabled={isLoading}
                  className="justify-start text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1">
                      <div className="font-medium">Member User</div>
                      <div className="text-xs text-muted-foreground">
                        User ID: U003
                      </div>
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Member
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
