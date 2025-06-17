"use client";

import { useAuth } from "@/hooks/useAuth";
import AccessDenied from "./access-denied";
import LoginForm from "./login-form";
import type { UserRole } from "@/types/auth";
import type { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: RoleGuardProps) {
  const { user, hasRole, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }

  if (!hasRole(allowedRoles)) {
    return fallback || <AccessDenied requiredRoles={allowedRoles} />;
  }

  return <>{children}</>;
}
