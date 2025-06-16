"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Hash, Search, Plus, MoreVertical, Settings, Bell, UserPlus, Lock } from "lucide-react"

interface Channel {
  id: string
  name: string
  type: "channel" | "dm" | "group"
  isPrivate?: boolean
  unreadCount?: number
  lastMessage?: string
  lastActivity?: string
  members?: string[]
  isOnline?: boolean
  project?: string
}

interface ChatSidebarProps {
  activeChannel: string
  onChannelSelect: (channelId: string) => void
}

export default function ChatSidebar({ activeChannel, onChannelSelect }: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const channels: Channel[] = [
    {
      id: "general",
      name: "general",
      type: "channel",
      unreadCount: 3,
      lastMessage: "Hey team, great work on the project!",
      lastActivity: "2m ago",
    },
    {
      id: "prj-001",
      name: "prj-001-alpha",
      type: "channel",
      isPrivate: true,
      project: "PRJ-001",
      unreadCount: 1,
      lastMessage: "UI mockups are ready for review",
      lastActivity: "5m ago",
    },
    {
      id: "prj-002",
      name: "prj-002-beta",
      type: "channel",
      isPrivate: true,
      project: "PRJ-002",
      lastMessage: "Backend API testing completed",
      lastActivity: "1h ago",
    },
    {
      id: "design-team",
      name: "design-team",
      type: "channel",
      unreadCount: 2,
      lastMessage: "New design system components",
      lastActivity: "30m ago",
    },
    {
      id: "dev-team",
      name: "dev-team",
      type: "channel",
      lastMessage: "Code review session at 3 PM",
      lastActivity: "45m ago",
    },
  ]

  const directMessages: Channel[] = [
    {
      id: "dm-john",
      name: "John Doe",
      type: "dm",
      isOnline: true,
      unreadCount: 2,
      lastMessage: "Can we discuss the project timeline?",
      lastActivity: "10m ago",
    },
    {
      id: "dm-jane",
      name: "Jane Smith",
      type: "dm",
      isOnline: true,
      lastMessage: "Thanks for the feedback!",
      lastActivity: "1h ago",
    },
    {
      id: "dm-bob",
      name: "Bob Wilson",
      type: "dm",
      isOnline: false,
      lastMessage: "I'll send the files tomorrow",
      lastActivity: "3h ago",
    },
  ]

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredDMs = directMessages.filter((dm) => dm.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const renderChannelItem = (channel: Channel) => (
    <div
      key={channel.id}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
        activeChannel === channel.id ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
      }`}
      onClick={() => onChannelSelect(channel.id)}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {channel.type === "channel" ? (
          <div className="flex items-center gap-1">
            {channel.isPrivate ? (
              <Lock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Hash className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        ) : (
          <div className="relative">
            <Avatar className="w-6 h-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" />
              <AvatarFallback className="text-xs">
                {channel.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {channel.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{channel.name}</span>
            {channel.project && (
              <Badge variant="outline" className="text-xs">
                {channel.project}
              </Badge>
            )}
          </div>
          {channel.lastMessage && <p className="text-xs text-muted-foreground truncate">{channel.lastMessage}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {channel.unreadCount && channel.unreadCount > 0 && (
          <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
            {channel.unreadCount > 99 ? "99+" : channel.unreadCount}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">{channel.lastActivity}</span>
      </div>
    </div>
  )

  return (
    <div className="w-80 border-r bg-muted/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Chat</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Chat Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Members
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Channels */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Channels</h3>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">{filteredChannels.map(renderChannelItem)}</div>
          </div>

          <Separator />

          {/* Direct Messages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Direct Messages</h3>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">{filteredDMs.map(renderChannelItem)}</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
