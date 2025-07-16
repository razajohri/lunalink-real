
import { Check, ShoppingCart, PhoneCall, BarChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingCart className="w-10 h-10 text-blue-400" />,
      title: "Install from Shopify App Store",
      description: "Simply add LunaLink AI to your Shopify store with one click. No technical knowledge required."
    },
    {
      icon: <PhoneCall className="w-10 h-10 text-blue-400" />,
      title: "We Activate Your AI Voice Agent",
      description: "Our team sets up your custom AI voice agent within minutes. No setup work needed from you."
    },
    {
      icon: <BarChart className="w-10 h-10 text-blue-400" />,
      title: "Watch Your Revenue Grow",
      description: "Your AI agent automatically calls abandoned cart customers, recommends products, and recovers sales 24/7."
    }
  ];

  return (
    <section id="how-it-works" className="bg-gray-900 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-blue-400 font-medium mb-2">SHOPIFY APP AUTOMATION</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Get up and running in minutes with our completely done-for-you Shopify app
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 relative shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-white">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-400 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {/* Abandoned Cart Recovery Feature Steps */}
        <div className="mt-14 mb-8 max-w-3xl mx-auto bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl shadow-card p-8">
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4 text-center">How Abandoned Cart Recovery Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-lg text-blue-900 dark:text-blue-100">
            <li>Our AI calls the customer who abandoned cart.</li>
            <li>Customer asks a question about the product and gets it answered.</li>
            <li>AI sends them a discount code with <span className="font-semibold">verbal</span> savings amount as well.</li>
            <li>Customer converts.</li>
            <li><span className="font-semibold">Add this to your brand now.</span></li>
          </ol>
        </div>
        {/* Watch Demo Button */}
        <div className="flex justify-center mt-10">
          <button
            className="text-lg px-8 py-6 bg-primary/10 text-primary border border-primary rounded-lg hover:bg-primary/20 shadow-lg transition-colors duration-200"
            onClick={() => window.location.href = "https://youtu.be/2w1xD8Wc8l4"}
          >
            Watch Demo
          </button>
        </div>

        <div className="mt-16 bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                100% Done For You
              </h3>
              <p className="text-gray-400">
                No technical setup, no API keys, no coding. Our Shopify app handles everything so you can focus on your business.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Custom voice agent setup",
                "Product recommendation engine",
                "Call script optimization",
                "Phone number included",
                "Automatic call scheduling",
                "Customer service automation",
                "Dashboard configuration",
                "Continuous improvements"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="mr-2 text-blue-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
