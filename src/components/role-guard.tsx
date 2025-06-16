"use client"

import type React from "react"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import AccessDenied from "./access-denied"
import LoginForm from "./login-form"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}

export default function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user, hasRole, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (!hasRole(allowedRoles)) {
    return fallback || <AccessDenied requiredRoles={allowedRoles} />
  }

  return <>{children}</>
}
