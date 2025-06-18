"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/auth";
import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronDown,
  CircleUserRound,
  Clock,
  FolderKanban,
  HelpCircle,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  Shield,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Suspense } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();

  // Navigation items with role-based access
  const navigationItems = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/dashboard",
          isActive: pathname === "/dashboard",
          roles: ["admin", "co-leader", "member", "leader"],
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "All Projects",
          icon: FolderKanban,
          url: "/projects",
          isActive: pathname === "/projects",
          roles: ["admin", "co-leader", "member", "leader"],
        },
        {
          title: "My Tasks",
          icon: Target,
          url: "/tasks",
          isActive: pathname === "/tasks",
          roles: ["admin", "co-leader", "team-member"],
        },
        {
          title: "Timeline",
          icon: Calendar,
          url: "/timeline",
          isActive: pathname === "/timeline",
          roles: ["admin", "co-leader", "team-member"],
        },
      ],
    },
    {
      title: "Team",
      items: [
        {
          title: "Team Members",
          icon: Users,
          url: "/team",
          isActive: pathname === "/team",
          roles: ["admin", "co-leader"],
        },
        {
          title: "Bonus",
          icon: TrendingUp,
          url: "/bonus",
          isActive: pathname === "/bonus",
          roles: ["admin"],
        },
      ],
    },
    // {
    //   title: "Management",
    //   items: [
    //     {
    //       title: "Clients",
    //       icon: Briefcase,
    //       url: "/clients",
    //       isActive: pathname === "/clients",
    //       roles: ["admin", "co-leader"],
    //     },
    //     {
    //       title: "Time Tracking",
    //       icon: Clock,
    //       url: "/time-tracking",
    //       isActive: pathname === "/time-tracking",
    //       roles: ["admin", "co-leader", "team-member"],
    //     },
    //   ],
    // },
  ];

  const handleLogout = () => {
    logout();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "co-leader":
        return "bg-blue-100 text-blue-800";
      case "team-member":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter navigation items based on user role
  const filteredNavigationItems = navigationItems
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !user || hasRole(item.roles as UserRole[])
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen flex w-full bg-background">
          {/* Sidebar */}
          <Sidebar variant="inset" className="border-r">
            <SidebarHeader className="border-b border-sidebar-border">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FolderKanban className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TaskPilot</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Team Dashboard
                  </span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              {filteredNavigationItems.map((group) => (
                <SidebarGroup key={group.title}>
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url}>
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                              {item.roles.includes("admin") &&
                                item.roles.length <= 2 && (
                                  <Shield className="ml-auto size-3 text-muted-foreground" />
                                )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={
                              user?.image ||
                              "/placeholder.svg?height=32&width=32"
                            }
                            alt="User"
                          />
                          <AvatarFallback className="rounded-lg">
                            <CircleUserRound />
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {user?.userName || "User"}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="truncate text-xs text-muted-foreground">
                              {user?.email}
                            </span>
                            {user && (
                              <Badge
                                variant="outline"
                                className={`text-xs ${getRoleColor(user.role)}`}
                              >
                                {user.role.replace("-", " ")}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ChevronDown className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={
                                user?.image ||
                                "/placeholder.svg?height=32&width=32"
                              }
                              alt="User"
                            />
                            <AvatarFallback className="rounded-lg">
                              <CircleUserRound />
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              {user?.userName || "User"}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="truncate text-xs text-muted-foreground">
                                {user?.email}
                              </span>
                              {user && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getRoleColor(
                                    user.role
                                  )}`}
                                >
                                  {user.role.replace("-", " ")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="flex flex-1 flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger className="-ml-1" />
                <div className="flex flex-1 items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search projects, tasks, or team members..."
                      className="pl-10"
                    />
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    {hasRole(["admin"]) && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </Suspense>
    </SidebarProvider>
  );
}
