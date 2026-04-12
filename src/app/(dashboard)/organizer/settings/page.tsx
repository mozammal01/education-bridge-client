"use client";

import { useState } from "react";
import { User, Bell, Lock, Shield, Landmark, Mail, MapPin, Globe, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function OrganizerSettings() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Organization profile updated!");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">Organizer <span className="text-primary italic">Settings</span></h1>
        <p className="text-muted-foreground font-medium italic">Configure your institutional identity and administrative preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-primary/5 rounded-2xl">
          <TabsTrigger value="profile" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <Landmark className="h-4 w-4" />
            Institutional Profile
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <User className="h-4 w-4" />
            Admin Details
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form onSubmit={handleSave} className="space-y-6">
            <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl overflow-hidden">
               <div className="h-32 bg-linear-to-r from-violet-600 to-primary opacity-90" />
               <div className="px-8 -mt-12 relative z-10">
                  <div className="w-24 h-24 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-3xl font-black text-primary border-4 border-white mb-6">
                      {user?.name?.[0] || 'O'}
                  </div>
               </div>
              <CardHeader className="pt-0 px-8">
                <CardTitle className="text-2xl font-black">Global HQ Identity</CardTitle>
                <CardDescription className="italic font-medium">This information is visible to your staff and partners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Organization Name</label>
                    <Input defaultValue="EduBridge Global HQ" className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Official Website</label>
                    <Input defaultValue="https://edubridge.global" className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Contact Email</label>
                    <Input defaultValue={user?.email} className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Regional Branch</label>
                    <Input defaultValue="Dhaka, Bangladesh" className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                    <Button type="submit" className="rounded-full px-10 h-12 shadow-xl shadow-primary/20 font-black gap-2" disabled={saving}>
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Commit Changes
                    </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="admin">
           <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl">
              <CardHeader className="px-8 pt-8">
                 <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Administrative Security
                 </CardTitle>
                 <CardDescription>Manage your personal admin credentials and session security</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Admin Name</label>
                        <Input defaultValue={user?.name || ""} className="bg-muted/30 border-none h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Access Role</label>
                        <Input defaultValue="Primary Organizer" disabled className="bg-muted/50 border-none h-12 rounded-xl opacity-70 italic" />
                    </div>
                 </div>
                 <Button variant="outline" className="rounded-full border-primary/20 text-primary font-bold hover:bg-primary/5">Verify Identity for Password Change</Button>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="notifications">
           <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Bell className="h-6 w-6 text-primary" />
                    Global Alerts
                </CardTitle>
                <CardDescription>Configure how you receive activity logs and institutional reports</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-4">
                 {[
                   { label: "New Tutor Registration", sub: "Get notified when a tutor joins an institution", checked: true },
                   { label: "Revenue Milestones", sub: "Receive updates when branch revenue hits targets", checked: true },
                   { label: "System Maintenance", sub: "Critical platform technical updates", checked: false },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-3xl border border-primary/5 bg-muted/5 hover:bg-primary/5 transition-all">
                      <div>
                        <p className="font-black text-sm text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground font-medium italic">{opt.sub}</p>
                      </div>
                      <Switch defaultChecked={opt.checked} />
                   </div>
                 ))}
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
