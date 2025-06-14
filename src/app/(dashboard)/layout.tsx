"use client";

import type React from "react";
import { Suspense } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  Users,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Plus,
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun,
  Briefcase,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navigationItems = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/dashboard",
          isActive: pathname === "/dashboard",
        },
        {
          title: "Analytics",
          icon: BarChart3,
          url: "/analytics",
          isActive: pathname === "/analytics",
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
        },
        {
          title: "My Tasks",
          icon: Target,
          url: "/tasks",
          isActive: pathname === "/tasks",
        },
        {
          title: "Timeline",
          icon: Calendar,
          url: "/timeline",
          isActive: pathname === "/timeline",
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
        },
        {
          title: "Performance",
          icon: TrendingUp,
          url: "/performance",
          isActive: pathname === "/performance",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Clients",
          icon: Briefcase,
          url: "/clients",
          isActive: pathname === "/clients",
        },
        {
          title: "Time Tracking",
          icon: Clock,
          url: "/time-tracking",
          isActive: pathname === "/time-tracking",
        },
      ],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
                  <span className="truncate font-semibold">ProjectHub</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Team Dashboard
                  </span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              {navigationItems.map((group) => (
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
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          />
                          <AvatarFallback className="rounded-lg">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            John Doe
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            john@company.com
                          </span>
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
                              src="/placeholder.svg?height=32&width=32"
                              alt="User"
                            />
                            <AvatarFallback className="rounded-lg">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              John Doe
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              john@company.com
                            </span>
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
                      <DropdownMenuItem>
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
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>

                    {/* Theme Toggle */}
                    <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                      {isDarkMode ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>

                    {/* Notifications */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="relative">
                          <Bell className="h-4 w-4" />
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                            3
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="space-y-2 p-2">
                          <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">
                                New project assigned
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PRJ-005 has been assigned to your team
                              </p>
                              <p className="text-xs text-muted-foreground">
                                2 minutes ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
                            <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">
                                Task completed
                              </p>
                              <p className="text-xs text-muted-foreground">
                                UI Design for PRJ-003 is ready for review
                              </p>
                              <p className="text-xs text-muted-foreground">
                                1 hour ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
                            <div className="h-2 w-2 rounded-full bg-orange-500 mt-2"></div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">
                                Deadline reminder
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PRJ-001 deadline is tomorrow
                              </p>
                              <p className="text-xs text-muted-foreground">
                                3 hours ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="User"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                      >
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              John Doe
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              john@company.com
                            </p>
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
                          Help
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
              <div className="mx-auto p-6">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </Suspense>
    </SidebarProvider>
  );
}
