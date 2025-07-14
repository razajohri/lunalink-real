
import {
  MessageSquare,
  LineChart,
  BarChart,
  Settings,
  ShoppingBag,
  Shield,
  Users,
  TrendingUp,
  Package
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-cartcall-600" />,
      title: "AI Voice Calls That Sound Human",
      description: "Our AI agents engage in natural conversations, adapting to customer responses in real-time."
    },
    {
      icon: <Users className="w-10 h-10 text-cartcall-600" />,
      title: "Automated Customer Service",
      description: "24/7 customer service that handles abandoned cart recovery without any staff involvement."
    },
    {
      icon: <Package className="w-10 h-10 text-cartcall-600" />,
      title: "Smart Product Recommendations",
      description: "AI identifies and suggests relevant products to increase average order value and drive more sales."
    },
    {
      icon: <LineChart className="w-10 h-10 text-cartcall-600" />,
      title: "Call Transcripts & Logs",
      description: "Review detailed call records and transcripts to understand customer interactions."
    },
    {
      icon: <BarChart className="w-10 h-10 text-cartcall-600" />,
      title: "Performance Analytics",
      description: "Track recovered revenue, call success rates, and conversion metrics from your dashboard."
    },
    {
      icon: <Settings className="w-10 h-10 text-cartcall-600" />,
      title: "No Setup Required",
      description: "We handle all technical setup, configuration, and optimization for you."
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-cartcall-600" />,
      title: "Built for Shopify",
      description: "Seamlessly integrated with your Shopify store with no additional tools needed."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-cartcall-600" />,
      title: "Increase Average Order Value",
      description: "Intelligent upselling and cross-selling during cart recovery conversations boosts revenue."
    },
    {
      icon: <Shield className="w-10 h-10 text-cartcall-600" />,
      title: "Safe & Compliant",
      description: "All calls follow telecommunication regulations and privacy best practices."
    }
  ];

  return (
    <section id="features" className="bg-gray-50 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-cartcall-600 font-medium mb-2">NATIVE SHOPIFY APP</div>
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">
            Powerful tools to recover abandoned carts, automate customer service, and boost your revenue
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-md bg-cartcall-50 text-cartcall-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Why Use AI Voice Calls?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-cartcall-600 mb-2">3X</div>
              <p className="text-gray-700">Higher recovery rate than email campaigns</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-cartcall-600 mb-2">24/7</div>
              <p className="text-gray-700">Automated customer service without any staff</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-cartcall-600 mb-2">15%+</div>
              <p className="text-gray-700">Average increase in order value with AI recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
