import { HeroSection } from "../../components/pages/hero-section";
import { StatsSection } from "../../components/pages/stats-section";
import { CategoriesSection } from "../../components/pages/categories-section";
import { FeaturedTutors } from "../../components/pages/featured-tutors";
import { HowItWorks } from "../../components/pages/how-it-works";
import { Testimonials } from "../../components/pages/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedTutors />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
