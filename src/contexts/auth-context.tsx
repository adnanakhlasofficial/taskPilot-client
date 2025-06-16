// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"

// export type UserRole = "admin" | "co-leader" | "team-member" | "viewer"

// export interface User {
//   id: string
//   name: string
//   email: string
//   role: UserRole
//   avatar?: string
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<boolean>
//   logout: () => void
//   hasRole: (roles: UserRole[]) => boolean
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Mock users for demonstration
// const mockUsers: User[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "admin@company.com",
//     role: "admin",
//     // avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "co-leader@company.com",
//     role: "co-leader",
//     // avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     id: "3",
//     name: "Bob Wilson",
//     email: "member@company.com",
//     role: "team-member",
//     // avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     id: "4",
//     name: "Alice Cooper",
//     email: "viewer@company.com",
//     role: "viewer",
//     // avatar: "/placeholder.svg?height=32&width=32",
//   },
// ]

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for stored user session
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser))
//       } catch (error) {
//         console.error("Error parsing stored user:", error)
//         localStorage.removeItem("user")
//       }
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string): Promise<boolean> => {
//     setIsLoading(true)

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // Mock authentication - in real app, this would be an API call
//     const foundUser = mockUsers.find((u) => u.email === email)

//     if (foundUser && password === "password") {
//       // Simple mock password
//       setUser(foundUser)
//       localStorage.setItem("user", JSON.stringify(foundUser))
//       setIsLoading(false)
//       return true
//     }

//     setIsLoading(false)
//     return false
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//   }

//   const hasRole = (roles: UserRole[]): boolean => {
//     if (!user) return false
//     return roles.includes(user.role)
//   }

//   const value: AuthContextType = {
//     user,
//     login,
//     logout,
//     hasRole,
//     isLoading,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


// ================================================================================

"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import {
  useLoginMutation,
  useUserCreateQuery,
} from "@/features/loginSlice/loginSlice"

export type UserRole = "admin" | "co-leader" | "member" | "viewer"

export interface User {
 id: string;
  userId: string;
  userName: string;
  email: string;
  isActive: boolean;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasRole: (roles: UserRole[]) => boolean
  isLoading: boolean
  allUsers: User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [allUsers, setAllUsers] = useState<User[]>([])

  const [loginRequest, { isLoading: loginLoading }] = useLoginMutation()
  const {
    data: usersData,
    isLoading: userFetchLoading,
    error,
  } = useUserCreateQuery()

  // LocalStorage from user restore
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // all user set
  useEffect(() => {
    if (usersData) {
      setAllUsers(usersData)
    }
  }, [usersData])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await loginRequest({ userId: email, password }).unwrap()
      if (res?.user) {
        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasRole,
    isLoading: isLoading || loginLoading || userFetchLoading,
    allUsers,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}