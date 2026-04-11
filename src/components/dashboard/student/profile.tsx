"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  Mail,
  Phone,
  User,
  Loader2,
  Shield,
  Bell,
  Globe,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function StudentProfile() {
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingPhoto(true);
    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      await api.upload("/api/user/image", uploadData);

      toast.success("Photo uploaded successfully");
      refreshUser();
    } catch {
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if anything actually changed
    const hasChanged = formData.name !== (user?.name || "") ||
      formData.phone !== (user?.phone || "");

    if (!hasChanged) {
      toast.info("Nothing was updated");
      return;
    }

    setSaving(true);
    try {
      await api.patch("/api/user/profile", {
        name: formData.name,
        phone: formData.phone,
      });
      toast.success("Profile updated successfully");
      refreshUser();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      toast.info("Changes discarded");
    }
  };

  const hasChanged = formData.name !== (user?.name || "") ||
    formData.phone !== (user?.phone || "");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile information and account preferences</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleDiscard}
            disabled={!hasChanged || saving}
          >
            Discard Changes
          </Button>
          <Button onClick={handleSave} disabled={saving || !hasChanged}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Profile
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-primary/5">
            <div className="h-24 bg-linear-to-r from-primary/20 to-primary/5" />
            <CardContent className="pt-0 -mt-12 text-center relative px-6 pb-8">
              <div className="relative inline-block group mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-muted shadow-lg">
                  {user?.image ? (
                    <Image
                      src={getImageUrl(user.image)}
                      alt={user.name || "User"}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                      {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {uploadingPhoto ? <Loader2 className="w-3 h-3 animate-spin" /> : <Camera className="w-3 h-3" />}
                </button>
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user?.role?.toLowerCase()} Account</p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-none px-3 py-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                </Badge>
              </div>

              <Separator className="my-6 opacity-50" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium ml-auto">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Dec 2023'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/5">
            <CardHeader className="pb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground opacity-70">
              Quick Navigation
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button className="flex items-center gap-3 px-6 py-3 bg-primary/5 text-primary border-l-2 border-primary font-medium transition-colors">
                  <User className="w-4 h-4" /> Personal Information
                </button>
                <button className="flex items-center gap-3 px-6 py-3 hover:bg-muted text-muted-foreground transition-colors text-left">
                  <Shield className="w-4 h-4" /> Account Security
                </button>
                <button className="flex items-center gap-3 px-6 py-3 hover:bg-muted text-muted-foreground transition-colors text-left">
                  <Bell className="w-4 h-4" /> Notifications
                </button>
                <button className="flex items-center gap-3 px-6 py-3 hover:bg-muted text-muted-foreground transition-colors text-left">
                  <Globe className="w-4 h-4" /> Language & Regions
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Main Form */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-primary/5 shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your photo and personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 h-11 border-primary/10 focus:border-primary/30"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 h-11 border-primary/10 focus:border-primary/30"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="pl-10 h-11 bg-muted/10 border-muted"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground italic">Email address is linked to your account and cannot be changed.</p>
                </div>

                <div className="pt-4 flex justify-end items-center gap-4">
                  <p className="text-xs text-muted-foreground hidden md:block">Last updated: Today at 10:24 AM</p>
                  <Button type="submit" disabled={saving} className="px-8">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-primary/5">
            <CardHeader className="pb-3 border-b bg-muted/10">
              <CardTitle className="text-base text-destructive flex items-center gap-2">
                <Shield className="w-4 h-4" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <Button variant="destructive" size="sm" className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border-destructive/20 transition-all">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper badge component as it might be missing
function Badge({ children, variant, className }: { children: React.ReactNode, variant?: any, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'} ${className}`}>
      {children}
    </span>
  );
}

// Helper calendar icon as it might be missing from search but used in plan
function Calendar({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
  );
}
