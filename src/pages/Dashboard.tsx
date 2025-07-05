import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVapi } from "@/contexts/VapiContext";
import { useToast } from "@/hooks/use-toast";
import StatCard from "@/components/StatCard";
import CallPerformanceChart from "@/components/CallPerformanceChart";
import { Phone, BarChart, DollarSign, Clock, RefreshCw } from "lucide-react";
import { VapiStats, VapiCall } from "@/services/VapiService";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const { service, isConfigured } = useVapi();
  const { toast } = useToast();
  const [stats, setStats] = useState<VapiStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!service || !isConfigured) return;
    
    setLoading(true);
    try {
      const [statsData, callsData] = await Promise.all([
        service.getStats(),
        service.getCalls()
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

  useEffect(() => {
    fetchData();
  }, [service, isConfigured]);

  if (!isConfigured) {
    return (
      <Layout>
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Configure Vapi Integration</h1>
            <p className="text-muted-foreground">
              Connect your Vapi account to start managing voice agents and viewing call analytics.
            </p>
          </div>
          <Card className="p-8 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              Go to Settings to configure your Vapi API credentials and assistant ID.
            </p>
            <Button asChild>
              <a href="/settings">Configure Now</a>
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your AI voice assistant performance and call analytics.
            </p>
          </div>
          <Button 
            onClick={fetchData} 
            disabled={loading}
            className="space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </Button>
        </div>

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
  );
};

export default Dashboard;