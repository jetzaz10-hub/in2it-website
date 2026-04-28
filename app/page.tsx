import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyIN2IT from "@/components/WhyIN2IT";
import EventLifecycle from "@/components/EventLifecycle";
import OurServices from "@/components/OurServices";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurExperiences from "@/components/OurExperiences";
import Gallery from "@/components/Gallery";
import IntegrationsSection from "@/components/ui/integrations-section";
import ContactSection from "@/components/ContactSection";

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
        <IntegrationsSection />
        <WhyIN2IT />
        <EventLifecycle />

        <UnifiedBackgroundWrapper>
          <OurServices />
          <FeaturedProducts />
          <OurExperiences />
          <Gallery />
        </UnifiedBackgroundWrapper>
<<<<<<< HEAD


=======
        <MetricsSection />
>>>>>>> ccd55f42f96f48f0677b1dedb54fbf08d7716052
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </>
  );
}
