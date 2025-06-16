"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Lock, Users } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/auth";

interface AccessDeniedProps {
  requiredRoles?: UserRole[];
  message?: string;
}

export default function AccessDenied({
  requiredRoles = ["admin", "leader"],
  message = "You don't have permission to access this page.",
}: AccessDeniedProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-red-600">
            Access Denied
          </CardTitle>
          <CardDescription className="text-center">{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Required Roles:
              </span>
            </div>
            <div className="flex justify-center gap-2">
              {requiredRoles.map((role) => (
                <Badge key={role} variant="outline" className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {user && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Your Role:
                </span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Contact your administrator if you believe this is an error.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
