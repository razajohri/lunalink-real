import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Star, Crown, Zap, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useVapi } from "@/contexts/VapiContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 28.99,
      period: "month",
      description: "Perfect for small stores getting started",
      features: [
        "Cart recovery calls",
        "Customer service calls", 
        "45 calls per month",
        "Basic analytics",
        "Email support"
      ],
      calls: 45,
      icon: Zap,
      popular: false
    },
    {
      id: "growth",
      name: "Growth", 
      price: 70,
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "Cart recovery + customer service",
        "Order cancellation calls",
        "Order tracking via voice",
        "80 calls per month",
        "Advanced analytics",
        "Priority support"
      ],
      calls: 80,
      icon: Star,
      popular: true
    },
    {
      id: "pro",
      name: "Pro",
      price: 200,
      period: "month", 
      description: "For high-volume stores",
      features: [
        "All features included",
        "Order confirmation calls",
        "Follow-up campaigns",
        "Premium AI voices",
        "100+ calls per month",
        "Dedicated support",
        "Custom integrations"
      ],
      calls: 100,
      icon: Crown,
      popular: false
    }
  ];

  const [usageData, setUsageData] = useState({
    minutesUsed: 0,
    minutesIncluded: 0,
    costThisMonth: 0,
    callsThisMonth: 0,
    callsUsed: 0,
    callsLimit: 0
  });

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (data) {
        setCurrentPlan(data.subscription_tier);
        setUsageData(prev => ({
          ...prev,
          callsUsed: data.calls_used || 0,
          callsLimit: data.calls_limit || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const usagePercentage = usageData.callsLimit > 0 
    ? (usageData.callsUsed / usageData.callsLimit) * 100 
    : 0;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Boost your Shopify sales with AI-powered voice assistants that recover abandoned carts and provide stellar customer service.
          </p>
        </div>

        {/* Current Usage - Show only if user has a plan */}
        {currentPlan && (
          <Card className="p-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Current Usage</h3>
                <Badge variant="secondary" className="capitalize">{currentPlan} Plan</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Calls Used</span>
                  <span className="font-medium">
                    {usageData.callsUsed} / {usageData.callsLimit}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.max(0, usageData.callsLimit - usageData.callsUsed)} calls remaining this month
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`p-8 space-y-6 relative transition-all duration-300 hover:shadow-elegant ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                } ${isCurrentPlan ? 'ring-2 ring-success' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}

                {isCurrentPlan && (
                  <Badge className="absolute -top-3 right-4 bg-success">
                    Current Plan
                  </Badge>
                )}

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-foreground">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.calls} calls per month
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading || isCurrentPlan}
                  className={`w-full h-12 text-lg ${
                    isCurrentPlan 
                      ? 'bg-success hover:bg-success/90' 
                      : plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                  }`}
                  variant={isCurrentPlan ? 'default' : plan.popular ? 'default' : 'outline'}
                >
                  {isCurrentPlan ? (
                    'Current Plan'
                  ) : loading ? (
                    'Processing...'
                  ) : plan.id === 'basic' ? (
                    <>Start with Basic <ArrowRight className="w-4 h-4 ml-2" /></>
                  ) : plan.id === 'growth' ? (
                    <>Choose Growth <ArrowRight className="w-4 h-4 ml-2" /></>
                  ) : (
                    <>Go Pro <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Custom Solution CTA */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Need a Custom Solution?</h3>
            <p className="text-muted-foreground text-lg">
              Contact us for tailored AI tools designed specifically for your Shopify store's unique needs.
            </p>
            <Button variant="outline" size="lg" className="mt-4">
              Contact Sales Team
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Billing;