import FeaturedSkills from "@/src/app/components/FeaturedSkills";
import Hero from "@/src/app/components/Hero";
import Categories from "@/src/app/components/Categories";
import HowItWorks from "@/src/app/components/HowItWorks";
import PlatformStats from "@/src/app/components/PlatformStats";
import Testimonials from "@/src/app/components/Testimonials";
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
