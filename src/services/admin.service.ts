import { api } from "@/lib/api";
import { User } from "@/types";

interface UpdateUser {
  status?: "ACTIVE" | "BANNED";
  role?: "STUDENT" | "TUTOR" | "ADMIN";
}

export const adminService = {
  getUsers: () => api.get<{ users: User[] }>("/admin/users"),

  updateUser: (id: string, data: UpdateUser) =>
    api.patch<User>(`/admin/users/${id}`, data),
};
