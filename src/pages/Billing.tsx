import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Star, Crown, Zap } from "lucide-react";
import Layout from "@/components/Layout";

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState("starter");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 49,
      period: "month",
      description: "Perfect for small businesses getting started",
      features: [
        "500 minutes included",
        "Basic analytics",
        "Email support",
        "2 voice agents",
        "Standard voices"
      ],
      icon: Zap,
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      price: 149,
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "1,500 minutes included",
        "Advanced analytics",
        "Priority support",
        "10 voice agents",
        "Custom voice training",
        "SMS integration",
        "A/B testing"
      ],
      icon: Star,
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 399,
      period: "month",
      description: "For large-scale operations",
      features: [
        "5,000 minutes included",
        "Full analytics suite",
        "Dedicated support",
        "Unlimited voice agents",
        "White-label options",
        "API access",
        "Custom integrations",
        "Advanced reporting"
      ],
      icon: Crown,
      popular: false
    }
  ];

  const usageData = {
    minutesUsed: 'U/K',
    minutesIncluded: 'U/K',
    costThisMonth: 'U/K',
    callsThisMonth: 'U/K',
    billingCycle: 'U/K'
  };

  const recentTransactions = [
    { date: "2024-01-15", description: "Monthly Subscription - Starter Plan", amount: 49.00, status: "paid" },
    { date: "2024-01-10", description: "Additional Minutes (150 min)", amount: 12.75, status: "paid" },
    { date: "2023-12-15", description: "Monthly Subscription - Starter Plan", amount: 49.00, status: "paid" }
  ];

  const usagePercentage = (usageData.minutesUsed / usageData.minutesIncluded) * 100;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription plan and track usage across all voice agents.
          </p>
        </div>

        {/* Current Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Current Usage</h3>
              <Badge variant="secondary">{usageData.billingCycle}</Badge>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minutes Used</span>
                  <span className="font-medium">
                    {usageData.minutesUsed} / {usageData.minutesIncluded}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(100 - usagePercentage)}% remaining this cycle
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">${usageData.costThisMonth}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{usageData.callsThisMonth}</p>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Starter Plan</p>
                  <p className="text-sm text-muted-foreground">$49/month</p>
                </div>
                <Badge className="bg-success hover:bg-success/80">Active</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Next billing: Feb 15, 2024</p>
                <p className="text-sm text-muted-foreground">Your plan automatically renews</p>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Change Plan
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Cancel Plan
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Subscription Plans */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`p-6 space-y-6 relative transition-all duration-300 hover:shadow-elegant ${
                    plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
                  } ${currentPlan === plan.id ? 'ring-2 ring-success' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}

                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-foreground">
                        ${plan.price}
                        <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${currentPlan === plan.id ? 'bg-success hover:bg-success/90' : ''}`}
                    variant={currentPlan === plan.id ? 'default' : plan.popular ? 'default' : 'outline'}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : plan.popular ? 'Upgrade Now' : 'Select Plan'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Transaction History */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
              <Button variant="outline" size="sm">Download Invoice</Button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium text-foreground">${transaction.amount.toFixed(2)}</p>
                    <Badge variant={transaction.status === 'paid' ? 'default' : 'secondary'}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Usage Alerts */}
        <Card className="p-6 bg-warning/5 border-warning/20">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Usage Alert</h3>
            <p className="text-sm text-muted-foreground">
              You've used {Math.round(usagePercentage)}% of your monthly minutes.
              {usagePercentage > 80 && " Consider upgrading to avoid overage charges."}
            </p>
            {usagePercentage > 80 && (
              <Button size="sm" className="mt-2">Upgrade Plan</Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Billing;
