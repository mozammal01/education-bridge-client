import { FadeIn, SectionHeader, StaggerContainer, StaggerItem } from "@/components/shared";
import { BookOpen, Users, Clock, ShieldCheck, Globe, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Verified Tutors",
      description: "All our tutors go through a rigorous background check and verification process.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Learn Anything",
      description: "From academics to arts, find experts in over 500+ subjects and skills.",
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule. Learn at your own pace anytime.",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Global Community",
      description: "Connect with learners and experts from all around the globe.",
      icon: Globe,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Expert Support",
      description: "Our support team is available 24/7 to help you with any questions.",
      icon: Users,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "Fast Progress",
      description: "Personalized 1-on-1 attention helps you learn 3x faster than traditional ways.",
      icon: Zap,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="Why Choose EduBridge?"
            subtitle="We provide the best platform for personalized learning and growth"
          />
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="group p-8 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
