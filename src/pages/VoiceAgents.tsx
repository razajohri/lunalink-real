import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Phone, MessageSquare, Play, Pause, Edit, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { useVapi } from "@/contexts/VapiContext";

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'coming-soon';
  voice: string;
  trigger: string;
  phoneNumber: string;
  callCount: number;
  description: string;
}

const VoiceAgents = () => {
  const [showContactSales, setShowContactSales] = useState(false);
  const { service, isConfigured, credentials } = useVapi();

  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Cart Recovery Agent (🔥Trending) ',
      status: 'active now',
      voice: 'Professional Female',
      trigger: 'Cart Recovery (2 hours)',
      phoneNumber: 'US/UK/EU +15',
      callCount: 143,
      description: 'Reach out to customers who abandoned their shopping cart with a personalized call offering them a discount triggering them to complete their purchase.'
    },
    {
      id: '2',
      name: 'Order Follow-up',
      status: 'coming-soon',
      voice: 'Friendly Male',
      trigger: 'Post-Purchase (24 hours)',
      phoneNumber: 'US/UK/EU +15',
      callCount: 0,
      description: 'Follows up with customers after purchase to ensure satisfaction and gather feedback.'
    },
    {
      id: '3',
      name: 'Order Cancellation',
      status: 'coming-soon',
      voice: 'Empathetic Female',
      trigger: 'Cancellation Request',
      phoneNumber: 'US/UK/EU +15',
      callCount: 12,
      description: 'Handles customer cancellation requests with empathy and attempts to retain customers.'
    },
    {
      id: '4',
      name: 'Order Confirmation',
      status: 'coming-soon',
      voice: 'Professional Female',
      trigger: 'New Order (Immediate)',
      phoneNumber: 'US/UK/EU +15',
      callCount: 87,
      description: 'Confirms order details with customers immediately after purchase.'
    },
    {
      id: '5',
      name: 'Product Recommendation',
      status: 'coming-soon',
      voice: 'Enthusiastic Male',
      trigger: 'Browse Abandonment',
      phoneNumber: 'US/UK/EU +15',
      callCount: 35,
      description: 'Suggests related products to customers who browsed but did not purchase.'
    },
    {
      id: '6',
      name: 'Customer Service',
      status: 'active now',
      voice: 'Helpful Female',
      trigger: 'Support Request',
      phoneNumber: 'US/UK/EU/ +15',
      callCount: 56,
      description: 'Handles general customer service inquiries and support requests.'
    }
  ];

  const toggleAgentStatus = (agentId: string) => {
    // In real app, this would make an API call
    console.log(`Toggling status for agent ${agentId}`);
  };

  const testCall = (agentId: string) => {
    // In real app, this would initiate a test call
    console.log(`Testing call for agent ${agentId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Voice Agents</h1>
            <p className="text-muted-foreground">
              Manage your AI voice agents and SMS messaging campaigns.
            </p>
          </div>
          <Button
            onClick={() => setShowContactSales(true)}
            className="space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="voice-agents" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="voice-agents" className="space-x-2">
              <Phone className="w-4 h-4" />
              <span>Voice Agents</span>
            </TabsTrigger>
            <TabsTrigger value="sms-messaging" className="space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>SMS Messaging</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice-agents" className="space-y-6">
            <div className="text-center text-muted-foreground font-medium mb-2">
              No need for setup for Done for You users.
            </div>
            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockAgents.map((agent) => (
                <Card key={agent.id} className="p-6 space-y-4 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <Badge
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={agent.status === 'active' ? 'bg-success hover:bg-success/80' : agent.status === 'coming-soon' ? 'bg-warning/10 text-warning' : ''}
                      >
                        {agent.status === 'coming-soon' ? 'Coming Soon' : agent.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voice:</span>
                      <span className="font-medium">{agent.voice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trigger:</span>
                      <span className="font-medium">{agent.trigger}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{agent.phoneNumber}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 flex items-center justify-center bg-success/10 text-success hover:bg-success/20"
                      disabled
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Done for you
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sms-messaging" className="space-y-6">
            <Card className="p-8 text-center space-y-4">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">SMS Messaging <span className="text-primary">Coming Soon</span></h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Integrate with Twilio to send automated SMS messages for cart recovery and customer engagement.
                </p>
                <div className="text-sm text-muted-foreground font-medium mt-2">Coming Soon</div>
              </div>
              <Button variant="outline" disabled>
                Configure Twilio Integration
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Agent Modal */}
        <Dialog open={showContactSales} onOpenChange={setShowContactSales}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Sales</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center">
              <p className="text-lg">Please contact our sales team to create a custom AI voice agent for your business.</p>
              <a href="mailto:sales@yourdomain.com" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded">Email Sales</a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default VoiceAgents;
