import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVapi } from "@/contexts/VapiContext";
import { useToast } from "@/hooks/use-toast";
import { Save, Key, Info } from "lucide-react";

const VapiConfig = () => {
  const { credentials, setCredentials, isConfigured } = useVapi();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    apiKey: credentials?.apiKey || '',
    assistantId: credentials?.assistantId || ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.apiKey.trim() || !formData.assistantId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both API key and Assistant ID.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      // In a real app, you might want to validate the credentials here
      setCredentials({
        apiKey: formData.apiKey.trim(),
        assistantId: formData.assistantId.trim()
      });
      
      toast({
        title: "Configuration Saved",
        description: "Your Vapi credentials have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI Employee Configuration</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Subscribe to a plan to get your credentials and start calling abandoned checkouts.
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> You're using your private API key for dashboard operations. 
            This gives you full access to view calls, agents, and analytics. Keep your credentials secure.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="api-key">Private API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Vapi private API key"
              value={formData.apiKey}
              onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistant-id">Assistant ID</Label>
            <Input
              id="assistant-id"
              placeholder="Enter your default assistant ID"
              value={formData.assistantId}
              onChange={(e) => setFormData(prev => ({ ...prev, assistantId: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">
              The ID of your primary voice assistant to use for analytics and management.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            {isConfigured ? (
              <span className="text-success font-medium">✓ Configuration saved</span>
            ) : (
              <span className="text-muted-foreground">Configuration not saved</span>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Getting Started</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Select your pricing & sign up to a plan</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Get your custom voice agent</p>
              <p>Our team will create an ecommerce custom voice agent for you and send you the credentials.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Add credentials to access your dashboard</p>
              <p>Enter your credentials above to start managing your voice agents and viewing analytics.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VapiConfig;