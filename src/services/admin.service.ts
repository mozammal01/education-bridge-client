import { api } from "@/lib/api";
import { User, TutorProfile } from "@/types";

interface UpdateUser {
  status?: "ACTIVE" | "BANNED";
  role?: "STUDENT" | "TUTOR" | "ADMIN";
}

export const adminService = {
  getUsers: () => api.get<User[]>("/api/admin/users"),
  
  getStats: () => api.get<any>("/api/admin/stats"),
  
  getPayments: () => api.get<any[]>("/api/admin/payments"),

  updateUser: (id: string, data: UpdateUser) =>
    api.patch<User>(`/api/admin/users/${id}`, data),

  getTutors: () => api.get<TutorProfile[]>("/api/admin/tutors"),

  toggleVerification: (id: string, isVerified: boolean) =>
    api.patch<TutorProfile>(`/api/admin/tutors/${id}/verify`, { isVerified }),
};
