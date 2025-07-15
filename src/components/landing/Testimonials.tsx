import React from "react";

const testimonials = [
  {
    quote: "LunaLink AI recovered more carts in a week than we did in a month. Our revenue is up 20%!",
    name: "Sarah M.",
    role: "Shopify Store Owner",
    company: "Fashion Boutique",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The AI assistant feels like a real team member. Our customers love the instant responses!",
    name: "James L.",
    role: "E-commerce Manager",
    company: "Tech Gadgets",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "Setup was a breeze and the results were immediate. Highly recommend LunaLink!",
    name: "Priya S.",
    role: "DTC Brand Founder",
    company: "Wellness Products",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Trusted by Growing Businesses
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how LunaLink AI is helping e-commerce businesses increase sales and improve customer satisfaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-6 left-6 text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4zm10 0a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4z" />
              </svg>
            </div>

            <div className="pt-8">
              <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"><span class="text-white font-semibold text-sm">${t.name.split(' ').map(n => n[0]).join('')}</span></div>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.role}</div>
                  <div className="text-sm text-blue-600 font-medium">{t.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
