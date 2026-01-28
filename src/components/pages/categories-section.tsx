import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard, SectionHeader } from "@/components/shared";
import { CATEGORIES } from "@/lib/constants";

export function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Browse by Category"
          subtitle="Find the perfect tutor for any subject you want to learn"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/categories">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
