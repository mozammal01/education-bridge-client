"use client";

import { useState } from "react";
import { 
  Settings, 
  Globe, 
  Shield, 
  Mail, 
  Bell, 
  Database, 
  Eye, 
  EyeOff,
  Save,
  RotateCcw,
  Smartphone,
  Server,
  Key
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { SiteLoader } from "@/components/shared/site-loader";

export function SettingsManagement() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings updated successfully");
    }, 2000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "seo", label: "SEO & Social", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "email", label: "Email SMTP", icon: Mail },
    { id: "system", label: "System", icon: Server },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {saving && <SiteLoader text="Updating System Settings..." />}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure your platform parameters and system preferences.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <Card className="border-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Identity</CardTitle>
                  <CardDescription>Main site information used across the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Name</label>
                      <Input defaultValue="EduBridge" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tagline</label>
                      <Input defaultValue="Connecting Knowledge with Experts" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input defaultValue="support@edubridge.com" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-dashed">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Maintenance Mode</p>
                      <p className="text-xs text-muted-foreground">Only admins can access the site when active.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Regional Settings</CardTitle>
                  <CardDescription>Configure currency and time management.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Currency</label>
                      <Input defaultValue="USD ($)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timezone</label>
                      <Input defaultValue="UTC+06:00 (Dhaka)" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="border-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Authentication Settings</CardTitle>
                  <CardDescription>Control how users login and secure their accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Require 2FA for all administrator accounts.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Session Timeout</p>
                      <p className="text-xs text-muted-foreground">Automatically logout users after period of inactivity.</p>
                    </div>
                    <Badge variant="outline">24 Hours</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">API Security</CardTitle>
                  <CardDescription>Manage your secret keys and API access tokens.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Master API Key</label>
                    <div className="flex gap-2">
                      <Input type="password" value="sk_test_51MzS2Z..." readOnly className="font-mono text-xs" />
                      <Button variant="outline" size="icon"><Key className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-[10px] text-amber-600 font-medium italic">* Do not share this key with anyone.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "system" && (
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Storage & Database</CardTitle>
                <CardDescription>System resource monitoring and database health.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Storage Usage (24.5 GB of 100 GB)</span>
                    <span className="font-bold">24%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: "24%" }} />
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <Database className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900">Auto Backups Active</p>
                    <p className="text-xs text-blue-800/80">Last full backup was successful: Today at 04:00 AM</p>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto text-blue-600 h-8">Run Now</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
