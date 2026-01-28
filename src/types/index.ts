// ============================================
// SkillBridge Type Definitions
// ============================================

export type UserRole = "student" | "tutor" | "admin";

export type BookingStatus = "confirmed" | "completed" | "cancelled";

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  isBanned?: boolean;
}

export interface Student extends User {
  role: "student";
  bookings?: Booking[];
  reviews?: Review[];
}

export interface Tutor extends User {
  role: "tutor";
  profile?: TutorProfile;
}

// Tutor Profile
export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  headline: string;
  hourlyRate: number;
  subjects: string[];
  categories: Category[];
  experience: number; // years
  education: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalSessions: number;
  availability: AvailabilitySlot[];
  languages: string[];
  location?: string;
  videoIntroUrl?: string;
  isVerified: boolean;
  createdAt: Date;
}

// Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  tutorCount?: number;
}

// Availability
export interface AvailabilitySlot {
  id: string;
  dayOfWeek: number; // 0-6, Sunday = 0
  startTime: string; // HH:mm format
  endTime: string;
  isAvailable: boolean;
}

// Booking
export interface Booking {
  id: string;
  studentId: string;
  student?: User;
  tutorId: string;
  tutor?: User & { profile?: TutorProfile };
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: BookingStatus;
  price: number;
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
}

// Review
export interface Review {
  id: string;
  studentId: string;
  student?: User;
  tutorId: string;
  tutor?: User;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Search & Filter
export interface TutorFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: "rating" | "price_low" | "price_high" | "reviews";
  availability?: string;
}

// Stats
export interface DashboardStats {
  totalBookings: number;
  completedSessions: number;
  upcomingSessions: number;
  totalEarnings?: number;
  totalSpent?: number;
  averageRating?: number;
}

// Admin Stats
export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  bookingsThisMonth: number;
}
