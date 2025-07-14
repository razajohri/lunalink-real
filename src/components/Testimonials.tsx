
const Testimonials = () => {
  const testimonials = [
    {
      quote: "CartCall recovered 15 abandoned carts in our first week. The AI voice agent sounds incredibly natural and our customers love the personal touch.",
      author: "Sarah Johnson",
      role: "Founder, Fashion Boutique",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg"
    },
    {
      quote: "Setup took less than 10 minutes and we started seeing recovered sales the same day. The ROI is incredible - it paid for itself within 48 hours.",
      author: "Michael Chen",
      role: "E-Commerce Director, HealthStore",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "After six months of using CartCall, our abandoned cart recovery rate is up 32%. The dashboard makes it easy to track performance and see the impact.",
      author: "Jessica Williams",
      role: "Marketing Manager, Home Goods Shop",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-cartcall-600 font-medium mb-2">TRUSTED BY SHOPIFY MERCHANTS</div>
          <h2 className="section-title">What Store Owners Say</h2>
          <p className="section-subtitle">
            Helping Shopify merchants recover more abandoned carts and boost revenue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="mb-6 flex-1">
                <div className="text-cartcall-600 text-4xl font-serif mb-4">"</div>
                <blockquote className="text-gray-700 italic">
                  {testimonial.quote}
                </blockquote>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-70">
          {/* Placeholder for logos */}
          {[1, 2, 3, 4, 5].map((logo) => (
            <div key={logo} className="h-8 w-32 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
