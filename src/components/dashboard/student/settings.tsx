"use client";

import { useState } from "react";
import { User, Bell, Lock, Shield, Globe, Mail, Moon, Sun, Monitor, Loader2 } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground italic">Manage your account preferences and security settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-primary/5 rounded-xl">
          <TabsTrigger value="account" className="gap-2 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <form onSubmit={handleSave} className="space-y-6">
            <Card className="border-primary/5 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Full Name</label>
                    <Input defaultValue={user?.name || ""} placeholder="Your full name" className="bg-muted/30 border-none h-11 focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Email Address</label>
                    <Input defaultValue={user?.email || ""} placeholder="you@example.com" disabled className="bg-muted/50 border-none h-11 opacity-60 italic" />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Bio</label>
                    <textarea 
                        className="w-full h-32 px-3 py-2 rounded-xl border-none bg-muted/30 text-sm focus-visible:ring-1 focus-visible:ring-primary/20 transition-all outline-none" 
                        placeholder="Tell us about yourself..."
                    />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/5 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Localization
                    </CardTitle>
                    <CardDescription>Set your preferred language and timezone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Language</label>
                            <select className="w-full px-3 py-2 rounded-xl border-none bg-muted/30 text-sm outline-none transition-all h-11 focus:ring-1 focus:ring-primary/20 appearance-none">
                                <option>English (US)</option>
                                <option>Bengali</option>
                                <option>Spanish</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Timezone</label>
                            <select className="w-full px-3 py-2 rounded-xl border-none bg-muted/30 text-sm outline-none transition-all h-11 focus:ring-1 focus:ring-primary/20 appearance-none">
                                <option>(GMT+06:00) Dhaka</option>
                                <option>(GMT+00:00) London</option>
                                <option>(GMT-05:00) New York</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" className="rounded-full px-8 hover:bg-muted/50">Reset</Button>
              <Button type="submit" className="rounded-full px-8 shadow-lg shadow-primary/20" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 leading-none mb-1">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control how you receive updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/5 hover:bg-muted/5 transition-all">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold">Email Notifications</h4>
                    <p className="text-xs text-muted-foreground">Receive daily summaries and tutoring session alerts</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/5 hover:bg-muted/5 transition-all">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold">Session Reminders</h4>
                    <p className="text-xs text-muted-foreground">Get notified before your scheduled classes</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/5 hover:bg-muted/5 transition-all">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold">Message Alerts</h4>
                    <p className="text-xs text-muted-foreground">New messages from your tutors and support staff</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-primary/5 hover:bg-muted/5 transition-all opacity-50">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold">Activity Log Announcements</h4>
                    <p className="text-xs text-muted-foreground font-italic">Notifications about new course content (Disabled)</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Change Password
                </CardTitle>
                <CardDescription>Ensure your account is using a long, random password to stay secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Current Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-11" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">New Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-11" />
                  </div>
                </div>
                <Button className="rounded-full px-6 shadow-md border-primary/20 text-foreground bg-primary/5 hover:bg-primary/20 hover:text-foreground">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border-red-500/10 bg-red-500/5 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
                    <CardDescription className="text-red-600/70">Actions that cannot be undone</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-red-500/20 bg-background/50 gap-4">
                        <div>
                            <p className="font-bold text-sm">Delete Account</p>
                            <p className="text-xs text-muted-foreground">Permanently remove your account and all learning data</p>
                        </div>
                        <Button variant="destructive" size="sm" className="rounded-full px-6 hover:shadow-lg hover:shadow-red-500/20 transition-all">Delete Account</Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
