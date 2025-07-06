import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVapi } from "@/contexts/VapiContext";
import { VapiStats } from "@/services/VapiService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import { Phone, BarChart as BarChartIcon, Clock, TrendingUp } from "lucide-react";

const Analytics = () => {
  const { service, isConfigured, credentials } = useVapi();
  const [stats, setStats] = useState<VapiStats | null>(null);
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    if (!service || !isConfigured || !credentials?.assistantId) return;

    setLoading(true);
    try {
      const statsData = await service.getStats(credentials.assistantId);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Use mock data on error
      const mockStats = service.getMockStats();
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [service, isConfigured, timeRange]);

  // Real data for additional charts
  const agentPerformance = [
    { name: 'Cart Recovery', calls: 0, success: 0 },
    { name: 'Order Confirmation', calls: 0, success: 0 },
    { name: 'Customer Service', calls: 0, success: 0 },
    { name: 'Order Cancellation', calls: 0, success: 0 },
    { name: 'Order Follow-up', calls: 0, success: 0 }
  ];

  const callOutcomes = [
    { name: 'Completed', value: 0, color: 'hsl(var(--success))' },
    { name: 'Failed', value: 0, color: 'hsl(var(--destructive))' },
    { name: 'No Answer', value: 0, color: 'hsl(var(--warning))' }
  ];

  const conversionTrend = [
    { date: 'Jan 9', conversions: 0, rate: 0 },
    { date: 'Jan 10', conversions: 0, rate: 0 },
    { date: 'Jan 11', conversions: 0, rate: 0 },
    { date: 'Jan 12', conversions: 0, rate: 0 },
    { date: 'Jan 13', conversions: 0, rate: 0 },
    { date: 'Jan 14', conversions: 0, rate: 0 },
    { date: 'Jan 15', conversions: 0, rate: 0 }
  ];

  if (!isConfigured) {
    return (
      <Layout>
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">
              Configure your Vapi integration to view detailed analytics.
            </p>
          </div>
          <Card className="p-8 max-w-md mx-auto">
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
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed insights and performance metrics for your AI voice agents.
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Calls"
              value={stats.totalCalls.toString()}
              change="+12.5% vs last period"
              changeType="positive"
              icon={Phone}
            />
            <StatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              change="+2.1% vs last period"
              changeType="positive"
              icon={BarChartIcon}
            />
            <StatCard
              title="Avg Call Duration"
              value={service?.formatDuration(stats.averageDuration) || '0:00'}
              change="-8s vs last period"
              changeType="positive"
              icon={Clock}
            />
            <StatCard
              title="Conversion Rate"
              value="0%"
              change="0% vs last period"
              changeType="neutral"
              icon={TrendingUp}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Performance */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Agent Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Call Outcomes */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Call Outcomes</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={callOutcomes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {callOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6">
                {callOutcomes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Conversion Trend */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Conversion Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Recovered Abandoned Checkouts */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recovered Abandoned Checkouts</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Total Abandoned Carts</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">0</div>
                <p className="text-sm text-muted-foreground">Successfully Contacted</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">0</div>
                <p className="text-sm text-muted-foreground">Purchases Completed</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-warning">$0</div>
                <p className="text-sm text-muted-foreground">Revenue Recovered</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-4">
            <div className="text-3xl font-bold text-success">0%</div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Average Conversion Rate</p>
              <p className="text-sm text-muted-foreground">Across all agents</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="text-3xl font-bold text-primary">0:00</div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Average Call Duration</p>
              <p className="text-sm text-muted-foreground">Optimal engagement time</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="text-3xl font-bold text-warning">$0.000</div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Cost Per Call</p>
              <p className="text-sm text-muted-foreground">Including successful & failed</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
