"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CategoryCard, SectionHeader, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared";
import { CATEGORIES } from "@/lib/constants";
import { categoriesService } from "@/services";
import { Category } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response.data) {
          const categoryData = Array.isArray(response.data)
            ? response.data
            : (response.data as { categories?: Category[] }).categories || [];
          setCategories(categoryData.length > 0 ? categoryData : CATEGORIES);
        } else {
          setCategories(CATEGORIES);
        }
      } catch {
        setCategories(CATEGORIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="All Categories"
            subtitle="Browse tutors by subject area and find the perfect match for your learning goals"
          />
        </FadeIn>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}
