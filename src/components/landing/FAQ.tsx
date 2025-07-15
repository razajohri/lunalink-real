import React, { useState } from "react";

const faqs = [
  {
    question: "How does LunaLink AI recover abandoned carts?",
    answer: "LunaLink AI automatically contacts customers via phone and personalized messages, encouraging them to complete their purchase. Our AI analyzes customer behavior and creates personalized recovery strategies that convert abandoned carts into sales.",
  },
  {
    question: "Is LunaLink AI easy to set up?",
    answer: "Yes! You can install it from the Shopify App Store and be up and running in minutes. Our guided setup process takes you through configuration step-by-step, and our team is available to help if needed.",
  },
  {
    question: "Can I customize the AI's responses?",
    answer: "Absolutely. You can set your brand voice, product recommendations, and more from your dashboard. Customize everything from greeting messages to product suggestions to match your brand perfectly.",
  },
  {
    question: "Does LunaLink AI work 24/7?",
    answer: "Yes, LunaLink AI never sleeps and is always ready to help your customers. Whether it's 2 AM or 2 PM, your AI assistant is working to recover carts and provide customer support.",
  },
  {
    question: "What kind of results can I expect?",
    answer: "Most of our customers see a 15-25% increase in revenue within the first 30 days. Cart recovery rates typically improve by 40-60%, and customer satisfaction scores increase significantly.",
  },
  {
    question: "Is my customer data secure?",
    answer: "Absolutely. We use enterprise-grade security and are fully compliant with GDPR, CCPA, and other privacy regulations. Your customer data is encrypted and never shared with third parties.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  const handleContactSupport = () => {
    // Try to open WhatsApp first, fallback to email
    const whatsappUrl = `https://wa.me/923404666326?text=Hi, I need support with LunaLink AI`;
    const emailUrl = `mailto:customer.lunalinkai@gmail.com?subject=LunaLink AI Support Request&body=Hi, I need support with LunaLink AI.`;

    // Check if WhatsApp is available (mobile devices)
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      window.open(whatsappUrl, '_blank');
    } else {
      // On desktop, give user choice
      if (window.confirm('Would you like to contact us via WhatsApp? Click OK for WhatsApp, Cancel for Email.')) {
        window.open(whatsappUrl, '_blank');
      } else {
        window.open(emailUrl, '_blank');
      }
    }
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about LunaLink AI and how it can help your business
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-gray-900 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="pr-4">{faq.question}</span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${open === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </button>
              {open === idx && (
                <div className="px-8 pb-6 text-gray-600 leading-relaxed animate-fade-in border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the most out of LunaLink AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactSupport}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Support
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                View Documentation
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              WhatsApp: +923404666326 • Email: customer.lunalinkai@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
