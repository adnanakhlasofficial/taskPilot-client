"use client";

import { useState } from "react";
import ChatSidebarFull from "@/components/chat-sidebar-full";
import ChatWindowFull from "@/components/chat-window-full";
import RoleGuard from "@/components/role-guard";

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("general");

  const getChannelInfo = (channelId: string) => {
    const channelMap: Record<
      string,
      {
        name: string;
        type: "channel" | "dm" | "group";
        isPrivate?: boolean;
        members?: number;
      }
    > = {
      general: { name: "general", type: "channel", members: 12 },
      "prj-001": {
        name: "prj-001-alpha",
        type: "channel",
        isPrivate: true,
        members: 5,
      },
      "prj-002": {
        name: "prj-002-beta",
        type: "channel",
        isPrivate: true,
        members: 8,
      },
      "design-team": { name: "design-team", type: "channel", members: 6 },
      "dev-team": { name: "dev-team", type: "channel", members: 10 },
      announcements: { name: "announcements", type: "channel", members: 25 },
      "group-leads": { name: "Team Leads", type: "group", members: 3 },
      "group-frontend": { name: "Frontend Guild", type: "group", members: 8 },
      "dm-john": { name: "John Doe", type: "dm" },
      "dm-jane": { name: "Jane Smith", type: "dm" },
      "dm-bob": { name: "Bob Wilson", type: "dm" },
      "dm-alice": { name: "Alice Cooper", type: "dm" },
      "dm-mike": { name: "Mike Johnson", type: "dm" },
    };
    return channelMap[channelId] || { name: "Unknown", type: "channel" };
  };

  const channelInfo = getChannelInfo(activeChannel);

  return (
    <RoleGuard allowedRoles={["admin", "leader", "member"]}>
      <div className="h-[calc(100vh-8rem)] flex bg-background border rounded-lg overflow-hidden shadow-sm">
        <ChatSidebarFull
          activeChannel={activeChannel}
          onChannelSelect={setActiveChannel}
        />
        <div className="flex-1">
          <ChatWindowFull
            channelId={activeChannel}
            channelName={channelInfo.name}
            channelType={channelInfo.type}
            isPrivate={channelInfo.isPrivate}
            members={channelInfo.members}
          />
        </div>
      </div>
    </RoleGuard>
  );
}
