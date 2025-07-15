import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$28.99",
    period: "/month",
    description: "Perfect for small stores getting started",
    features: [
      "Cart recovery calls",
      "45 calls per month",
      "Email support",
      "Free phone number",
      "English language"
    ],
    popular: false,
    cta: "Onboard Now"
  },
  {
    name: "Growth",
    price: "$68",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "Cart recovery + customer service",
      "Order cancellation calls",
      "80 calls per month",
      "Advanced analytics",
      "Free phone number",
      "6+ languages"
    ],
    popular: true,
    cta: "Onboard Now"
  },
  {
    name: "Pro",
    price: "$190",
    period: "/month",
    description: "For high-volume stores",
    features: [
      "All features included",
      "Order confirmation calls",
      "Premium AI voices",
      "100+ calls per month",
      "Custom integrations",
      "Free phone number",
      "30+ languages"
    ],
    popular: false,
    cta: "Onboard Now"
  }
];

const Pricing = () => {
  const handleOnboard = () => {
    window.location.href = "/auth";
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${
                plan.popular
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                  : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleOnboard}
                className={`w-full mt-auto ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } transition-colors duration-200`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 mb-6">
              We offer custom pricing for businesses with specific requirements.
              Get in touch with our sales team to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleOnboard}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Onboard Now
              </Button>
              <Button
                variant="outline"
                onClick={handleOnboard}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
