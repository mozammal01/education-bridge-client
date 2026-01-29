import { api } from "@/lib/api";
import { Category } from "@/types";

export const categoriesService = {
  getCategories: () => api.get<{ categories: Category[] }>("/categories"),

  getCategoryById: (id: string) => api.get<Category>(`/categories/${id}`),

  createCategory: (data: { name: string; slug: string }) =>
    api.post<Category>("/categories", data),

  updateCategory: (id: string, data: { name?: string; slug?: string }) =>
    api.put<Category>(`/categories/${id}`, data),

  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};
