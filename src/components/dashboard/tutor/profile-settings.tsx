"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, DollarSign, Loader2, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_TUTORS, LANGUAGES } from "@/lib/constants";

const currentTutor = MOCK_TUTORS[0];

export function TutorProfileSettings() {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    headline: currentTutor.headline,
    bio: currentTutor.bio,
    hourlyRate: currentTutor.hourlyRate,
    experience: currentTutor.experience,
    education: currentTutor.education,
    subjects: currentTutor.subjects,
    languages: currentTutor.languages,
  });
  const [newSubject, setNewSubject] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
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

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Profile</h1>
        <p className="text-muted-foreground">Update your public tutor profile</p>
      </div>

      {/* photo */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted">
                {currentTutor.user.avatar ? (
                  <Image
                    src={currentTutor.user.avatar}
                    alt={currentTutor.user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                    {currentTutor.user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium mb-1">Upload a professional photo</p>
              <p className="text-sm text-muted-foreground">
                A clear headshot helps students connect with you
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* basic info */}
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
              <p className="text-xs text-muted-foreground">
                A catchy headline that appears on your profile card
              </p>
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

      {/* subjects */}
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

      {/* languages */}
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
