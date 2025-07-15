import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LunaLink AI - Your AI Sales Rep That Never Sleeps";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
