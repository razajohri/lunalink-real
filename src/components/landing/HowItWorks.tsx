import React from "react";

const steps = [
  {
    title: "Install LunaLink AI",
    description: "Add the app to your Shopify store in just a few clicks.",
    icon: "1"
  },
  {
    title: "Configure Your Preferences",
    description: "Set your brand voice, product recommendations, and recovery strategies.",
    icon: "2"
  },
  {
    title: "Let AI Do the Work",
    description: "LunaLink AI engages customers, calls left checkout carts, and boosts your sales automatically!",
    icon: "3"
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get Started in Minutes
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Simple setup process that gets you up and running with AI-powered customer service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative group"
          >
            {/* Connection line */}
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0"></div>
            )}

            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl font-bold">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-blue-900 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          No coding required • Works with any Shopify store
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
