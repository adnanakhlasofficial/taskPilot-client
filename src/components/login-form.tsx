// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Badge } from "@/components/ui/badge"
// import { Loader2, LogIn, User } from "lucide-react"
// import { useAuth } from "@/contexts/auth-context"

// export default function LoginForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const { login, isLoading } = useAuth()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     const success = await login(email, password)
//     if (!success) {
//       setError("Invalid email or password")
//     }
//   }

//   const demoUsers = [
//     { email: "admin@company.com", role: "admin", name: "John Doe" },
//     { email: "co-leader@company.com", role: "co-leader", name: "Jane Smith" },
//     { email: "member@company.com", role: "team-member", name: "Bob Wilson" },
//     { email: "viewer@company.com", role: "viewer", name: "Alice Cooper" },
//   ]

//   const fillDemoUser = (userEmail: string) => {
//     setEmail(userEmail)
//     setPassword("password")
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
//             <LogIn className="h-6 w-6" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//           <CardDescription>Sign in to access ProjectHub</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 <>
//                   <LogIn className="mr-2 h-4 w-4" />
//                   Sign In
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="space-y-3">
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground">Demo Users (Password: "password")</p>
//             </div>
//             <div className="grid gap-2">
//               {demoUsers.map((user) => (
//                 <Button
//                   key={user.email}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => fillDemoUser(user.email)}
//                   className="justify-start text-left"
//                 >
//                   <div className="flex items-center gap-2 w-full">
//                     <User className="h-4 w-4" />
//                     <div className="flex-1">
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-xs text-muted-foreground">{user.email}</div>
//                     </div>
//                     <Badge variant="secondary" className="capitalize text-xs">
//                       {user.role.replace("-", " ")}
//                     </Badge>
//                   </div>
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useLoginMutation } from "@/features/loginSlice/loginSlice"

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Badge } from "@/components/ui/badge"
import { Loader2, LogIn, User } from "lucide-react"

export default function LoginForm() {
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const result = await login({ email, password }).unwrap()
      console.log("Login success:", result)
    } catch (err: any) {
      console.error("Login failed:", err)
      setError("Invalid User Id or password")
    }
  }

  // const demoUsers = [
  //   { email: "admin@company.com", role: "admin", name: "John Doe" },
  //   { email: "co-leader@company.com", role: "co-leader", name: "Jane Smith" },
  //   { email: "member@company.com", role: "team-member", name: "Bob Wilson" },
  //   { email: "viewer@company.com", role: "viewer", name: "Alice Cooper" },
  // ]

  const fillDemoUser = (email: string) => {
    setemail(email)
    setPassword("password")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <LogIn className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to access ProjectHub</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
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

          {/* <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Demo Users (Password: "password")</p>
            </div>
            <div className="grid gap-2">
              {demoUsers.map((user) => (
                <Button
                  key={user.email}
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoUser(user.email)}
                  className="justify-start text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <Badge variant="secondary" className="capitalize text-xs">
                      {user.role.replace("-", " ")}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}

