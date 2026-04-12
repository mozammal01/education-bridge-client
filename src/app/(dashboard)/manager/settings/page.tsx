"use client";

import { useState } from "react";
import { User, Bell, Shield, Mail, Phone, MapPin, Loader2, Save, Lock, Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Badge } from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function ManagerSettingsPage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Manager profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Manager <span className="text-primary italic">Command Settings</span>
        </h1>
        <p className="text-muted-foreground font-medium italic">Configure your administrative profile and security protocols</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-primary/5 rounded-2xl">
          <TabsTrigger value="profile" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <User className="h-4 w-4" />
            Admin Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <Bell className="h-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
            <Lock className="h-4 h-4" />
            Access Node
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form onSubmit={handleSave} className="space-y-6">
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
               <div className="h-32 bg-linear-to-r from-violet-600 via-primary to-emerald-500 opacity-90" />
               <div className="px-8 -mt-12 relative z-10 flex items-end gap-6 mb-6">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-4xl font-black text-primary border-4 border-white">
                      {user?.name?.[0] || 'M'}
                  </div>
                  <div className="pb-4">
                      <h3 className="text-2xl font-black text-foreground">{user?.name}</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic">{user?.role} Access</p>
                  </div>
               </div>
              <CardHeader className="pt-0 px-8">
                <CardTitle className="text-xl font-black">Personal Dossier</CardTitle>
                <CardDescription className="italic font-medium">Your secondary information is strictly for platform tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Identity</label>
                    <Input defaultValue={user?.name || ""} className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Administrative Email</label>
                    <Input defaultValue={user?.email} className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Direct Line</label>
                    <Input defaultValue="+880 1700-000000" className="bg-muted/30 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Operational Base</label>
                    <Input defaultValue="Dhaka HQ" className="bg-muted/30 border-none h-12 rounded-xl" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                    <Button type="submit" className="rounded-full px-10 h-12 shadow-xl shadow-primary/20 font-black gap-2" disabled={saving}>
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Manifest
                    </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
           <Card className="border-none shadow-2xl rounded-[2.5rem]">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Bell className="h-6 w-6 text-primary" />
                    Priority Alerts
                </CardTitle>
                <CardDescription>Configure real-time notifications for system events</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-4">
                 {[
                   { label: "New Violation Flag", sub: "Immediate alert when content is flagged", checked: true },
                   { label: "System Growth Milestones", sub: "Weekly updates on user acquisition", checked: true },
                   { label: "High Latency Warning", sub: "Alert when API performance drops", checked: false },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-[1.5rem] border border-primary/5 bg-muted/5 hover:bg-primary/5 transition-all">
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

        <TabsContent value="security">
           <Card className="border-none shadow-2xl rounded-[2.5rem]">
              <CardHeader className="px-8 pt-8">
                 <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Operational Security
                 </CardTitle>
                 <CardDescription>Manage your access credentials and authorization levels</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                 <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="font-black text-rose-600">Primary Node Access</p>
                        <p className="text-xs text-rose-500 font-medium italic">Highest level of community moderation authority</p>
                    </div>
                    <Badge className="bg-rose-600 text-white border-none px-4 rounded-full">Active</Badge>
                 </div>
                 <Button variant="outline" className="rounded-full border-primary/20 text-primary font-bold hover:bg-primary/5 h-11 px-8">Request Credential Reset</Button>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
