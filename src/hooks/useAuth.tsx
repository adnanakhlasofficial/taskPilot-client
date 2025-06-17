"use client";

import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/store/api/authApi";
import {
  clearError,
  loadFromStorage,
  logout as logoutAction,
  selectAuthError,
  selectAuthLoading,
  selectCurrentToken,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
import type { LoginCredentials, UserRole } from "@/types/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Load auth state from localStorage on mount
  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      return { success: true, data: result };
    } catch (error: unknown) {
      return {
        success: false,
        error: error || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      // Call API logout if authenticated
      if (isAuthenticated) {
        await logoutMutation().unwrap();
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local state
      dispatch(logoutAction());
    }
  };

  const refreshToken = async () => {
    try {
      const result = await refreshTokenMutation().unwrap();
      return { success: true, data: result };
    } catch (error) {
      // If refresh fails, logout user
      dispatch(logoutAction());
      return {
        success: false,
        error: error || "Token refresh failed",
      };
    }
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user || !Array.isArray(roles)) return false;
    return roles.includes(user.role);
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading,
    error,
    login,
    logout,
    refreshToken,
    hasRole,
    clearError: clearAuthError,
  };
}
