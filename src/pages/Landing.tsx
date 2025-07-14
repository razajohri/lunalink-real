import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LunaLink AI - Your AI Sales Rep That Never Sleeps";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
