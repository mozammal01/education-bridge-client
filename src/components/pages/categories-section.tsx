"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard, SectionHeader, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared";
import { CATEGORIES } from "@/lib/constants";
import { categoriesService } from "@/services";
import { Category } from "@/types";

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response.data) {
          const categoryData = response.data;
          
          // De-duplicate by name and remove misspelled 'Mathmatics'
          const uniqueCats = categoryData.filter((cat, index, self) =>
            index === self.findIndex((c) => c.name === cat.name) && 
            cat.name !== "Mathmatics"
          );
          setCategories(uniqueCats);
        } else {
          setCategories(CATEGORIES);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(CATEGORIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.slice(0, 8);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="Browse by Category"
            subtitle="Find the perfect tutor for any subject you want to learn"
          />
        </FadeIn>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {filteredCategories.map((category) => (
              <StaggerItem key={category.id}>
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn delay={0.4}>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
