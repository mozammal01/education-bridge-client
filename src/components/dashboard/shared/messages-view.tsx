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
    <div className="h-[calc(100vh-180px)] min-h-[600px] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      {/* Sidebar - Contacts */}
      <Card className="w-full md:w-80 flex flex-col shrink-0 overflow-hidden border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-card">
        <div className="p-6 border-b border-primary/5">
          <h2 className="text-xl font-black mb-4">Messages</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="Search people..." className="pl-10 h-11 border-none bg-muted/50 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/20" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {DEMO_CONVERSATIONS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveTab(chat.id)}
              className={cn(
                "w-full p-4 flex gap-3 text-left hover:bg-muted/50 transition-all rounded-[1.5rem]",
                activeTab === chat.id && "bg-primary/10 text-primary shadow-sm"
              )}
            >
              <div className="relative shrink-0">
                <div className={cn(
                  "w-12 h-12 rounded-2xl border-2 border-white flex items-center justify-center font-black text-lg",
                  activeTab === chat.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {chat.name[0]}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-background rounded-full shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm truncate">{chat.name}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate font-medium opacity-80">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-2xl shadow-primary/5 rounded-[3rem] bg-card">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-white dark:bg-slate-950/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-xl text-primary">
                  {activeChat.name[0]}
                </div>
                <div>
                  <h3 className="font-black text-base leading-none">{activeChat.name}</h3>
                  <p className="text-xs text-emerald-500 font-bold mt-1 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {activeChat.online ? "Connected" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-all">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-all">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-all">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-muted/10 relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
              {DEMO_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%] md:max-w-[60%] relative z-10",
                    msg.senderId === "me" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-5 py-3 rounded-3xl text-sm font-medium shadow-sm leading-relaxed",
                      msg.senderId === "me"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/10"
                        : "bg-white dark:bg-slate-900 border border-primary/5 text-foreground rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-2 px-1 font-bold italic opacity-60 uppercase">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-primary/5 bg-white dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask a question or reply..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                  className="flex-1 h-12 bg-muted/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/20 font-medium px-4"
                />
                <Button size="icon" className="shrink-0 rounded-2xl h-12 w-12 shadow-lg shadow-primary/20 hover:scale-105 transition-all" onClick={() => setMessage("")}>
                  <Send className="h-5 w-5 translate-x-0.5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-muted-foreground p-8 space-y-4">
            <div className="p-6 bg-primary/5 rounded-[2rem] animate-pulse">
                <MessageSquare className="h-16 w-16 opacity-20" />
            </div>
            <div className="text-center">
                <p className="font-black text-lg">Secure Messaging</p>
                <p className="text-xs italic opacity-60">End-to-end encrypted learning support</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
