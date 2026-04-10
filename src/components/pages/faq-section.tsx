"use client";

import { FadeIn, SectionHeader } from "@/components/shared";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I find the right tutor for me?",
    answer: "You can use our 'Find Tutors' page to filter by subject, price range, and rating. Each tutor has a profile with their experience, subjects, and student reviews to help you decide.",
  },
  {
    question: "How does the payment process work?",
    answer: "Payments are handled securely through our platform. You can book individual sessions or packages. The funds are held in escrow and only released to the tutor after the session is completed.",
  },
  {
    question: "Can I cancel or reschedule a session?",
    answer: "Yes, you can cancel or reschedule sessions up to 24 hours before the start time through your student dashboard without any penalty.",
  },
  {
    question: "What happens if I'm not satisfied with a session?",
    answer: "We have a 100% satisfaction guarantee. If you're not happy with your first session, we'll help you find a new tutor and your first session with them will be on us.",
  },
  {
    question: "How do the online sessions take place?",
    answer: "Our platform has a built-in virtual classroom with video chat, a shared whiteboard, and document sharing tools. No extra software download is required.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the EduBridge platform"
          />
        </FadeIn>

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-card shadow-md border-primary/20' : 'bg-background hover:border-primary/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
