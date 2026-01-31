import { api } from "@/lib/api";
import { Category } from "@/types";

export const categoriesService = {
  getCategories: () => api.get<{ categories: Category[] }>("/api/categories"),

  getCategoryById: (id: string) => api.get<Category>(`/api/categories/${id}`),

  createCategory: (data: { name: string; slug: string }) =>
    api.post<Category>("/api/categories", data),

  updateCategory: (id: string, data: { name?: string; slug?: string }) =>
    api.put<Category>(`/api/categories/${id}`, data),

  deleteCategory: (id: string) => api.delete(`/api/categories/${id}`),
};
