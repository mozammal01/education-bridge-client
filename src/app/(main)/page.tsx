import { HeroSection } from "../../components/pages/hero-section";
import { StatsSection } from "../../components/pages/stats-section";
import { CategoriesSection } from "../../components/pages/categories-section";
import { FeaturedTutors } from "../../components/pages/featured-tutors";
import { FeaturesSection } from "../../components/pages/features-section";
import { HowItWorks } from "../../components/pages/how-it-works";
import { Testimonials } from "../../components/pages/testimonials";
import { FAQSection } from "../../components/pages/faq-section";
import { LatestBlogsSection } from "../../components/pages/latest-blogs-section";
import { NewsletterSection } from "../../components/pages/newsletter-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedTutors />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <LatestBlogsSection />
      <NewsletterSection />
    </>
  );
}
