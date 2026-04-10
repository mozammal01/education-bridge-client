import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { SectionHeader } from "@/components/shared";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about EduBridge",
};

const faqs = [
  {
    question: "How do I find the right tutor?",
    answer: "You can browse tutors by category, subject, or language on our &apos;Find Tutors&apos; page. Use the filters to narrow down by price, rating, and availability to find your perfect match."
  },
  {
    question: "How do I book a session?",
    answer: "Once you find a tutor you like, visit their profile and use the booking card on the right. Select your subject, date, and time, then confirm your booking."
  },
  {
    question: "Is there a trial session?",
    answer: "Many of our tutors offer a free or discounted first session. Look for the &apos;Trial Session&apos; badge on tutor profiles."
  },
  {
    question: "How do payments work?",
    answer: "EduBridge uses a secure payment system. You can pay using credit/debit cards or PayPal. Payments are held securely and released to the tutor after the session is completed."
  },
  {
    question: "What if I need to cancel a booking?",
    answer: "You can cancel a booking from your student dashboard. Please refer to our Cancellation Policy for details on refunds and notice periods."
  },
  {
    question: "How can I become a tutor?",
    answer: "Click on &apos;Become a Tutor&apos; in the footer or navbar. You&apos;ll need to fill out an application, provide your credentials, and undergo a verification process."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <SectionHeader 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about EduBridge platform"
        className="mb-12"
      />
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground transition-all">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
