import { Shield, Eye, Lock, Database, Globe } from "lucide-react";

export default function PrivacyPage() {
  const policies = [
    {
      icon: Eye,
      title: "Data We Collect",
      content: "We collect information you provide directly to us, such as your name, email address, profile picture, and any communications with tutors."
    },
    {
      icon: Lock,
      title: "Security Measures",
      content: "We implement robust security measures including encryption and multi-factor authentication to protect your personal information from unauthorized access."
    },
    {
      icon: Database,
      title: "How We Use Data",
      content: "Your data is used to provide and enhance our tutoring services, personalize your learning experience, and communicate important updates."
    },
    {
      icon: Globe,
      title: "Third-Party Sharing",
      content: "We do not sell your personal data. We only share information with third-party services that help us operate our platform (e.g., payment processors) under strict confidentiality."
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <section className="relative py-20 bg-linear-to-b from-emerald-500/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-600 uppercase tracking-wider mb-6">
            <Shield className="w-3 h-3" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Privacy <span className="text-emerald-500">Policy</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Effective date: April 10, 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl mt-12 grid md:grid-cols-2 gap-8">
        {policies.map((policy, i) => (
          <div key={i} className="bg-card border rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-3 bg-emerald-500/10 rounded-2xl w-fit mb-6">
              <policy.icon className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">{policy.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {policy.content}
            </p>
          </div>
        ))}
        
        <div className="md:col-span-2 bg-muted/30 border rounded-[2rem] p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions about your privacy?</h2>
          <p className="text-muted-foreground mb-8">If you have any concerns or questions regarding this policy, our team is here to help.</p>
          <a href="/contact">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all">
              Contact Privacy Team
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
