import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import DeepTrackingExplainer from "@/components/sections/DeepTrackingExplainer";
import Testimonial from "@/components/sections/Testimonial";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <FeaturesGrid />
        <HowItWorks />
        <DeepTrackingExplainer />
        <Testimonial />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
