import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  date: string;
  calls: number;
  recovered: number;
}

interface CallPerformanceChartProps {
  data: ChartData[];
}

const CallPerformanceChart = ({ data }: CallPerformanceChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Call Performance</h3>
          <p className="text-sm text-muted-foreground">
            Calls made and carts recovered over the last 7 days
          </p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary-glow))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="hsl(var(--primary-glow))"
                fillOpacity={1}
                fill="url(#callsGradient)"
                name="Calls Made"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="recovered"
                stroke="hsl(var(--success))"
                fillOpacity={1}
                fill="url(#recoveredGradient)"
                name="Carts Recovered"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default CallPerformanceChart;