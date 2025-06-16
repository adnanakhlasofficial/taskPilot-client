"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, refreshToken, token } = useAuth();

  useEffect(() => {
    // Auto-refresh token on app load if user is authenticated
    if (isAuthenticated && token) {
      // Check if token needs refresh (you can add token expiry logic here)
      const checkTokenExpiry = () => {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const currentTime = Date.now() / 1000;

          // Refresh if token expires in less than 5 minutes
          if (payload.exp - currentTime < 300) {
            refreshToken();
          }
        } catch (error) {
          console.error("Error checking token expiry:", error);
        }
      };

      checkTokenExpiry();

      // Set up interval to check token expiry every 5 minutes
      const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, token, refreshToken]);

  return <>{children}</>;
}
