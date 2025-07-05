import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AgentConfig {
  name: string;
  voice: string;
  personality: string;
  trigger: string;
  triggerDelay: string;
  phoneNumber: string;
  script: string;
}

const CreateAgentModal = ({ open, onOpenChange }: CreateAgentModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<AgentConfig>({
    name: '',
    voice: '',
    personality: '',
    trigger: '',
    triggerDelay: '',
    phoneNumber: '',
    script: ''
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const triggerTemplates = {
    'abandoned-cart': "Hi {customer_name}, I noticed you left some great items in your cart. Would you like help completing your purchase?",
    'order-followup': "Hi {customer_name}, thanks for your recent order! I wanted to make sure everything arrived as expected.",
    'order-cancellation': "Hi {customer_name}, I understand you'd like to cancel your order. Let me help you with that and see if there's anything else I can do.",
    'order-confirmation': "Hi {customer_name}, I'm calling to confirm your recent order. Let me go over the details with you.",
    'product-recommendation': "Hi {customer_name}, I noticed you were looking at some products earlier. I have some recommendations that might interest you.",
    'customer-service': "Hi {customer_name}, I'm here to help with any questions or concerns you might have about your experience with us."
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTriggerChange = (trigger: string) => {
    setConfig(prev => ({
      ...prev,
      trigger,
      script: triggerTemplates[trigger as keyof typeof triggerTemplates] || ''
    }));
  };

  const handleCreate = () => {
    // In real app, this would create the agent via API
    toast({
      title: "Agent Created Successfully",
      description: `${config.name} has been created and is ready to start making calls.`
    });
    onOpenChange(false);
    // Reset form
    setCurrentStep(1);
    setConfig({
      name: '',
      voice: '',
      personality: '',
      trigger: '',
      triggerDelay: '',
      phoneNumber: '',
      script: ''
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                placeholder="e.g., Cart Recovery Agent"
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice-type">Voice Type</Label>
              <Select value={config.voice} onValueChange={(value) => setConfig(prev => ({ ...prev, voice: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional-female">Professional Female</SelectItem>
                  <SelectItem value="professional-male">Professional Male</SelectItem>
                  <SelectItem value="friendly-female">Friendly Female</SelectItem>
                  <SelectItem value="friendly-male">Friendly Male</SelectItem>
                  <SelectItem value="empathetic-female">Empathetic Female</SelectItem>
                  <SelectItem value="enthusiastic-male">Enthusiastic Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="personality">Personality</Label>
              <Select value={config.personality} onValueChange={(value) => setConfig(prev => ({ ...prev, personality: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="helpful">Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Condition</Label>
              <Select value={config.trigger} onValueChange={handleTriggerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abandoned-cart">Abandoned Cart</SelectItem>
                  <SelectItem value="order-followup">Order Follow-up</SelectItem>
                  <SelectItem value="order-cancellation">Order Cancellation</SelectItem>
                  <SelectItem value="order-confirmation">Order Confirmation</SelectItem>
                  <SelectItem value="product-recommendation">Product Recommendation</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trigger-delay">Trigger Delay</Label>
              <Select value={config.triggerDelay} onValueChange={(value) => setConfig(prev => ({ ...prev, triggerDelay: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="30-minutes">30 minutes</SelectItem>
                  <SelectItem value="1-hour">1 hour</SelectItem>
                  <SelectItem value="2-hours">2 hours</SelectItem>
                  <SelectItem value="4-hours">4 hours</SelectItem>
                  <SelectItem value="24-hours">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="+1 (555) 123-4567"
                value={config.phoneNumber}
                onChange={(e) => setConfig(prev => ({ ...prev, phoneNumber: e.target.value }))}
              />
              <p className="text-sm text-muted-foreground">
                This number will be used to make outbound calls.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="script">Call Script</Label>
              <Textarea
                id="script"
                placeholder="Enter your custom script..."
                rows={6}
                value={config.script}
                onChange={(e) => setConfig(prev => ({ ...prev, script: e.target.value }))}
              />
              <p className="text-sm text-muted-foreground">
                Use {'{customer_name}'} to personalize the message. The script above was auto-generated based on your trigger selection.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Review Configuration</h3>
            <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agent Name</p>
                  <p className="font-medium">{config.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Voice</p>
                  <p className="font-medium">{config.voice}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trigger</p>
                  <p className="font-medium">{config.trigger}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{config.phoneNumber}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Script Preview</p>
                <p className="text-sm bg-background p-3 rounded border italic">
                  {config.script}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Name Your Agent",
    "Choose Voice & Personality",
    "Set Trigger Conditions",
    "Configure Phone Number",
    "Customize Script",
    "Review & Confirm"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Voice Agent</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-lg font-semibold text-foreground">
              {stepTitles[currentStep - 1]}
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-64">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button onClick={handleCreate}>
                Create Agent
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentModal;