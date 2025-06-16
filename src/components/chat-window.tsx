"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Edit,
  Hash,
  Lock,
  MoreVertical,
  Paperclip,
  Phone,
  Pin,
  Reply,
  Send,
  Smile,
  Star,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  isEdited?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  replyTo?: {
    id: string;
    userName: string;
    content: string;
  };
}

interface ChatWindowProps {
  channelId: string;
  channelName: string;
  channelType: "channel" | "dm" | "group";
  isPrivate?: boolean;
  members?: number;
}

export default function ChatWindow({
  // channelId,
  channelName,
  channelType,
  isPrivate = false,
  members = 0,
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "john",
      userName: "John Doe",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "Hey team! I've just pushed the latest updates to the repository. Please review when you get a chance.",
      timestamp: "10:30 AM",
      reactions: [
        { emoji: "👍", count: 3, users: ["jane", "bob", "alice"] },
        { emoji: "🚀", count: 1, users: ["jane"] },
      ],
    },
    {
      id: "2",
      userId: "jane",
      userName: "Jane Smith",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "Thanks John! I'll take a look at it this afternoon. The UI components look great so far.",
      timestamp: "10:35 AM",
      replyTo: {
        id: "1",
        userName: "John Doe",
        content: "Hey team! I've just pushed the latest updates...",
      },
    },
    {
      id: "3",
      userId: "bob",
      userName: "Bob Wilson",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "I've completed the backend API testing. All endpoints are working correctly. Here's the test report:",
      timestamp: "11:15 AM",
      attachments: [
        {
          id: "att1",
          name: "test-report.pdf",
          type: "pdf",
          url: "#",
        },
      ],
    },
    {
      id: "4",
      userId: "alice",
      userName: "Alice Cooper",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "Great work everyone! The project is really coming together. Should we schedule a quick sync meeting for tomorrow?",
      timestamp: "11:45 AM",
      isEdited: true,
    },
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        userId: "current-user",
        userName: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find(
            (r) => r.emoji === emoji
          );
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: r.count + 1,
                      users: [...r.users, "current-user"],
                    }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { emoji, count: 1, users: ["current-user"] },
              ],
            };
          }
        }
        return msg;
      })
    );
  };

  const renderMessage = (msg: Message) => (
    <div
      key={msg.id}
      className="group flex gap-3 p-3 hover:bg-muted/30 transition-colors"
    >
      <Avatar className="w-8 h-8 mt-1">
        <AvatarImage src={msg.userAvatar || "/placeholder.svg"} />
        <AvatarFallback className="text-xs">
          {msg.userName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{msg.userName}</span>
          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
          {msg.isEdited && (
            <Badge variant="outline" className="text-xs">
              edited
            </Badge>
          )}
        </div>

        {msg.replyTo && (
          <div className="mb-2 p-2 border-l-2 border-muted bg-muted/20 rounded text-sm">
            <div className="font-medium text-xs text-muted-foreground mb-1">
              Replying to {msg.replyTo.userName}
            </div>
            <div className="text-muted-foreground truncate">
              {msg.replyTo.content}
            </div>
          </div>
        )}

        <div className="text-sm leading-relaxed mb-2">{msg.content}</div>

        {msg.attachments && msg.attachments.length > 0 && (
          <div className="space-y-2 mb-2">
            {msg.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 p-2 border rounded-lg bg-muted/20 w-fit"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{attachment.name}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}

        {msg.reactions && msg.reactions.length > 0 && (
          <div className="flex gap-1 mb-2">
            {msg.reactions.map((reaction) => (
              <Button
                key={reaction.emoji}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => addReaction(msg.id, reaction.emoji)}
              >
                {reaction.emoji} {reaction.count}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => addReaction(msg.id, "👍")}>
              <span className="mr-2">👍</span> React
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pin className="w-4 h-4 mr-2" />
              Pin Message
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="w-4 h-4 mr-2" />
              Save
            </DropdownMenuItem>
            {msg.userId === "current-user" && (
              <>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-3">
          {channelType === "channel" ? (
            <div className="flex items-center gap-2">
              {isPrivate ? (
                <Lock className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Hash className="w-5 h-5 text-muted-foreground" />
              )}
              <h2 className="font-semibold text-lg">{channelName}</h2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  {channelName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{channelName}</h2>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          )}
          {members > 0 && (
            <Badge variant="outline" className="ml-2">
              <Users className="w-3 h-3 mr-1" />
              {members} members
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {channelType === "dm" && (
            <>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <Users className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pin className="w-4 h-4 mr-2" />
                Pinned Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="w-4 h-4 mr-2" />
                Saved Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="w-4 h-4 mr-2" />
                Member List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-0" ref={scrollAreaRef}>
        <div className="space-y-0">{messages.map(renderMessage)}</div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${
                channelType === "channel" ? "#" + channelName : channelName
              }...`}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift + Enter for new line
        </div>
      </div>
    </div>
  );
}
