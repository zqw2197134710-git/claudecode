import HeroSection from "@/components/HeroSection";
import DealHighlight from "@/components/DealHighlight";
import HoursAndFeatures from "@/components/HoursAndFeatures";
import FeaturedDishes from "@/components/FeaturedDishes";
import MapSection from "@/components/MapSection";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <DealHighlight />
      <HoursAndFeatures />
      <FeaturedDishes />
      <MapSection />
      <CtaBanner />
    </main>
  );
}
