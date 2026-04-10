import type { Metadata } from "next";
import { 
  Search, 
  Book, 
  MessageCircle, 
  CreditCard, 
  ShieldCheck, 
  UserPlus, 
  LifeBuoy 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help and support for EduBridge",
};

const helpCategories = [
  {
    title: "Getting Started",
    icon: UserPlus,
    description: "Learn how to create an account and start your journey.",
    links: ["Create an account", "Verify your identity", "Profile setup"]
  },
  {
    title: "For Students",
    icon: Book,
    description: "how to find tutors, book sessions, and manage your learning.",
    links: ["How to book", "Writing reviews", "Managing sessions"]
  },
  {
    title: "For Tutors",
    icon: LifeBuoy,
    description: "Manage your listings, availability, and earnings.",
    links: ["Become a tutor", "Setting availability", "Getting paid"]
  },
  {
    title: "Payments & Refunds",
    icon: CreditCard,
    description: "Information about billing, invoices, and our refund policy.",
    links: ["Payment methods", "Refund process", "Invoices"]
  },
  {
    title: "Trust & Safety",
    icon: ShieldCheck,
    description: "How we keep our community safe and secure.",
    links: ["Community guidelines", "Reporting users", "Privacy policy"]
  },
  {
    title: "Support",
    icon: MessageCircle,
    description: "Contact our team for direct assistance.",
    links: ["Open a ticket", "Live chat", "Contact info"]
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-6">How can we help?</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for articles, guides, and more..." 
              className="pl-12 h-14 text-lg rounded-full shadow-lg border-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((cat, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{cat.description}</p>
                  <ul className="space-y-3">
                    {cat.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full" />
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-8">Our support team is available 24/7 to assist you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline">Live Chat</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
