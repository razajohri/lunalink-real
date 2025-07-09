import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Sparkles, MessageCircle, BarChart2, Zap, Lock, Share2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const quickStats = [
  { label: "Today's Sales", value: "$1,250", icon: BarChart2 },
  { label: "Open Orders", value: "17", icon: MessageCircle },
  { label: "Refund Requests", value: "2", icon: Zap },
];

const suggestedActions = [
  "Cancel Order #1001",
  "Send Abandoned Cart Reminder",
  "Get Inventory Report",
  "Generate Sales Report",
  "Generate a report of yesterday's sales",
];

const exampleMessages = [
  {
    role: "user",
    content: "What are today’s orders?"
  },
  {
    role: "assistant",
    content: "You have 17 open orders today. Total sales: $1,250."
  },
  {
    role: "user",
    content: "Cancel order #1001"
  },
  {
    role: "assistant",
    content: "Order #1001 has been cancelled."
  },
  {
    role: "user",
    content: "Generate a report of yesterday's sales."
  },
  {
    role: "assistant",
    content: "Here's your sales report for yesterday: 12 orders, $980 in revenue."
  }
];

const MyShopifyBrain = () => {
  const [input, setInput] = useState("");
  const [showBetaDialog, setShowBetaDialog] = useState(false);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex flex-col md:flex-row gap-8 mt-10 max-w-7xl mx-auto">
          {/* Left: Info & Actions */}
          <div className="flex-1 space-y-6 min-w-[320px]">
            <div className="space-y-2">
              <Badge variant="outline" className="text-primary border-primary bg-primary/10 font-semibold">
                <Lock className="w-4 h-4 mr-1 inline" /> Coming Soon – Beta Access
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                🧠 My Shopify Brain – Talk to Your Store Like ChatGPT
              </h1>
              <p className="text-muted-foreground text-base max-w-lg">
                Meet My Shopify Brain. Chat with your Shopify store, get live stats, and automate actions—all in one place.
              </p>
            </div>

            {/* Social Media Automation Section */}
            <Card className="p-4 flex items-center gap-4 bg-gradient-to-br from-primary/5 to-primary/10">
              <Share2 className="w-6 h-6 text-primary" />
              <div className="text-sm text-foreground">
                <span className="font-semibold">Social Media Automation:</span> Create and upload content on all socials at once. Automate social media content creation and scheduling for your store.
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickStats.map((stat) => (
                <Card key={stat.label} className="p-4 flex flex-col items-center bg-gradient-to-br from-primary/5 to-primary/10">
                  <stat.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Suggested Actions */}
            <div className="space-y-2">
              <div className="font-semibold text-foreground">Suggested Actions</div>
              <div className="flex flex-wrap gap-2">
                {suggestedActions.map((action, i) => (
                  <Button key={i} variant="outline" size="sm" className="rounded-full px-3 py-1 text-xs">
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Waitlist CTA */}
            <div className="pt-2">
              <Dialog open={showBetaDialog} onOpenChange={setShowBetaDialog}>
                <DialogTrigger asChild>
                  <Button variant="default" className="w-full md:w-auto bg-gradient-to-r from-primary to-blue-500 text-white font-semibold" onClick={() => setShowBetaDialog(true)}>
                    Join Beta Waitlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md text-center">
                  <DialogHeader>
                    <DialogTitle>Beta Access</DialogTitle>
                  </DialogHeader>
                  <p className="text-base text-foreground mb-4">Contact <a href="mailto:customer.lunalinkai@gmail.com" className="text-primary underline">customer.lunalinkai@gmail.com</a> for beta access.</p>
                  <Button variant="outline" onClick={() => setShowBetaDialog(false)} className="w-full">Close</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Right: Chat UI */}
          <div className="flex-1 max-w-xl w-full mx-auto">
            <Card className="p-6 flex flex-col h-[500px] bg-background/80 shadow-elegant">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">My Shopify Brain (Preview)</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {exampleMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <form className="flex items-center gap-2 mt-auto">
                <Input
                  className="flex-1 rounded-full bg-background border border-muted-foreground/20"
                  placeholder="Ask your store anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled
                />
                <Button type="submit" disabled>
                  Send
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default MyShopifyBrain;
