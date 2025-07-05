import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, BarChart, Users } from "lucide-react";
import lunaLinkLogo from "@/assets/lunalink-logo.jpg";

const Welcome = () => {
  const [isStarting, setIsStarting] = useState(false);

  const handleGetStarted = () => {
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
      icon: MessageSquare,
      title: "SMS Messaging",
      description: "Automated SMS campaigns for cart recovery and customer engagement."
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={lunaLinkLogo} 
                  alt="LunaLink AI" 
                  className="h-12 w-auto"
                />
                <h1 className="text-3xl font-bold text-white">LunaLink AI</h1>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Recover Abandoned Carts & Automate Customer Service
                </h2>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-primary-glow to-luna-light bg-clip-text text-transparent">
                  with AI Sales Rep
                </h3>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Boost your sales and improve customer satisfaction with powerful AI voice and messaging agents that work 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-glow animate-glow-pulse"
                onClick={handleGetStarted}
                disabled={isStarting}
              >
                {isStarting ? "Starting..." : "Get Started"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-slate-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Enterprise Ready</span>
              </div>
            </div>
          </div>

          {/* Right Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 bg-gradient-glass backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-glow" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fade-in">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">500K+</div>
            <div className="text-slate-300">Calls Processed</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">98.5%</div>
            <div className="text-slate-300">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">24/7</div>
            <div className="text-slate-300">Always Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;