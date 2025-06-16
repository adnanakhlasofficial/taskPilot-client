"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"
import ChatSidebar from "./chat-sidebar"
import ChatWindow from "./chat-window"

interface ChatLayoutProps {
  isOpen: boolean
  onToggle: () => void
}

export default function ChatLayout({ isOpen, onToggle }: ChatLayoutProps) {
  const [activeChannel, setActiveChannel] = useState("general")
  const [isMinimized, setIsMinimized] = useState(false)

  const getChannelInfo = (channelId: string) => {
    const channelMap: Record<string, any> = {
      general: { name: "general", type: "channel", members: 12 },
      "prj-001": { name: "prj-001-alpha", type: "channel", isPrivate: true, members: 5 },
      "prj-002": { name: "prj-002-beta", type: "channel", isPrivate: true, members: 8 },
      "design-team": { name: "design-team", type: "channel", members: 6 },
      "dev-team": { name: "dev-team", type: "channel", members: 10 },
      "dm-john": { name: "John Doe", type: "dm" },
      "dm-jane": { name: "Jane Smith", type: "dm" },
      "dm-bob": { name: "Bob Wilson", type: "dm" },
    }
    return channelMap[channelId] || { name: "Unknown", type: "channel" }
  }

  const channelInfo = getChannelInfo(activeChannel)

  if (!isOpen) {
    return (
      <Button onClick={onToggle} className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50" size="lg">
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-background border rounded-lg shadow-2xl z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-[900px] h-[600px]"
      }`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-semibold">Team Chat</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <div className="flex h-[calc(100%-4rem)]">
          <ChatSidebar activeChannel={activeChannel} onChannelSelect={setActiveChannel} />
          <div className="flex-1">
            <ChatWindow
              channelId={activeChannel}
              channelName={channelInfo.name}
              channelType={channelInfo.type}
              isPrivate={channelInfo.isPrivate}
              members={channelInfo.members}
            />
          </div>
        </div>
      )}
    </div>
  )
}
