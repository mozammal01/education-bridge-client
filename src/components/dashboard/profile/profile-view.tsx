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
  CheckCircle2,
  Lock,
  Trash2,
  Calendar,
  Briefcase,
  DollarSign,
  Plus,
  X,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { tutorsService } from "@/services";
import { toast } from "sonner";
import { getImageUrl, cn } from "@/lib/utils";
import { CATEGORIES, LANGUAGES } from "@/lib/constants";

type TabType = "personal" | "tutor" | "security" | "notifications";

export function ProfileView() {
  const { user, refreshUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Forms
  const [personalForm, setPersonalForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [tutorForm, setTutorForm] = useState({
    headline: "",
    bio: "",
    hourlyRate: 20,
    experience: 1,
    education: "",
    categoryId: "",
    subjects: [] as string[],
    languages: [] as string[],
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    if (user) {
      setPersonalForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      if (user.role === "TUTOR") {
        const fetchTutorProfile = async () => {
          try {
            const res = await tutorsService.getMyProfile();
            if (res.data) {
              const p = res.data;
              setTutorForm({
                headline: p.headline || "",
                bio: p.bio || "",
                hourlyRate: p.hourlyRate || 20,
                experience: p.experience || 1,
                education: p.education || "",
                categoryId: p.categoryId || "",
                subjects: p.subjects || [],
                languages: p.languages || [],
              });
            }
          } catch (error) {
            console.error("Failed to fetch tutor info", error);
          } finally {
            setLoading(false);
          }
        };
        fetchTutorProfile();
      } else {
        setLoading(false);
      }
    }
  }, [user]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      await api.upload("/api/user/image", formData);
      toast.success("Photo updated successfully");
      refreshUser();
    } catch {
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch("/api/user/profile", {
        name: personalForm.name,
        phone: personalForm.phone,
      });
      toast.success("Profile updated");
      refreshUser();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await tutorsService.updateProfile(tutorForm);
      toast.success("Professional info updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setSaving(true);
    try {
      await api.patch("/api/user/change-password", {
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
      });
      toast.success("Password updated");
      setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Synchronizing profile data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Premium Header Banner */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-violet-600 to-indigo-700 opacity-90 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row items-end gap-6 text-white min-h-full justify-end">
           <div className="relative shrink-0 mb-2 md:mb-0">
              <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white/20 overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl relative">
                  {user?.image ? (
                    <Image src={getImageUrl(user.image)} alt="" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-black">
                      {user?.name?.[0]}
                    </div>
                  )}
                  {uploadingPhoto && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2.5 bg-white text-primary rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
           </div>

           <div className="flex-1 space-y-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user?.name}</h1>
                <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {user?.role}
                </Badge>
              </div>
              <p className="text-white/70 font-medium italic">{user?.email}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-4">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] overflow-hidden bg-card">
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                {[
                  { id: "personal", label: "Personal Info", icon: User },
                  ...(user?.role === "TUTOR" ? [{ id: "tutor", label: "Teaching Info", icon: Briefcase }] : []),
                  { id: "security", label: "Security", icon: Shield },
                  { id: "notifications", label: "Notifications", icon: Bell },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 rounded-3xl text-sm font-bold transition-all duration-300",
                      activeTab === item.id 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-rose-500/5 rounded-[2rem] bg-rose-50/30 dark:bg-rose-950/20 overflow-hidden">
             <CardContent className="p-6">
                <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-2">Danger Zone</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-rose-600 hover:text-rose-700 hover:bg-rose-100/50 rounded-2xl p-0 h-10 font-bold">
                      <Trash2 className="w-4 h-4 ml-4" /> Deactivate Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Critical Action: Deactivation</DialogTitle>
                      <DialogDescription>This will permanently archive your account and data. Are you sure?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={logout}>Confirm Deactivation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
             </CardContent>
          </Card>
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-3">
          {activeTab === "personal" && (
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950">
               <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black">Personal <span className="text-primary italic">Information</span></CardTitle>
                  <CardDescription>Verify and update your basic account details.</CardDescription>
               </CardHeader>
               <CardContent className="p-10 pt-0">
                  <form onSubmit={handleSavePersonal} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input 
                            value={personalForm.name} 
                            onChange={e => setPersonalForm({...personalForm, name: e.target.value})}
                            className="h-14 pl-12 rounded-2xl border-none bg-muted/40 focus:bg-muted/60 transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input 
                            value={personalForm.phone} 
                            onChange={e => setPersonalForm({...personalForm, phone: e.target.value})}
                            className="h-14 pl-12 rounded-2xl border-none bg-muted/40 focus:bg-muted/60 transition-all font-medium"
                            placeholder="+880 1XXX XXXXXX"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address (Read Only)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                        <Input 
                          value={personalForm.email} 
                          disabled
                          className="h-14 pl-12 rounded-2xl border-none bg-muted/20 opacity-70 font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <Button disabled={saving} className="h-12 px-10 rounded-full shadow-lg shadow-primary/20 font-black italic">
                        {saving ? <Loader2 className="mr-2 animate-spin h-4 w-4" /> : null}
                        Update Profile
                      </Button>
                    </div>
                  </form>
               </CardContent>
            </Card>
          )}

          {activeTab === "tutor" && (
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950">
               <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black">Professional <span className="text-primary italic">Identity</span></CardTitle>
                  <CardDescription>Set your rates, bio, and subjects for the public listings.</CardDescription>
               </CardHeader>
               <CardContent className="p-10 pt-0">
                  <form onSubmit={handleSaveTutor} className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Headline</label>
                        <Input 
                          value={tutorForm.headline} 
                          onChange={e => setTutorForm({...tutorForm, headline: e.target.value})}
                          placeholder="e.g. Expert SAT Math Tutor | Ph.D Applicant"
                          className="h-14 px-6 rounded-2xl border-none bg-muted/40 font-medium"
                        />
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Hourly Rate ($)</label>
                           <div className="relative group">
                              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                              <Input 
                                type="number"
                                value={tutorForm.hourlyRate} 
                                onChange={e => setTutorForm({...tutorForm, hourlyRate: Number(e.target.value)})}
                                className="h-14 pl-12 rounded-2xl border-none bg-muted/40 font-black text-lg"
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Experience (Years)</label>
                           <Input 
                             type="number"
                             value={tutorForm.experience} 
                             onChange={e => setTutorForm({...tutorForm, experience: Number(e.target.value)})}
                             className="h-14 px-6 rounded-2xl border-none bg-muted/40 font-black text-lg"
                           />
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subjects I Teach</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                           {tutorForm.subjects.map(s => (
                             <Badge key={s} className="bg-primary/10 text-primary border-none p-3 rounded-2xl flex items-center gap-2 group/badge">
                               <span className="font-bold">{s}</span>
                               <X className="w-4 h-4 cursor-pointer hover:bg-rose-500 hover:text-white rounded-full transition-all" onClick={() => setTutorForm({...tutorForm, subjects: tutorForm.subjects.filter(sj => sj !== s)})} />
                             </Badge>
                           ))}
                        </div>
                        <div className="flex gap-3">
                           <Input 
                             value={newSubject}
                             onChange={e => setNewSubject(e.target.value)}
                             onKeyDown={e => e.key === "Enter" && (e.preventDefault(), setNewSubject(""), setTutorForm({...tutorForm, subjects: [...tutorForm.subjects, newSubject]}))}
                             placeholder="Add a subject..."
                             className="h-12 rounded-xl border-none bg-muted/20"
                           />
                           <Button 
                             type="button" 
                             onClick={() => {
                               if(newSubject) {
                                  setTutorForm({...tutorForm, subjects: [...tutorForm.subjects, newSubject]}); 
                                  setNewSubject("");
                               }
                             }}
                            className="rounded-xl h-12 w-12 p-0"
                           >
                              <Plus className="w-5 h-5" />
                           </Button>
                        </div>
                     </div>

                     <div className="pt-6 flex justify-end">
                       <Button disabled={saving} className="h-12 px-10 rounded-full shadow-lg shadow-primary/20 font-black italic">
                         {saving ? <Loader2 className="mr-2 animate-spin h-4 w-4" /> : null}
                         Save Teacher Profile
                       </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black">Account <span className="text-primary italic">Security</span></CardTitle>
                  <CardDescription>Keep your credentials safe and up to date.</CardDescription>
               </CardHeader>
               <CardContent className="p-10 pt-0">
                  <form onSubmit={handleSaveSecurity} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Current Password</label>
                        <Input 
                          type="password"
                          value={securityForm.currentPassword} 
                          onChange={e => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                          className="h-14 px-6 rounded-2xl border-none bg-muted/40 font-medium"
                          placeholder="••••••••"
                        />
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">New Password</label>
                            <Input 
                              type="password"
                              value={securityForm.newPassword} 
                              onChange={e => setSecurityForm({...securityForm, newPassword: e.target.value})}
                              className="h-14 px-6 rounded-2xl border-none bg-muted/40 font-medium"
                              placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Confirm New Password</label>
                            <Input 
                              type="password"
                              value={securityForm.confirmPassword} 
                              onChange={e => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                              className="h-14 px-6 rounded-2xl border-none bg-muted/40 font-medium"
                              placeholder="••••••••"
                            />
                        </div>
                     </div>

                     <div className="pt-6 flex justify-end">
                       <Button disabled={saving} className="h-12 px-10 rounded-full shadow-lg shadow-primary/20 font-black italic">
                         {saving ? <Loader2 className="mr-2 animate-spin h-4 w-4" /> : null}
                         Secure Account
                       </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950 p-20 text-center">
               <Bell className="w-20 h-20 mx-auto text-primary opacity-20 mb-6" />
               <h3 className="text-2xl font-black mb-2">Alert Center coming soon</h3>
               <p className="text-muted-foreground italic font-medium">Fine-tune your notification preferences in the next platform update.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
