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
      title: "AI Voice Agents",
      description: "Intelligent voice assistants that handle customer calls 24/7 with natural conversations."
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
      <section className="relative z-10 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl shadow-elegant bg-white/90 dark:bg-gray-950/90 p-10 md:p-16 border border-blue-100 dark:border-gray-800">
          {/* Left Content */}
            <div className="space-y-10 animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-4">
                  <h2 className="text-5xl font-extrabold text-blue-900 dark:text-blue-200 leading-tight drop-shadow-sm">
                    AI doesn't sleep. Neither should your revenue.
                </h2>
                  <h3 className="text-2xl font-semibold text-primary">
                    Automate abandoned cart recovery and customer service with AI reps that sell and support 24/7—without needing lunch breaks or PTO.
                </h3>
              </div>
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                  Want the breakdown?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg"
                  onClick={handleOnboardNow}
                disabled={isStarting}
              >
                {isStarting ? "Starting..." : "Get Started"}
              </Button>
              <Button
                size="lg"
                  className="text-lg px-8 py-6 bg-primary/10 text-primary border border-primary hover:bg-primary/20 shadow-lg"
                  onClick={() => window.location.href = "https://youtu.be/2w1xD8Wc8l4"}
              >
                Watch Demo
              </Button>
            </div>
              <div className="flex flex-wrap gap-6 mt-6 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium">99.9% Uptime</span>
              </div>
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium">24/7 Support</span>
              </div>
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium">Built for Ecommerce</span>
                </div>
              </div>
            </div>
            {/* Abandoned Cart Recovery Feature Steps */}
            <div className="mt-6 mb-2 max-w-xl bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl shadow-card p-6">
              <h4 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2 text-center">How Abandoned Cart Recovery Works</h4>
              <ol className="list-decimal list-inside space-y-1 text-base text-blue-900 dark:text-blue-100">
                <li>Our AI calls the customer who abandoned cart.</li>
                <li>Customer asks a question about the product and gets it answered.</li>
                <li>AI sends them a discount code with <span className="font-semibold">verbal</span> savings amount as well.</li>
                <li>Customer converts.</li>
                <li><span className="font-semibold">Add this to your brand now.</span></li>
              </ol>
            </div>
          {/* Right Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <Card
                key={index}
                  className="p-8 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 border-0 hover:scale-105 transition-all duration-300 shadow-elegant rounded-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shadow-md">
                      <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-2">
                      <h3 className="font-semibold text-white text-lg tracking-wide">{feature.title}</h3>
                      <p className="text-white/90 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* Bottom Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fade-in">
            <div className="space-y-2 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-card p-8 border border-blue-100 dark:border-gray-800">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">Increase Ecom Sales with personalized AI</div>
              <div className="text-gray-700 dark:text-gray-300"></div>
            </div>
            <div className="space-y-2 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-card p-8 border border-blue-100 dark:border-gray-800">
              <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">98.5%</div>
              <div className="text-gray-700 dark:text-gray-300">Success Rate</div>
          </div>
            <div className="space-y-2 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-card p-8 border border-blue-100 dark:border-gray-800">
              <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">24/7</div>
              <div className="text-gray-700 dark:text-gray-300">Always Available</div>
          </div>
          </div>
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
