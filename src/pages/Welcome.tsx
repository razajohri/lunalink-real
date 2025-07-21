import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, BarChart, Users, Sparkles, ShoppingCart } from "lucide-react";
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
      {/* Abandoned Cart Recovery Audio Demo Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex justify-center">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-blue-200 dark:border-gray-800 p-10 md:p-16 max-w-xl w-full flex flex-col items-center">
            <div className="mb-8 flex flex-col items-center">
              <div className="bg-gradient-to-br from-primary to-blue-500 p-6 rounded-full shadow-lg mb-4 animate-pulse">
                <ShoppingCart className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200 mb-2 text-center drop-shadow">
                Listen: How Luna Calls Left Checkout Carts
              </h2>
              <div className="font-semibold mb-4 text-lg text-blue-700 dark:text-blue-100 text-center">Abandoned Cart Recovery Call Demo</div>
            </div>
            <audio controls className="w-full max-w-md rounded-lg overflow-hidden shadow-md bg-blue-100 dark:bg-gray-800">
              <source src="https://docs.google.com/uc?export=download&id=1HoGBlXztixK3lJkaDY74lF8YPGDEtTpW" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </section>
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
      <div className="mt-14 mb-8 max-w-3xl mx-auto bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl shadow-card p-8">
  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4 text-center">
    How Abandoned Cart Recovery Works
  </h3>
  <ol className="list-decimal list-inside space-y-2 text-lg text-blue-900 dark:text-blue-100">
    <li>Our AI calls the customer who abandoned cart.</li>
    <li>Customer asks a question about the product and gets it answered.</li>
    <li>AI sends them a discount code with <span className="font-semibold">verbal</span> savings amount as well.</li>
    <li>Customer converts.</li>
    <li><span className="font-semibold">Add this to your brand now.</span></li>
  </ol>
</div>
      {/* MyShopifyBrain Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Your Shopify Brain
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Chat with your store like ChatGPT. Get live stats, automate actions, and manage everything through natural conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Your AI-Powered Store Assistant
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  MyShopifyBrain is your intelligent companion that understands your store inside and out. Ask questions, get insights, and take action - all through natural conversation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Live Store Analytics</h4>
                    <p className="text-gray-600 dark:text-gray-300">Get real-time sales data, customer insights, and performance metrics instantly.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Automated Actions</h4>
                    <p className="text-gray-600 dark:text-gray-300">Create discounts, update inventory, and manage orders through simple chat commands.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Natural Conversation</h4>
                    <p className="text-gray-600 dark:text-gray-300">No complex interfaces needed. Just chat naturally and get things done.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                  onClick={() => window.location.href = "/auth"}
                >
                  Try MyShopifyBrain - Coming Soon
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">What were my sales yesterday?</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 ml-8">
                      <p className="text-sm text-blue-800 dark:text-blue-200">Yesterday you had $2,847 in sales from 23. Your top product was...</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Create a 20% discount for new customers</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 ml-8">
                      <p className="text-sm text-blue-800 dark:text-blue-200">✅ Discount code 'WELCOME20' created and applied to new customers</p>
                    </div>
                  </div>
          </div>
        </div>
          </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <div className="w-full py-6 bg-blue-50 dark:bg-gray-900 border-t border-blue-100 dark:border-gray-800 text-center">
        <span className="text-lg font-semibold text-blue-900 dark:text-blue-200">Refer our product to an ecom store or Shopify merchant and earn <span className="text-green-600">20%</span> on each sale!</span>
      </div>
    </>
  );
};

export default Welcome;
