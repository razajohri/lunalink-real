export interface VapiCall {
  id: string;
  assistantId: string;
  customer?: {
    number: string;
    name?: string;
  };
  status: 'completed' | 'failed' | 'in-progress' | 'queued';
  startedAt: string;
  endedAt?: string;
  duration?: number;
  cost?: number;
  transcript?: string;
}

export interface VapiStats {
  totalCalls: number;
  successRate: number;
  totalCost: number;
  averageDuration: number;
  callsLast7Days: Array<{
    date: string;
    calls: number;
    recovered: number;
  }>;
}

export class VapiService {
  private apiKey: string;
  private baseUrl = 'https://api.vapi.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCalls(assistantId?: string): Promise<VapiCall[]> {
    try {
      const endpoint = assistantId ? `/call?assistantId=${assistantId}` : '/call';
      const data = await this.fetch(endpoint);
      return data || [];
    } catch (error) {
      console.error('Error fetching calls:', error);
      // Return mock data for demo
      return this.getMockCalls();
    }
  }

  async getStats(assistantId?: string): Promise<VapiStats> {
    try {
      const calls = await this.getCalls(assistantId);
      return this.calculateStats(calls);
    } catch (error) {
      console.error('Error calculating stats:', error);
      return this.getMockStats();
    }
  }

  private calculateStats(calls: VapiCall[]): VapiStats {
    const completedCalls = calls.filter(call => call.status === 'completed');
    const totalCalls = calls.length;
    const successRate = totalCalls > 0 ? (completedCalls.length / totalCalls) * 100 : 0;
    const totalCost = calls.reduce((sum, call) => sum + (call.cost || 0), 0);
    const averageDuration = completedCalls.length > 0 
      ? completedCalls.reduce((sum, call) => sum + (call.duration || 0), 0) / completedCalls.length 
      : 0;

    // Generate last 7 days data
    const callsLast7Days = this.generateLast7DaysData(calls);

    return {
      totalCalls,
      successRate: Math.round(successRate * 10) / 10,
      totalCost,
      averageDuration: Math.round(averageDuration),
      callsLast7Days
    };
  }

  private generateLast7DaysData(calls: VapiCall[]) {
    const last7Days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daysCalls = calls.filter(call => 
        call.startedAt.startsWith(dateStr)
      ).length;
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calls: daysCalls,
        recovered: Math.floor(daysCalls * 0.7) // Assume 70% recovery rate
      });
    }
    
    return last7Days;
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(4)}`;
  }

  // Mock data for demo purposes
  getMockCalls(): VapiCall[] {
    return [
      {
        id: '1',
        assistantId: 'cart-recovery',
        customer: { number: '+1234567890', name: 'John Smith' },
        status: 'completed',
        startedAt: '2024-01-15T10:30:00Z',
        endedAt: '2024-01-15T10:32:30Z',
        duration: 150,
        cost: 0.0125,
        transcript: 'Customer call transcript...'
      },
      {
        id: '2',
        assistantId: 'order-followup',
        customer: { number: '+1234567891', name: 'Sarah Johnson' },
        status: 'completed',
        startedAt: '2024-01-15T11:15:00Z',
        endedAt: '2024-01-15T11:17:45Z',
        duration: 165,
        cost: 0.0138
      },
      {
        id: '3',
        assistantId: 'cart-recovery',
        customer: { number: '+1234567892', name: 'Mike Davis' },
        status: 'failed',
        startedAt: '2024-01-15T12:00:00Z',
        cost: 0.0050
      }
    ];
  }

  getMockStats(): VapiStats {
    return {
      totalCalls: 333,
      successRate: 87.2,
      totalCost: 24.7831,
      averageDuration: 142,
      callsLast7Days: [
        { date: 'Jan 9', calls: 45, recovered: 32 },
        { date: 'Jan 10', calls: 52, recovered: 38 },
        { date: 'Jan 11', calls: 38, recovered: 25 },
        { date: 'Jan 12', calls: 61, recovered: 44 },
        { date: 'Jan 13', calls: 48, recovered: 35 },
        { date: 'Jan 14', calls: 55, recovered: 41 },
        { date: 'Jan 15', calls: 34, recovered: 27 }
      ]
    };
  }
}