export enum UserRole {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  image?: string;
  phone?: string;
  createdAt: string;
  status?: UserStatus;
}

export interface TutorProfile {
  id: string;
  userId: string;
  user: User;
  bio: string;
  headline: string;
  hourlyRate: number;
  experience: number;
  education: string;
  subjects: string[];
  categories: Category[];
  languages: string[];
  rating: number;
  averageRating?: number;
  totalReviews: number;
  totalStudents: number;
  totalSessions: number;
  isVerified: boolean;
  availability: Availability[];
  reviews: Review[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  tutorCount: number;
}

export interface Availability {
  id: string;
  tutorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

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
  duration: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
}

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

export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalSpent?: number;
  totalEarned?: number;
  averageRating?: number;
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

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "review" | "message" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
