"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, DollarSign, Loader2, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LANGUAGES, CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getImageUrl, cn } from "@/lib/utils";
import { tutorsService } from "@/services";

export function TutorProfileSettings() {
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    hourlyRate: 50,
    experience: 1,
    education: "",
    categoryId: "",
    subjects: [] as string[],
    languages: [] as string[],
  });
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await tutorsService.getMyProfile();
        if (response.data) {
          const profile = response.data;
          setFormData({
            headline: profile.headline || "",
            bio: profile.bio || "",
            hourlyRate: profile.hourlyRate || 50,
            experience: profile.experience || 1,
            education: profile.education || "",
            categoryId: profile.categoryId || "",
            subjects: profile.subjects || [],
            languages: profile.languages || [],
          });
        }
      } catch {
        // Failed to load profile
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await tutorsService.updateProfile({
        bio: formData.bio,
        headline: formData.headline,
        hourlyRate: formData.hourlyRate,
        experience: formData.experience,
        education: formData.education,
        categoryId: formData.categoryId || undefined,
        subjects: formData.subjects,
        languages: formData.languages,
      });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const addSubject = () => {
    if (newSubject.trim() && !formData.subjects.includes(newSubject.trim())) {
      setFormData({ ...formData, subjects: [...formData.subjects, newSubject.trim()] });
      setNewSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({ ...formData, subjects: formData.subjects.filter((s) => s !== subject) });
  };

  const toggleLanguage = (lang: string) => {
    if (formData.languages.includes(lang)) {
      setFormData({ ...formData, languages: formData.languages.filter((l) => l !== lang) });
    } else {
      setFormData({ ...formData, languages: [...formData.languages, lang] });
    }
  };

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
    } catch (error: any) {
      toast.error(error.message || "Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Profile</h1>
        <p className="text-muted-foreground">Update your public tutor profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted">
                {user?.image ? (
                  <Image
                    src={getImageUrl(user.image)}
                    alt={user.name || "Tutor"}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {user?.name?.split(" ").map((n) => n[0]).join("") || "T"}
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
                className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {uploadingPhoto ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
            </div>
            <div>
              <p className="font-medium mb-1">Upload a professional photo</p>
              <p className="text-sm text-muted-foreground">A clear headshot helps students connect with you</p>
              <p className="text-xs text-muted-foreground mt-1">Supported formats: JPG, PNG, GIF (max 5MB)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Headline</label>
              <Input
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g., Expert Math Tutor | 10+ Years Experience"
              />
              <p className="text-xs text-muted-foreground">A catchy headline that appears on your profile card</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">About Me</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-none"
                placeholder="Tell students about yourself, your teaching style, and experience..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className="pl-10"
                    min={5}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience</label>
                <Input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Education</label>
              <Input
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g., Ph.D. in Mathematics, MIT"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving}>
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

      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, categoryId: cat.id })}
                className={cn(
                  "p-3 rounded-lg border text-center text-sm transition-colors",
                  formData.categoryId === cat.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:border-muted-foreground/30"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subjects I Teach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="gap-1 pr-1">
                {subject}
                <button
                  onClick={() => removeSubject(subject)}
                  className="ml-1 p-0.5 hover:bg-muted-foreground/20 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Add a subject..."
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
            />
            <Button type="button" variant="outline" onClick={addSubject}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages I Speak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <Badge
                key={lang}
                variant={formData.languages.includes(lang) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleLanguage(lang)}
              >
                {lang}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
