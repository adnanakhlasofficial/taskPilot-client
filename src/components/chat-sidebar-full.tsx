"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Hash,
  Search,
  Plus,
  MoreVertical,
  Settings,
  Bell,
  UserPlus,
  Lock,
  Users,
  MessageCircle,
  Star,
  Archive,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react"

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
  isPinned?: boolean
  isMuted?: boolean
  description?: string
}

interface ChatSidebarFullProps {
  activeChannel: string
  onChannelSelect: (channelId: string) => void
}

export default function ChatSidebarFull({ activeChannel, onChannelSelect }: ChatSidebarFullProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  const channels: Channel[] = [
    {
      id: "general",
      name: "general",
      type: "channel",
      unreadCount: 3,
      lastMessage: "Hey team, great work on the project!",
      lastActivity: "2m ago",
      description: "General team discussions",
      isPinned: true,
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
      description: "Alpha Squad project discussions",
    },
    {
      id: "prj-002",
      name: "prj-002-beta",
      type: "channel",
      isPrivate: true,
      project: "PRJ-002",
      lastMessage: "Backend API testing completed",
      lastActivity: "1h ago",
      description: "Beta Crew project discussions",
    },
    {
      id: "design-team",
      name: "design-team",
      type: "channel",
      unreadCount: 2,
      lastMessage: "New design system components",
      lastActivity: "30m ago",
      description: "Design team coordination",
    },
    {
      id: "dev-team",
      name: "dev-team",
      type: "channel",
      lastMessage: "Code review session at 3 PM",
      lastActivity: "45m ago",
      description: "Development team discussions",
    },
    {
      id: "announcements",
      name: "announcements",
      type: "channel",
      lastMessage: "Company all-hands meeting next Friday",
      lastActivity: "2h ago",
      description: "Important company announcements",
      isPinned: true,
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
    {
      id: "dm-alice",
      name: "Alice Cooper",
      type: "dm",
      isOnline: true,
      lastMessage: "Great presentation today!",
      lastActivity: "2h ago",
    },
    {
      id: "dm-mike",
      name: "Mike Johnson",
      type: "dm",
      isOnline: false,
      lastMessage: "Let's sync up tomorrow",
      lastActivity: "1d ago",
    },
  ]

  const groupChats: Channel[] = [
    {
      id: "group-leads",
      name: "Team Leads",
      type: "group",
      members: ["john", "jane", "alice"],
      unreadCount: 1,
      lastMessage: "Quarterly planning session",
      lastActivity: "1h ago",
      description: "Leadership team discussions",
    },
    {
      id: "group-frontend",
      name: "Frontend Guild",
      type: "group",
      members: ["jane", "bob", "mike", "sarah"],
      lastMessage: "New React patterns discussion",
      lastActivity: "3h ago",
      description: "Frontend developers community",
    },
  ]

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredDMs = directMessages.filter((dm) => {
    const matchesSearch = dm.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOnlineFilter = !showOnlineOnly || dm.isOnline
    return matchesSearch && matchesOnlineFilter
  })

  const filteredGroups = groupChats.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const renderChannelItem = (channel: Channel) => (
    <div
      key={channel.id}
      className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        activeChannel === channel.id ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted/50"
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
        ) : channel.type === "group" ? (
          <Users className="w-4 h-4 text-muted-foreground" />
        ) : (
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
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
            {channel.isPinned && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
            {channel.isMuted && <VolumeX className="w-3 h-3 text-muted-foreground" />}
          </div>
          {channel.lastMessage && <p className="text-xs text-muted-foreground truncate">{channel.lastMessage}</p>}
          {channel.description && !channel.lastMessage && (
            <p className="text-xs text-muted-foreground truncate">{channel.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {channel.unreadCount && channel.unreadCount > 0 && (
          <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
            {channel.unreadCount > 99 ? "99+" : channel.unreadCount}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">{channel.lastActivity}</span>

        {/* Channel Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Star className="w-4 h-4 mr-2" />
                {channel.isPinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {channel.isMuted ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {channel.isMuted ? "Unmute" : "Mute"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
              {channel.type !== "dm" && (
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Leave Channel
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  const totalUnread = [...channels, ...directMessages, ...groupChats].reduce(
    (sum, item) => sum + (item.unreadCount || 0),
    0,
  )

  const onlineCount = directMessages.filter((dm) => dm.isOnline).length

  return (
    <div className="w-80 border-r bg-muted/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Team Chat</h2>
            {totalUnread > 0 && (
              <Badge variant="destructive" className="text-xs">
                {totalUnread}
              </Badge>
            )}
          </div>
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
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{onlineCount} online</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setShowOnlineOnly(!showOnlineOnly)}>
            {showOnlineOnly ? "Show All" : "Online Only"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Pinned Channels */}
          {channels.some((c) => c.isPinned) && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <Star className="w-3 h-3" />
                  Pinned
                </h3>
              </div>
              <div className="space-y-1">{channels.filter((c) => c.isPinned).map(renderChannelItem)}</div>
            </div>
          )}

          {/* Channels */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Channels ({filteredChannels.length})
              </h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">{filteredChannels.filter((c) => !c.isPinned).map(renderChannelItem)}</div>
          </div>

          <Separator />

          {/* Group Chats */}
          {filteredGroups.length > 0 && (
            <>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Groups ({filteredGroups.length})
                  </h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">{filteredGroups.map(renderChannelItem)}</div>
              </div>
              <Separator />
            </>
          )}

          {/* Direct Messages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Direct Messages ({filteredDMs.length})
              </h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">{filteredDMs.map(renderChannelItem)}</div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t bg-background">
        <Card className="p-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">Connected</span>
            <span className="text-muted-foreground">• {onlineCount} online</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
