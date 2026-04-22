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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Partners />
        <WhyIN2IT />
        <MetricsSection />
        <EventLifecycle />
        <OurServices />
        <FeaturedProducts />
        <OurExperiences />
        <MeetTeam />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
