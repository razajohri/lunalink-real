import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, BarChart, Users, Sparkles } from "lucide-react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Welcome = () => {
  const [isStarting, setIsStarting] = useState(false);

  const handleOnboardNow = () => {
    setIsStarting(true);
    setTimeout(() => {
      window.location.href = "/auth";
    }, 300);
  };

  const features = [
    {
      icon: Phone,
      title: "WhatsApp Calling & Text Agent",
      description: "Add inbound calling and chat agent to handle customers queries via WhatsApp."
    },
    {
        icon: Sparkles,
        title: "Shopify Brain",
        description: "Chat with your store like ChatGPT. Get live stats, automate actions, and manage everything through natural conversation."
      },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Detailed insights and metrics to optimize your AI assistant performance."
    },
    {
      icon: Users,
      title: "24/7 Customer Service",
      description: "Round-the-clock customer support automation that never sleeps."
    },
  ];

  return (
    <>
      <Header />
      <Hero />
      {/* ROI Comparison Section */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">The ROI of LunaLink</h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Humans Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Humans</h3>
            <div className="space-y-4">
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-red-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg></span>
                <span className="text-gray-700">Works 40 hrs/week</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-red-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg></span>
                <span className="text-gray-700">~$2.35 cost per call</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-red-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg></span>
                <span className="text-gray-700">Takes 1 call at a time</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-red-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg></span>
                <span className="text-gray-700">Speaks 1 or 2 languages</span>
              </div>
            </div>
          </div>
          {/* AI Support Rep Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Luna, the AI support rep</h3>
            <div className="space-y-4">
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-green-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></span>
                <span className="text-gray-700">Works 168 hrs/week</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-green-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></span>
                <span className="text-gray-700">~$0.38 cost per call</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-green-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></span>
                <span className="text-gray-700">Takes 15+ calls at a time</span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3">
                <span className="text-green-500 mr-3"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></span>
                <span className="text-gray-700">Speaks 30 languages</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <span className="inline-block bg-green-100 text-green-700 text-2xl font-bold px-8 py-4 rounded-full shadow">You save <span className="text-3xl">83%</span> <span role="img" aria-label="money">🤑</span></span>
        </div>
      </section>
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default Welcome;
