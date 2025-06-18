// "use client"
// import { useState, useEffect, use } from "react"
// import type React from "react"

// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Upload, Loader2 } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useAuth } from "@/contexts/auth-context"

// export default function UpdateProfile() {
//   const [userId, setUserId] = useState("")
//   const [userName, setUserName] = useState("")
//   const [email, setEmail] = useState("")
//   const [image, setImage] = useState("")
//   const [error, setError] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { user, isLoginLoading } = useAuth()

//   // Initialize form with user data when user is loaded
//   useEffect(() => {
//     if (user && !isLoginLoading) {
//       setUserId(user.userId || "")
//       setUserName(user.userName || "")
//       setEmail(user.email || "")
//       setImage(user.image || "")
//     }
//   }, [user, isLoginLoading])

//   // Handle image upload
//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file")
//       return
//     }

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size should be less than 5MB")
//       return
//     }

//     setIsUploading(true)
//     setError("")

//     const data = new FormData()
//     data.append("file", file)
//     data.append("upload_preset", "first_time-using_cloudinary")

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload", {
//         method: "POST",
//         body: data,
//       })

//       if (!res.ok) {
//         throw new Error("Upload failed")
//       }

//       const uploadedImageUrl = await res.json()
//       setImage(uploadedImageUrl?.url)
//     } catch (error) {
//       console.error("Image upload failed", error)
//       setError("Failed to upload image. Please try again.")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsSubmitting(true)

//     // Basic validation
//     if (!userId.trim() || !userName.trim() || !email.trim()) {
//       setError("Please fill in all required fields")
//       setIsSubmitting(false)
//       return
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address")
//       setIsSubmitting(false)
//       return
//     }

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       const profileData = {
//         userId: userId.trim(),
//         userName: userName.trim(),
//         email: email.trim(),
//         image: image || null,
//       }

//       console.log("Profile updated=============================================:", profileData)
//       const response = await fetch(`https://task-pilot-server2.vercel.app/api/v1/user/${user?.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(profileData),
//       })



//       // Show success message
//       setError("")
//       alert("Profile updated successfully!")
//     } catch (error) {
//       console.error(error)
//       setError("Failed to update profile. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const defaultBackgroundImage =
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

//   if (isLoginLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="flex items-center gap-2">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span>Loading user data...</span>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background p-4">
//       <Card className="w-full max-w-md">
//         {/* Profile Background and Avatar */}
//         <div
//           className="relative h-36 md:h-44 bg-cover bg-center"
//           style={{ backgroundImage: `url('${user?.image || defaultBackgroundImage}')` }}
//         >
//           <div className="absolute inset-0 bg-black/30" />
//           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
//             <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
//               {
//                 user?.image ? (<AvatarImage src={user?.image} alt={user?.userName} />) : (<AvatarImage src={defaultBackgroundImage} />)
//               }
//               <AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>

//         {/* Spacer under Avatar */}
//         <div className="pt-14 pb-6">
//           <CardHeader className="text-center pb-2">
//             <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="userId">User ID *</Label>
//                 <Input
//                   id="userId"
//                   type="text"
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                   placeholder="Enter your user ID"
//                   disabled={true}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="userName">Username *</Label>
//                 <Input
//                   id="userName"
//                   type="text"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   placeholder="Enter your username"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="image">Profile Image</Label>
//                 <div className="flex items-center gap-2">
//                   <Input
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     disabled={isUploading || isSubmitting}
//                     className="flex-1"
//                   />
//                   {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Updating Profile...
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="mr-2 h-4 w-4" />
//                     Update Profile
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </div>
//       </Card>
//     </div>
//   )
// }

////////===================================================================
"use client"
import { useState, useEffect, use } from "react"
import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useUpdateUserMutation } from "@/store/slices/profileSlice"

export default function UpdateProfile() {
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoginLoading } = useAuth()

  const [updateUser] = useUpdateUserMutation(); 

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const profileData = { userId, userName, email, image }
    localStorage.setItem("user", JSON.stringify(profileData))

    try {
      await updateUser({ id: user?.id, ...profileData }).unwrap()
      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Update failed:", err)
      setError("Update failed")
    }
  }


  // Initialize form with user data when user is loaded
  useEffect(() => {
    if (user && !isLoginLoading) {
      setUserId(user.userId || "")
      setUserName(user.userName || "")
      setEmail(user.email || "")
      setImage(user.image || "")
    }
  }, [user, isLoginLoading])

  // Handle image upload
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    setError("")

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "first_time-using_cloudinary")

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const uploadedImageUrl = await res.json()
      setImage(uploadedImageUrl?.url)
    } catch (error) {
      console.error("Image upload failed", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }


  const defaultBackgroundImage =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

  if (isLoginLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        {/* Profile Background and Avatar */}
        <div
          className="relative h-36 md:h-44 bg-cover bg-center"
          style={{ backgroundImage: `url('${user?.image || defaultBackgroundImage}')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
              {
                user?.image ? (<AvatarImage src={user?.image} alt={user?.userName} />) : (<AvatarImage src={defaultBackgroundImage} />)
              }
              <AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Spacer under Avatar */}
        <div className="pt-14 pb-6">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userId">User ID *</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your user ID"
                  disabled={true}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Username *</Label>
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading || isSubmitting}
                    className="flex-1"
                  />
                  {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}


// //===========================================================

// "use client"
// import { useState, useEffect } from "react"
// import type React from "react"

// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Upload, Loader2 } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useAuth } from "@/contexts/auth-context"
// interface profileData {
//   userId: string
//   userName: string
//   email: string
//   image: string | null
// }

// export default function UpdateProfile() {
//   const [userId, setUserId] = useState("")
//   const [userName, setUserName] = useState("")
//   const [email, setEmail] = useState("")
//   const [image, setImage] = useState("")
//   const [error, setError] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { user, isLoginLoading } = useAuth()

//   // Load initial data from user context
//   useEffect(() => {
//     if (user && !isLoginLoading) {
//       setUserId(user.userId || "")
//       setUserName(user.userName || "")
//       setEmail(user.email || "")
//       setImage(user.image || "")
//     }
//   }, [user, isLoginLoading])

//   // Handle image upload
//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     setIsUploading(true)

//     const data = new FormData()
//     data.append("file", file)
//     data.append("upload_preset", "first_time-using_cloudinary")

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload", {
//         method: "POST",
//         body: data,
//       })
//       const uploaded = await res.json()
//       setImage(uploaded.url)
//     } catch (err) {
//       console.error("Image upload failed:", err)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsSubmitting(true)

//     const profileData = {
//       userId,
//       userName,
//       email,
//       image,
//     }

//     try {
//       const res = await fetch(
//         `https://task-pilot-server2.vercel.app/api/v1/user/${user?.id}`, // use correct id!
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(profileData),
//         }
//       )

//       if (!res.ok) {
//         const errorData = await res.json()
//         setError(errorData.message || "Update failed!")
//       } else {
//         const result = await res.json()
//         console.log("Profile updated:", result)
//       }
//     } catch (err) {
//       console.error("Update failed:", err)
//       setError("Something went wrong!")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const defaultBackgroundImage =
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

//   if (isLoginLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="flex items-center gap-2">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span>Loading user data...</span>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background p-4">
//       <Card className="w-full max-w-md">
//         {/* Profile Background and Avatar */}
//         <div
//           className="relative h-36 md:h-44 bg-cover bg-center"
//           style={{ backgroundImage: `url('${user?.photo || defaultBackgroundImage}')` }}
//         >
//           <div className="absolute inset-0 bg-black/30" />
//           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
//             <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
//               {user?.photo ? (
//                 <AvatarImage src={user?.photo} alt={user?.userName} />
//               ) : (
//                 <AvatarImage src={defaultBackgroundImage} />
//               )}
//               <AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>

//         <div className="pt-14 pb-6">
//           <CardHeader className="text-center pb-2">
//             <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="userId">User ID *</Label>
//                 <Input
//                   id="userId"
//                   type="text"
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="userName">Username *</Label>
//                 <Input
//                   id="userName"
//                   type="text"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   placeholder="Enter your username"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="image">Profile Image</Label>
//                 <div className="flex items-center gap-2">
//                   <Input
//                     id="image"
//                     type="file"
//                     onChange={handleImageChange}
//                     disabled={isUploading || isSubmitting}
//                     className="flex-1"
//                   />
//                   {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Updating Profile...
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="mr-2 h-4 w-4" />
//                     Update Profile
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </div>
//       </Card>
//     </div>
//   )
// }
