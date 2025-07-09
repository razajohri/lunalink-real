import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Star, Crown, Zap, CheckCircle } from "lucide-react";
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
        "45 calls per month",
        "Email support",
        "Free phone number",
        "English language"
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
        "80 calls per month",
        "Advanced analytics",
        "Free phone number",
        "6+ languages"
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
        "Premium AI voices",
        "100+ calls per month",
        "Custom integrations",
        "Free phone number",
        "30+ languages"
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
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Activate AI voice. Recover carts. Boost sales. Right now.
          </p>
        </div>

        {/* Current Subscription Status */}
        {currentPlan && (
          <Card className="p-4 max-w-xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <h3 className="text-lg font-semibold text-foreground">
                  You currently have the {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} package
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your subscription is active and ready to use
              </p>
            </div>
          </Card>
        )}

        {/* Current Usage - Show only if user has a plan */}
        {currentPlan && (
          <Card className="p-3 max-w-xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">Current Usage</h3>
                <Badge variant="secondary" className="capitalize">{currentPlan} Plan</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Calls Used</span>
                  <span className="font-medium">
                    {usageData.callsUsed} / {usageData.callsLimit}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {Math.max(0, usageData.callsLimit - usageData.callsUsed)} calls remaining this month
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`p-4 space-y-4 relative transition-all duration-300 hover:shadow-elegant ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                } ${isCurrentPlan ? 'ring-2 ring-success' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-xs px-2 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      ${plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-success flex-shrink-0" />
                      <span className="text-xs text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-1 text-sm ${isCurrentPlan ? 'bg-success hover:bg-success/90' : ''}`}
                  variant={isCurrentPlan ? 'default' : plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan || loading}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.popular ? 'Upgrade Now' : 'Select Plan'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Custom Solution CTA */}
        <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">Need a Custom Solution?</h3>
            <p className="text-muted-foreground text-base">
              Contact us for tailored AI tools designed specifically for your Shopify store's unique needs.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Contact Sales Team
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Billing;
