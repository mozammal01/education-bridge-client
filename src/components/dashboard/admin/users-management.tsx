"use client";

import { useState, useEffect } from "react";
import { Search, MoreVertical, Shield, Ban, Mail, UserCheck, UserX, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { adminService } from "@/services";
import { toast } from "sonner";
import type { User } from "@/types";

type TabType = "all" | "STUDENT" | "TUTOR";

const tabs: { label: string; value: TabType }[] = [
  { label: "All Users", value: "all" },
  { label: "Students", value: "STUDENT" },
  { label: "Tutors", value: "TUTOR" },
];

const roleColors: Record<string, string> = {
  STUDENT: "bg-blue-100 text-blue-700",
  TUTOR: "bg-emerald-100 text-emerald-700",
  ADMIN: "bg-violet-100 text-violet-700",
};

export function UsersManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers();
      const data = res.data;
      if (data) {
        setUsers(Array.isArray(data) ? data : data.users || []);
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBan = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
      await adminService.updateUser(userId, { status: newStatus });
      toast.success(`User ${newStatus === "BANNED" ? "banned" : "unbanned"}`);
      fetchUsers();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const filtered = users.filter((user) => {
    const matchesTab = activeTab === "all" || user.role === activeTab;
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">View and manage all platform users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Joined</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getImageUrl(user.image)} />
                          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={cn("font-normal", roleColors[user.role])}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {user.status === "ACTIVE" ? (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          <UserX className="w-3 h-3 mr-1" />
                          Banned
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleToggleBan(user.id, user.status || "ACTIVE")}
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            {user.status === "ACTIVE" ? "Ban User" : "Unban User"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
