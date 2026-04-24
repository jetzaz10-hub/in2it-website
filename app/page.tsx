import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyIN2IT from "@/components/WhyIN2IT";
import EventLifecycle from "@/components/EventLifecycle";
import OurServices from "@/components/OurServices";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurExperiences from "@/components/OurExperiences";
import Partners from "@/components/Partners";
import MeetTeam from "@/components/MeetTeam";
import ContactSection from "@/components/ContactSection";
import MetricsSection from "@/components/MetricsSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import ScrollToTop from "@/components/ScrollToTop";

import UnifiedBackgroundWrapper from "@/components/UnifiedBackgroundWrapper";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Partners />
        <WhyIN2IT />
        <EventLifecycle />
        
        <UnifiedBackgroundWrapper>
          <OurServices />
          <FeaturedProducts />
          <OurExperiences />
        </UnifiedBackgroundWrapper>

        <MetricsSection />
        <MeetTeam />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </>
  );
}
