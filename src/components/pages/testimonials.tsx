"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeader, StarRating, FadeIn, BlurFade, HoverScale } from "@/components/shared";
import { TESTIMONIALS } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="What Our Students Say"
            subtitle="Hear from learners who transformed their skills with EduBridge"
          />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <BlurFade key={testimonial.id} delay={index * 0.15}>
              <HoverScale scale={1.02}>
                <div className="bg-card border rounded-2xl p-6 relative min-h-[250px] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  {/* quote icon */}
                  <div>
                    <div className="absolute -top-3 right-6 p-2 bg-primary rounded-lg">
                      <Quote className="w-4 h-4 text-primary-foreground" />
                    </div>

                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} size="sm" showValue={false} />
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={getImageUrl(testimonial.image)}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                          unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                </div>
              </HoverScale>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
