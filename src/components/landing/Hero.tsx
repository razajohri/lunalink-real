import React from "react";
import Header from "@/components/landing/Header";
import { useNavigate } from "react-router-dom";
import { Phone } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOnboardNow = () => {
    window.location.href = '/auth';
  };

  return (
    <section className="bg-gray-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <div className="inline-block bg-blue-900/60 backdrop-blur-sm text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Shopify App Store
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Your <span className="text-blue-400 px-1">AI Sales Rep</span> That Never Sleeps and Recovers Abandoned Checkouts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-400 max-w-xl mx-auto md:mx-0">
              Automate customer service and boost revenue with AI that recovers carts, recommends products, and personalizes outreach — all on autopilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleOnboardNow}
                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg px-8 py-3 rounded-lg font-semibold shadow-lg"
              >
                Onboard Now
              </button>
              <button
                className="border border-blue-500 text-blue-400 hover:bg-blue-900/60 transition-colors text-lg px-8 py-3 rounded-lg font-semibold"
                onClick={scrollToHowItWorks}
              >
                See How It Works
              </button>
            </div>
            <div className="mt-5 inline-block py-2 px-4 bg-blue-900/40 backdrop-blur-sm rounded-lg border border-blue-800/50">
              <p className="text-blue-300 text-sm font-medium">
                Ideal for Shopify stores generating $5,000+ monthly revenue
              </p>
            </div>
          </div>
          {/* Hero Visual */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div className="w-64 h-[500px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                <div className="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone status bar */}
                  <div className="h-8 bg-black w-full flex justify-between items-center px-5">
                    <div className="text-white text-xs">9:41</div>
                    <div className="w-32 h-4 bg-gray-900 rounded-full"></div>
                  </div>
                  {/* Call interface */}
                  <div className="h-full pt-8 flex flex-col items-center bg-gradient-to-b from-blue-900 to-blue-700 text-white">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4">
                      <img
                        src="/lovable-uploads/4724f8bd-cc0b-401b-80fe-9f041d72c595.png"
                        alt="LunaLink AI Logo"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <p className="text-xl font-semibold mb-1">LunaLink AI</p>
                    <p className="text-sm opacity-80 mb-4">AI Assistant</p>
                    {/* Waveform animation */}
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform1 h-4"></div>
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform2 h-8"></div>
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform3 h-6"></div>
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform4 h-10"></div>
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform2 h-8"></div>
                      <div className="w-2 bg-blue-400 rounded-full animate-waveform1 h-4"></div>
                    </div>
                    <div className="mt-auto mb-10">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                        <Phone size={28} className="text-white" />
                      </div>
                    </div>
                    {/* Call transcript snippet */}
                    <div className="w-full bg-black/40 backdrop-blur-sm p-4 text-left rounded-t-xl">
                      <p className="text-sm font-medium mb-2">Call Transcript</p>
                      <p className="text-xs opacity-90 mb-1">
                        "Hello! I'm calling from LunaLink AI about the items in your cart..."
                      </p>
                      <p className="text-xs opacity-90">
                        "I noticed you might also like our bestselling water bottle that pairs perfectly with your yoga mat. Would you like to add that with a 10% discount?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pulse effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-4 border-blue-500/30 rounded-full animate-pulse-ring"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
