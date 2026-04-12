"use client";

import { useState } from "react";
import { Search, Send, User, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const DEMO_CONVERSATIONS = [
  {
    id: "1",
    name: "Dr. Ayesha Rahman",
    lastMessage: "Looking forward to our next session!",
    time: "2m ago",
    unread: 2,
    online: true,
    avatar: null
  },
  {
    id: "2",
    name: "Mohammad Karim",
    lastMessage: "I've uploaded the notes for you.",
    time: "1h ago",
    unread: 0,
    online: false,
    avatar: null
  },
  {
    id: "3",
    name: "Fatima Ahmed",
    lastMessage: "Can we reschedule to 4 PM?",
    time: "Yesterday",
    unread: 0,
    online: true,
    avatar: null
  }
];

const DEMO_MESSAGES = [
  { id: "1", senderId: "2", text: "Hello! How are you doing with the physics assignment?", time: "10:00 AM" },
  { id: "2", senderId: "me", text: "Hi Dr! I'm struggling a bit with the thermodynamics part.", time: "10:05 AM" },
  { id: "3", senderId: "2", text: "Don't worry, we'll go over it in detail today.", time: "10:06 AM" },
  { id: "4", senderId: "me", text: "That would be great. Thank you!", time: "10:07 AM" },
];

export function MessagesView() {
  const [activeTab, setActiveTab] = useState(DEMO_CONVERSATIONS[0].id);
  const [message, setMessage] = useState("");

  const activeChat = DEMO_CONVERSATIONS.find(c => c.id === activeTab);

  return (
    <div className="h-[calc(100vh-180px)] min-h-[600px] flex gap-6">
      {/* Sidebar */}
      <Card className="w-80 flex flex-col shrink-0 overflow-hidden border-primary/10">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {DEMO_CONVERSATIONS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveTab(chat.id)}
              className={cn(
                "w-full p-4 flex gap-3 text-left hover:bg-muted/50 transition-colors border-b last:border-0",
                activeTab === chat.id && "bg-primary/5 border-l-4 border-l-primary"
              )}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {chat.name[0]}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm truncate">{chat.name}</span>
                  <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-primary/10">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {activeChat.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-none">{activeChat.name}</h3>
                  <p className="text-[10px] text-emerald-500 font-medium mt-1">
                    {activeChat.online ? "Online" : "Away"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
              {DEMO_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[70%]",
                    msg.senderId === "me" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm",
                      msg.senderId === "me"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                  className="flex-1 h-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                />
                <Button size="icon" className="shrink-0 rounded-full" onClick={() => setMessage("")}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-muted-foreground p-8">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </Card>
    </div>
  );
}
