"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, DollarSign, Loader2, Plus, X, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LANGUAGES, CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getImageUrl, cn } from "@/lib/utils";
import { tutorsService, TutorProfileData } from "@/services/tutors.service";

interface CompleteProfileProps {
  profile: TutorProfileData | null;
  onComplete: () => void;
}

export function CompleteProfile({ profile, onComplete }: CompleteProfileProps) {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    headline: profile?.headline || "",
    hourlyRate: profile?.hourlyRate || 25,
    experience: profile?.experience || 1,
    education: profile?.education || "",
    categoryId: profile?.categoryId || "",
    subjects: profile?.subjects || [] as string[],
    languages: profile?.languages || ["English"] as string[],
  });
  const [newSubject, setNewSubject] = useState("");

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
      await api.upload("/user/image", uploadData);
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

  const handleSave = async () => {
    if (!formData.bio || formData.bio.length < 20) {
      toast.error("Please write a bio (at least 20 characters)");
      return;
    }
    if (formData.hourlyRate < 5) {
      toast.error("Hourly rate must be at least $5");
      return;
    }

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
      toast.success("Profile completed! Students can now find you.");
      onComplete();
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { number: 1, title: "Photo & Bio" },
    { number: 2, title: "Expertise" },
    { number: 3, title: "Pricing" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20">
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-2xl">Complete Your Tutor Profile</CardTitle>
          <p className="text-muted-foreground mt-2">
            Set up your profile so students can find and book sessions with you
          </p>
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((s) => (
              <div
                key={s.number}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  step === s.number
                    ? "bg-primary text-primary-foreground"
                    : step > s.number
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.number ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                    {s.number}
                  </span>
                )}
                <span className="hidden sm:inline">{s.title}</span>
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
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
                  <p className="font-medium mb-1">Profile Photo</p>
                  <p className="text-sm text-muted-foreground">
                    A professional photo helps students trust you
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <Input
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g., Expert Math Tutor | 10+ Years Experience"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">About Me *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-none"
                  placeholder="Tell students about yourself, your teaching style, and what makes you a great tutor..."
                />
                <p className="text-xs text-muted-foreground">Minimum 20 characters</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Education</label>
                <Input
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g., B.Sc in Computer Science, University of Dhaka"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Category</label>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subjects I Teach</label>
                <div className="flex flex-wrap gap-2 mb-2">
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Languages I Speak</label>
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
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate ($) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className="pl-10 text-lg"
                    min={5}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum $5/hour</p>
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

              <div className="p-4 bg-emerald-50 rounded-xl">
                <h4 className="font-medium text-emerald-800 mb-2">Ready to go!</h4>
                <p className="text-sm text-emerald-700">
                  Once you complete your profile, students will be able to find you in the tutors list and book sessions with you.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </Button>

            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
