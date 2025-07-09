import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVapi } from "@/contexts/VapiContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "@/components/StatCard";
import CallPerformanceChart from "@/components/CallPerformanceChart";
import { Phone, BarChart, DollarSign, Clock, RefreshCw, Crown, Star, Zap, Settings } from "lucide-react";
import { VapiStats, VapiCall } from "@/services/VapiService";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const { service, isConfigured, credentials } = useVapi();
  const { toast } = useToast();
  const { user } = useAuth();
  const [stats, setStats] = useState<VapiStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{
    subscribed: boolean;
    subscription_tier: string | null;
    calls_limit: number;
    calls_used: number;
  }>({
    subscribed: false,
    subscription_tier: null,
    calls_limit: 0,
    calls_used: 0
  });

  const fetchData = async () => {
    if (!service || !isConfigured) return;

    setLoading(true);
    try {
      const [statsData, callsData] = await Promise.all([
        service.getStats(credentials?.assistantId),
        service.getCalls(credentials?.assistantId)
      ]);

      setStats(statsData);
      setRecentCalls(callsData.slice(0, 5)); // Show latest 5 calls

      toast({
        title: "Data refreshed",
        description: "Dashboard data has been updated successfully.",
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error fetching data",
        description: "Using demo data for preview.",
        variant: "destructive"
      });

      // Load mock data on error
      const mockStats = service?.getMockStats?.() || {
        totalCalls: 333,
        successRate: 87.2,
        totalCost: 24.7831,
        averageDuration: 142,
        callsLast7Days: []
      };
      const mockCalls = service?.getMockCalls?.() || [];

      setStats(mockStats);
      setRecentCalls(mockCalls.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;

      if (data) {
        setSubscriptionData({
          subscribed: data.subscribed || false,
          subscription_tier: data.subscription_tier,
          calls_limit: data.calls_limit || 0,
          calls_used: data.calls_used || 0
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management portal.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchData();
    if (user) {
      checkSubscription();
    }
  }, [service, isConfigured, user]);

  // Handle success redirect from Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const plan = urlParams.get('plan');

    if (success === 'true' && plan) {
      toast({
        title: "Payment Successful! 🎉",
        description: `You are now subscribed to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
      });

      // Remove URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);

      // Refresh subscription data
      setTimeout(() => {
        checkSubscription();
      }, 2000);
    }
  }, []);

  const getPlanIcon = (tier: string | null) => {
    switch (tier) {
      case 'basic': return Zap;
      case 'growth': return Star;
      case 'pro': return Crown;
      default: return Phone;
    }
  };

  const getPlanColor = (tier: string | null) => {
    switch (tier) {
      case 'basic': return 'bg-blue-500';
      case 'growth': return 'bg-primary';
      case 'pro': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const callsUsagePercentage = subscriptionData.calls_limit > 0
    ? (subscriptionData.calls_used / subscriptionData.calls_limit) * 100
    : 0;

  if (!isConfigured) {
    return (
      <Layout>
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">🚀 Unlock Your AI Assistant</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instantly connect your voice agents and get full dashboard access to start saving hours per day — or your competitors will.
            </p>
          </div>
          <Card className="p-8 max-w-lg mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <span className="text-2xl">⚠️</span>
                <p className="font-semibold">Plans Are Required to Activate Your Assistant</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Go to Settings now to choose your plan and grab your access credentials before your setup stalls.
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <a href="/settings">
                  🔥 Get Started Instantly → Configure Now
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Header with Subscription Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your AI voice assistant performance, call analytics, and subscription.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Subscription Status */}
              {subscriptionData.subscribed && subscriptionData.subscription_tier && (
                <Card className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const PlanIcon = getPlanIcon(subscriptionData.subscription_tier);
                      return <PlanIcon className="w-5 h-5 text-primary" />;
                    })()}
                    <div className="text-sm">
                      <p className="font-semibold capitalize">{subscriptionData.subscription_tier} Plan</p>
                      <p className="text-muted-foreground">
                        {subscriptionData.calls_used}/{subscriptionData.calls_limit} calls
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <Button
                onClick={fetchData}
                disabled={loading}
                className="space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </Button>
            </div>
          </div>

          {/* Subscription Management */}
          {subscriptionData.subscribed ? (
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Subscription Status</h3>
                  <div className="flex items-center space-x-4">
                    <Badge variant="default" className="capitalize">
                      {subscriptionData.subscription_tier} Plan Active
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {subscriptionData.calls_used} of {subscriptionData.calls_limit} calls used this month
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPlanColor(subscriptionData.subscription_tier)}`}
                      style={{ width: `${Math.min(callsUsagePercentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleManageSubscription}>
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                  <Button asChild>
                    <a href="/billing">Upgrade Plan</a>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Get Started with LunaLink AI</h3>
                  <p className="text-muted-foreground">
                    Choose a plan to start using AI voice agents for your Shopify store.
                  </p>
                </div>
                <Button asChild>
                  <a href="/billing">View Pricing Plans</a>
                </Button>
              </div>
            </Card>
          )}

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Calls"
                value={stats.totalCalls.toString()}
                change="+12.5% from last week"
                changeType="positive"
                icon={Phone}
              />
              <StatCard
                title="Success Rate"
                value={`${stats.successRate}%`}
                change="+2.1% from last week"
                changeType="positive"
                icon={BarChart}
                description="Calls completed successfully"
              />
              <StatCard
                title="Total Cost"
                value={service?.formatCurrency(stats.totalCost) || '$0.0000'}
                change="$0.0743 avg per call"
                changeType="neutral"
                icon={DollarSign}
              />
              <StatCard
                title="Avg Call Duration"
                value={service?.formatDuration(stats.averageDuration) || '0:00'}
                change="-8s from last week"
                changeType="positive"
                icon={Clock}
              />
            </div>
          )}

          {/* Call Performance Chart */}
          {stats && (
            <CallPerformanceChart data={stats.callsLast7Days} />
          )}

          {/* Calling Abandoned Checkouts */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Calling Abandoned Checkouts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <p className="text-sm text-muted-foreground">Abandoned Carts Called</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-success">0</div>
                  <p className="text-sm text-muted-foreground">Successfully Recovered</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-warning">$0</div>
                  <p className="text-sm text-muted-foreground">Revenue Recovered</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Cancelled Orders & Customer Issues */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Cancelled Orders</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-medium">0 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recovery Attempts</span>
                    <span className="font-medium">0 calls made</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Successful Saves</span>
                    <span className="font-medium text-success">0 orders</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Customer Issues</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Support Calls</span>
                    <span className="font-medium">0 this week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Resolution Time</span>
                    <span className="font-medium">0m 0s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Satisfaction Rate</span>
                    <span className="font-medium text-success">0%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Calls */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Calls</h3>

              <div className="space-y-3">
                {recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">
                          {call.customer?.name || 'Unknown Customer'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {call.customer?.number}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={call.status === 'completed' ? 'default' :
                                call.status === 'failed' ? 'destructive' : 'secondary'}
                      >
                        {call.status}
                      </Badge>

                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">
                          {call.duration ? service?.formatDuration(call.duration) : 'N/A'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {call.cost ? service?.formatCurrency(call.cost) : 'N/A'}
                        </p>
                      </div>

                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  View All Call Logs
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
