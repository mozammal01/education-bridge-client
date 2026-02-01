import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Mathematics", slug: "mathematics", description: "Algebra, Calculus, Statistics, and more", icon: "Calculator", tutorCount: 0 },
  { id: "2", name: "Science", slug: "science", description: "Physics, Chemistry, Biology", icon: "Atom", tutorCount: 0 },
  { id: "3", name: "Languages", slug: "languages", description: "English, Bengali, Arabic, and more", icon: "Languages", tutorCount: 0 },
  { id: "4", name: "Programming", slug: "programming", description: "Web Development, Mobile Apps, Data Science", icon: "Code", tutorCount: 0 },
  { id: "5", name: "Music", slug: "music", description: "Guitar, Piano, Vocals, Music Theory", icon: "Music", tutorCount: 0 },
  { id: "6", name: "Business", slug: "business", description: "Marketing, Finance, Entrepreneurship", icon: "Briefcase", tutorCount: 0 },
  { id: "7", name: "Arts & Design", slug: "arts-design", description: "Drawing, Digital Art, UI/UX Design", icon: "Palette", tutorCount: 0 },
  { id: "8", name: "Test Prep", slug: "test-prep", description: "SAT, GRE, IELTS, TOEFL", icon: "GraduationCap", tutorCount: 0 },
];

export const TESTIMONIALS = [
  { id: "1", name: "Rahim Uddin", role: "Engineering Student, BUET", image: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=400&h=400&fit=crop&crop=face", content: "SkillBridge helped me excel in my engineering admission. The math and physics sessions were game-changers. I got admitted to BUET!", rating: 5 },
  { id: "2", name: "Fatima Khatun", role: "Software Developer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face", content: "I learned full-stack development on SkillBridge. Within 4 months, I landed my first job as a junior developer. Best investment I've made!", rating: 5 },
  { id: "3", name: "Kamal Hossain", role: "Studying Abroad, UK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", content: "The IELTS preparation helped me achieve 7.5 in just 2 months. The tips for speaking and writing were incredible. Now I'm studying in the UK!", rating: 5 },
];

export const LANGUAGES = ["English", "Bengali", "Hindi", "Arabic", "Spanish", "French", "German", "Chinese", "Japanese", "Korean"];

export const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 24 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $75", min: 50, max: 75 },
  { label: "$75 - $100", min: 75, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];

export const RATING_OPTIONS = [
  { label: "4.5 & above", value: 4.5 },
  { label: "4.0 & above", value: 4.0 },
  { label: "3.5 & above", value: 3.5 },
  { label: "3.0 & above", value: 3.0 },
];
