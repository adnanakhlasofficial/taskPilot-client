"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Users,
  Pin,
  Star,
  Reply,
  Edit,
  Trash2,
  Hash,
  Lock,
  Search,
  Info,
  Settings,
  ImageIcon,
  File,
  Mic,
  AtSign,
  Bold,
  Italic,
  Code,
  Link,
  List,
  Quote,
  Calendar,
  Clock,
  CheckCheck,
  Check,
  Download,
  Eye,
} from "lucide-react";

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
    size?: string;
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
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "system" | "file" | "image";
}
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface ChatWindowFullProps {
  channelId: string;
  channelName: string;
  channelType: "channel" | "dm" | "group";
  isPrivate?: boolean;
  members?: number;
  messages?: Message[];
  onNewMessage?: (message: Message) => void;
}

export default function ChatWindowFull({
  channelId,
  channelName,
  channelType,
  isPrivate = false,
  members = 0,
  messages: externalMessages = [],
  onNewMessage,
}: ChatWindowFullProps) {
  const [message, setMessage] = useState("");
  // const [isTyping, setIsTyping] = useState(false);
  const isTyping = false; // Placeholder for typing indicator, can be replaced with actual logic
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(
    externalMessages.length > 0
      ? externalMessages
      : [
          {
            id: "system-1",
            userId: "system",
            userName: "System",
            content: `Welcome to #${channelName}! This is the beginning of your conversation.`,
            timestamp: "Yesterday",
            type: "system",
          },
          {
            id: "1",
            userId: "john",
            userName: "John Doe",
            userAvatar: "/placeholder.svg?height=32&width=32",
            content:
              "Hey team! I've just pushed the latest updates to the repository. Please review when you get a chance. The new authentication system is now live and ready for testing.",
            timestamp: "10:30 AM",
            status: "read",
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
            status: "read",
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
            status: "read",
            attachments: [
              {
                id: "att1",
                name: "test-report.pdf",
                type: "pdf",
                url: "#",
                size: "2.4 MB",
              },
              {
                id: "att2",
                name: "api-documentation.md",
                type: "markdown",
                url: "#",
                size: "156 KB",
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
            status: "read",
            isEdited: true,
          },
          {
            id: "5",
            userId: "mike",
            userName: "Mike Johnson",
            userAvatar: "/placeholder.svg?height=32&width=32",
            content: "I'm available for the sync meeting. How about 2 PM?",
            timestamp: "12:00 PM",
            status: "delivered",
          },
          {
            id: "6",
            userId: "current-user",
            userName: "You",
            content: "Sounds good! I'll send out calendar invites.",
            timestamp: "12:05 PM",
            status: "sent",
          },
        ]
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (externalMessages.length > 0) {
      setMessages(externalMessages);
    }
  }, [externalMessages]);

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext ||
      (window as typeof window).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: `${channelId}-${Date.now()}`,
        userId: "current-user",
        userName: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sending",
        replyTo: replyingTo
          ? {
              id: replyingTo.id,
              userName: replyingTo.userName,
              content: replyingTo.content,
            }
          : undefined,
      };

      // Add message to local state
      setMessages((prev) => [...prev, newMessage]);

      // Call parent handler if provided
      if (onNewMessage) {
        onNewMessage(newMessage);
      }

      setMessage("");
      setReplyingTo(null);

      // Focus back to input
      if (inputRef.current) {
        inputRef.current.focus();
      }

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 500);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg
          )
        );
      }, 2000);

      // Play notification sound
      try {
        playNotificationSound();
      } catch (error) {
        console.log(error, "Could not play notification sound");
      }
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

  const getMessageStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return (
          <Clock className="w-3 h-3 text-muted-foreground animate-pulse" />
        );
      case "sent":
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isCurrentUser = msg.userId === "current-user";
    const isSystem = msg.type === "system";
    const prevMsg = index > 0 ? messages[index - 1] : null;
    const isGrouped =
      prevMsg &&
      prevMsg.userId === msg.userId &&
      new Date(msg.timestamp).getTime() -
        new Date(prevMsg.timestamp).getTime() <
        5 * 60 * 1000;

    if (isSystem) {
      return (
        <div key={msg.id} className="flex justify-center my-4">
          <div className="bg-muted/50 text-muted-foreground text-xs px-3 py-1 rounded-full">
            {msg.content}
          </div>
        </div>
      );
    }

    return (
      <div
        key={msg.id}
        className={`group flex gap-3 px-4 py-2 hover:bg-muted/30 transition-colors ${
          isGrouped ? "mt-1" : "mt-4"
        }`}
      >
        <div className="w-10">
          {!isGrouped && (
            <Avatar className="w-8 h-8">
              <AvatarImage src={msg.userAvatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {msg.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {!isGrouped && (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{msg.userName}</span>
              <span className="text-xs text-muted-foreground">
                {msg.timestamp}
              </span>
              {msg.isEdited && (
                <Badge variant="outline" className="text-xs">
                  edited
                </Badge>
              )}
            </div>
          )}

          {msg.replyTo && (
            <div className="mb-2 p-2 border-l-2 border-primary/50 bg-muted/20 rounded text-sm">
              <div className="font-medium text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Reply className="w-3 h-3" />
                Replying to {msg.replyTo.userName}
              </div>
              <div className="text-muted-foreground truncate">
                {msg.replyTo.content}
              </div>
            </div>
          )}

          <div className="text-sm leading-relaxed mb-2 break-words">
            {msg.content}
          </div>

          {msg.attachments && msg.attachments.length > 0 && (
            <div className="space-y-2 mb-2">
              {msg.attachments.map((attachment) => (
                <Card key={attachment.id} className="p-3 w-fit max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded">
                      <File className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {attachment.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {attachment.size}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {msg.reactions && msg.reactions.length > 0 && (
            <div className="flex gap-1 mb-2 flex-wrap">
              {msg.reactions.map((reaction) => (
                <Button
                  key={reaction.emoji}
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs hover:bg-primary/10"
                  onClick={() => addReaction(msg.id, reaction.emoji)}
                >
                  {reaction.emoji} {reaction.count}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-3 h-3" />
              </Button>
            </div>
          )}

          {isCurrentUser && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getMessageStatusIcon(msg.status)}
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
              <DropdownMenuItem onClick={() => setReplyingTo(msg)}>
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
              {isCurrentUser && (
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
  };

  const commonEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡", "🎉", "🚀"];

  return (
    <div className="flex flex-col h-full bg-background">
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
              <h2 className="font-semibold text-xl">{channelName}</h2>
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
                <h2 className="font-semibold text-xl">{channelName}</h2>
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
          <Button variant="ghost" size="sm">
            <Search className="w-4 h-4" />
          </Button>
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
                <Info className="w-4 h-4 mr-2" />
                Channel Info
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pin className="w-4 h-4 mr-2" />
                Pinned Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="w-4 h-4 mr-2" />
                Saved Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-0" ref={scrollAreaRef}>
        <div className="pb-4">
          {messages.map((msg, index) => renderMessage(msg, index))}
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 px-4 py-2 text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <span className="text-sm">Someone is typing...</span>
          </div>
        )}
      </ScrollArea>

      {/* Reply Banner */}
      {replyingTo && (
        <div className="px-4 py-2 border-t bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Reply className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Replying to</span>
              <span className="font-medium">{replyingTo.userName}</span>
              <span className="text-muted-foreground truncate max-w-xs">
                {replyingTo.content}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(null)}
              className="h-6 w-6 p-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 mb-2 pb-2 border-b">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Bold className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Italic className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Code className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Link className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <List className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Quote className="w-3 h-3" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <AtSign className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <Textarea
              ref={inputRef}
              value={message}
              onChange={(e) => handleMessageChange(e)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${
                channelType === "channel" ? "#" + channelName : channelName
              }...`}
              className="min-h-[40px] max-h-32 resize-none pr-20"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-4 h-4" />
                </Button>
                {showEmojiPicker && (
                  <Card className="absolute bottom-8 right-0 p-2 z-10">
                    <div className="flex gap-1">
                      {commonEmojis.map((emoji) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setMessage((prev) => prev + emoji);
                            setShowEmojiPicker(false);
                            if (inputRef.current) {
                              inputRef.current.focus();
                            }
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="h-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Press Enter to send, Shift + Enter for new line</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-5 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 128) + "px";
    }
  }
}
