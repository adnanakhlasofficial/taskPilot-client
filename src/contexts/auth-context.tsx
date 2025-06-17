"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "admin@company.com",
    role: "admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "co-leader@company.com",
    role: "co-leader",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "member@company.com",
    role: "team-member",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Alice Cooper",
    email: "viewer@company.com",
    role: "viewer",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser && password === "password") {
      // Simple mock password
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
