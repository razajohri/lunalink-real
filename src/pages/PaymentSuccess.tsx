import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Trigger subscription check after successful payment
    if (user) {
      supabase.functions.invoke('check-subscription');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-elegant">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Congratulations!
            </h1>
            <p className="text-muted-foreground">
              Payment successfully completed
            </p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Activation in Progress</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Your AI assistant will be activated and you will receive your credentials within 48 hours through email.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-xs">Check your inbox for updates</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <a href="/dashboard">
              Go to Dashboard
            </a>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <a href="/billing">
              View Billing Details
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;