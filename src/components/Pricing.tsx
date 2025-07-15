
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for small stores getting started",
      price: "$28.99",
      period: "/month",
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
      description: "Ideal for growing businesses",
      price: "$68",
      period: "/month",
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
      description: "For high-volume stores",
      price: "$190",
      period: "/month",
      features: [
        "All features included",
        "Order confirmation calls",
        "Premium AI voices",
        "120+ calls per month",
        "Custom integrations",
        "Free phone number",
        "30+ languages"
      ],
      popular: false,
      cta: "Onboard Now"
    }
  ];

  const handleCtaClick = (cta: string) => {
    // Navigate to auth page for onboarding
    window.location.href = '/auth';
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            All plans include free setup, dedicated phone number, and our "Done For You" service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl overflow-hidden shadow-md border ${
                plan.popular ? 'border-cartcall-500 ring-2 ring-cartcall-200' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-cartcall-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mb-6 h-12">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <Button
                  onClick={() => handleCtaClick(plan.cta)}
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-cartcall-600 hover:bg-cartcall-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-cartcall-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a custom plan?</h3>
          <p className="text-gray-600 mb-6">
            Contact us for custom pricing tailored to your specific needs and call volume.
          </p>
                    <Button
            variant="outline"
            className="border-cartcall-600 text-cartcall-600 hover:bg-cartcall-50"
            onClick={() => handleCtaClick("Contact Sales")}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
