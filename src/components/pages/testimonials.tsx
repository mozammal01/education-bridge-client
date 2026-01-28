import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeader, StarRating } from "@/components/shared";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="What Our Students Say"
          subtitle="Hear from learners who transformed their skills with EduBridge"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border rounded-2xl p-6 relative hover:shadow-lg transition-shadow"
            >
              {/* quote icon */}
              <div className="absolute -top-3 right-6 p-2 bg-primary rounded-lg">
                <Quote className="w-4 h-4 text-primary-foreground" />
              </div>

              <div className="mb-4">
                <StarRating rating={testimonial.rating} size="sm" showValue={false} />
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
