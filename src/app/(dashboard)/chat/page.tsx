"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useGetChatRoomsQuery } from "@/store/api/chatApi";
import clsx from "clsx";

const socket = io("https://task-management-production-7b6f.up.railway.app", {
  withCredentials: true,
});

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; userName: string };
}

export default function ChatApp() {
  const { user, isLoading } = useAuth();
  const [localUser, setLocalUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState(localUser?.id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: roomData, isLoading: loadingRooms } = useGetChatRoomsQuery();

  useEffect(() => {
    socket.on("chat-history", (history: Message[]) => setMessages(history));
    socket.on("chat-message", (message: Message) =>
      setMessages((prev) => [...prev, message])
    );
    return () => {
      socket.off("chat-history");
      socket.off("chat-message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinRoom = () => {
    if (!roomId || !userId) {
      console.warn("Missing roomId or userId:", { roomId, userId });
      return;
    }
    socket.emit("join-room", { roomId, senderId: userId });
  };

  const sendMessage = () => {
    if (!input || !roomId || !userId) return;
    socket.emit("chat-message", { roomId, senderId: userId, content: input });
    setInput("");
  };

  if (isLoading || loadingRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border font-semibold text-lg">
        Realtime Chat
      </header>

      {/* Controls */}
      <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-center border-b border-border bg-muted">
        {/* Room Selector */}
        <select
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        >
          <option value="">Select a chat room</option>
          {loadingRooms ? (
            <option disabled>Loading rooms...</option>
          ) : (
            roomData?.data?.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))
          )}
        </select>

        {/* User ID */}
        <input
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        {/* Join Button */}
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender.id === userId;
          return (
            <div
              key={msg.id}
              className={clsx("flex", isMe ? "justify-end" : "justify-start")}
            >
              <div
                className={clsx(
                  "p-3 rounded-lg shadow-sm max-w-sm break-words",
                  isMe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {!isMe && (
                  <div className="font-semibold text-sm mb-1">
                    {msg.sender.userName}
                  </div>
                )}
                <div>{msg.content}</div>
                <div className="text-xs text-right mt-2 opacity-60">
                  {formatDistanceToNow(new Date(msg.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <footer className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 border px-3 py-2 rounded-md"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
