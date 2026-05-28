import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WaitlistForm />
    </div>
  );
}
