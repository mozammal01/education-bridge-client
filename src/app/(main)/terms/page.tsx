import { Sparkles, ShieldCheck, Scale, FileText } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using EduBridge, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform."
    },
    {
      title: "2. User Eligibility",
      content: "You must be at least 13 years old to use EduBridge. If you are under 18, you must have the consent of a parent or legal guardian."
    },
    {
      title: "3. Tutor Engagement",
      content: "Tutors are independent contractors and not employees of EduBridge. We do not guarantee the quality of every session, though we maintain strict vetting standards."
    },
    {
      title: "4. Payments and Refunds",
      content: "Payments are processed securely through our platform. Cancellations must be made 24 hours in advance to be eligible for a full refund."
    },
    {
      title: "5. Code of Conduct",
      content: "Users must treat each other with respect. Any form of harassment or inappropriate behavior will result in immediate termination of access."
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <section className="relative py-20 bg-linear-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-6">
            <Scale className="w-3 h-3" />
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Terms of <span className="text-primary">Service</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Last updated: April 10, 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="bg-card border rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-8 border-t">
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold mb-1">Your data is safe</p>
                <p className="text-sm text-muted-foreground">We take your privacy seriously. For more details on how we handle your data, please visit our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
