// User Types
export type UserRole = "student" | "tutor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

// Tutor Types
export interface TutorProfile {
  id: string;
  userId: string;
  user: User;
  bio: string;
  headline: string;
  hourlyRate: number;
  experience: number; // years
  education: string;
  subjects: string[];
  categories: Category[];
  languages: string[];
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalSessions: number;
  isVerified: boolean;
  availability: Availability[];
  reviews: Review[];
  createdAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  tutorCount: number;
}

// Availability Types
export interface Availability {
  id: string;
  tutorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Booking Types
export type BookingStatus = "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  studentId: string;
  student: User;
  tutorId: string;
  tutor: TutorProfile;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  student: User;
  tutorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Stats Types
export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalSpent?: number; // for students
  totalEarned?: number; // for tutors
  averageRating?: number; // for tutors
}

export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
  totalRevenue: number;
  newUsersThisMonth: number;
  bookingsThisMonth: number;
}

// Filter Types
export interface TutorFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  language?: string;
  sortBy?: "rating" | "price" | "experience" | "reviews";
  sortOrder?: "asc" | "desc";
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface TutorProfileForm {
  headline: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  education: string;
  subjects: string[];
  languages: string[];
}

export interface BookingForm {
  tutorId: string;
  subject: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface ReviewForm {
  bookingId: string;
  rating: number;
  comment: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "review" | "message" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
