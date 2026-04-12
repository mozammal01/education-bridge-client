"use client";

import { useState } from "react";
import { User, Bell, Lock, Shield, Globe, Mail, Moon, Sun, Monitor, Loader2, Key, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Account <span className="text-primary italic">Settings</span></h1>
        <p className="text-muted-foreground font-medium italic">Synchronize your workspace preferences and security</p>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 border border-primary/5 rounded-[1.5rem] w-fit">
          <TabsTrigger value="account" className="gap-2 px-6 py-2.5 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all font-bold">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-6 py-2.5 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all font-bold">
            <Bell className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 px-6 py-2.5 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all font-bold">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <form onSubmit={handleSave} className="space-y-8">
            <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] overflow-hidden bg-card">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  Core Identity
                </CardTitle>
                <CardDescription className="italic font-medium">Update how your name and details appear on the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                    <Input defaultValue={user?.name || ""} className="bg-muted/40 border-none h-14 rounded-2xl px-6 font-bold focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Email (Read Only)</label>
                    <Input defaultValue={user?.email || ""} disabled className="bg-muted/20 border-none h-14 rounded-2xl px-6 font-medium italic cursor-not-allowed opacity-70" />
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Professional Bio</label>
                    <textarea 
                        className="w-full h-32 px-6 py-4 rounded-[1.5rem] border-none bg-muted/40 text-sm font-medium focus-visible:ring-1 focus-visible:ring-primary/20 transition-all outline-none resize-none" 
                        placeholder="Tell us about yourself and your background..."
                    />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Globe className="h-5 w-5 text-primary" />
                        </div>
                        Localization
                    </CardTitle>
                    <CardDescription className="italic font-medium">Adjust language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Platform Language</label>
                            <select className="w-full px-6 rounded-2xl border-none bg-muted/40 text-sm font-bold outline-none transition-all h-14 focus:ring-1 focus:ring-primary/20 appearance-none">
                                <option>English (US)</option>
                                <option>Bengali (Official)</option>
                                <option>Spanish (ES)</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Working Timezone</label>
                            <select className="w-full px-6 rounded-2xl border-none bg-muted/40 text-sm font-bold outline-none transition-all h-14 focus:ring-1 focus:ring-primary/20 appearance-none">
                                <option>(GMT+06:00) Dhaka</option>
                                <option>(GMT+00:00) London (UTC)</option>
                                <option>(GMT-05:00) New York (EST)</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" className="rounded-full px-10 h-12 font-bold italic opacity-60">Reset Fields</Button>
              <Button type="submit" className="rounded-full px-12 h-12 shadow-xl shadow-primary/20 font-black italic" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Workspace
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-[3rem] overflow-hidden">
            <CardHeader className="p-10 pb-6">
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <Bell className="h-6 w-6 text-primary" />
                </div>
                Alert Preferences
              </CardTitle>
              <CardDescription className="italic font-medium">Control the frequency and type of platform communications</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-6">
              <div className="space-y-4">
                {[
                  { title: "Email Notifications", desc: "Daily summaries and platform activity alerts", checked: true },
                  { title: "Session Reminders", desc: "Critical alerts before scheduled tutoring hours", checked: true },
                  { title: "Chat Inbounds", desc: "Instant notifications for new student or support messages", checked: true },
                  { title: "Marketing Insights", desc: "Non-critical updates about new features and offers", checked: false },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] border border-primary/5 hover:bg-muted/50 transition-all group">
                        <div className="space-y-1">
                            <h4 className="text-base font-black group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-xs text-muted-foreground font-medium italic opacity-80">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-primary" />
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-8">
            <Card className="border-none shadow-xl shadow-primary/5 rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 pb-6">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  Credential Management
                </CardTitle>
                <CardDescription className="italic font-medium">Secure your vault with a multi-layered password system</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Existing Password</label>
                  <Input type="password" placeholder="••••••••" className="h-14 px-6 bg-muted/40 border-none rounded-2xl font-medium" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">New Secure Password</label>
                    <Input type="password" placeholder="••••••••" className="h-14 px-6 bg-muted/40 border-none rounded-2xl font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Confirm Signature</label>
                    <Input type="password" placeholder="••••••••" className="h-14 px-6 bg-muted/40 border-none rounded-2xl font-medium" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                   <CheckCircle2 className="w-4 h-4" />
                   <p className="text-xs font-bold uppercase tracking-tight">Security score: Optimal</p>
                </div>
                <Button className="rounded-full px-12 h-12 shadow-md bg-primary/10 text-primary hover:bg-primary hover:text-white font-black italic transition-all border-none">Update Credentials</Button>
              </CardContent>
            </Card>

            <Card className="border-none bg-rose-500/5 rounded-[3rem] overflow-hidden">
                <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-xl font-black text-rose-600">Danger Zone</CardTitle>
                    <CardDescription className="text-rose-600/70 italic">Critical account actions that cannot be reversed</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-[2rem] border border-rose-500/20 bg-background/80 shadow-inner gap-6">
                        <div className="text-center sm:text-left">
                            <p className="font-black text-base text-foreground">Purge Account</p>
                            <p className="text-xs text-muted-foreground font-medium italic">Permanently delete all learning data and credentials</p>
                        </div>
                        <Button variant="destructive" size="lg" className="rounded-full px-10 h-12 shadow-lg shadow-rose-500/20 font-black italic transition-all">Execute Purge</Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
