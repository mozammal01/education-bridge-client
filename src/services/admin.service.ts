import { api } from "@/lib/api";
import { User } from "@/types";

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
};
