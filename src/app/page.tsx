import FeaturedSkills from "@/components/FeaturedSkills";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import PlatformStats from "@/components/PlatformStats";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <HowItWorks />
      <PlatformStats />
      <FeaturedSkills />
      <Testimonials />
    </div>
  );
}
