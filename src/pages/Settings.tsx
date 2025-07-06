import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import VapiConfig from "@/components/VapiConfig";
import Layout from "@/components/Layout";
import { Settings as SettingsIcon, Bell, Clock, Store } from "lucide-react";
import { useVapi } from "@/hooks/use-vapi";

const Settings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "My E-commerce Store",
    timeZone: "ET"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    dailySummary: true,
    notificationEmail: "admin@mystore.com"
  });

  const [callSettings, setCallSettings] = useState({
    retryFailedCalls: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    maxCallsPerHour: 50
  });

  const { service, isConfigured, credentials } = useVapi();

  const handleSaveGeneral = () => {
    // In real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully."
    });
  };

  const handleSaveCallSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Call settings have been updated successfully."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure your LunaLink AI dashboard and voice agent preferences.
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="vapi" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="vapi" className="space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Vapi</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="space-x-2">
              <Store className="w-4 h-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="space-x-2">
              <Clock className="w-4 h-4" />
              <span>Calls</span>
            </TabsTrigger>
          </TabsList>

          {/* Vapi Configuration */}
          <TabsContent value="vapi">
            <VapiConfig />
          </TabsContent>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Basic configuration for your store and account preferences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    placeholder="Enter your store name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select
                    value={generalSettings.timeZone}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timeZone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PT">Pacific Time (PT)</SelectItem>
                      <SelectItem value="MT">Mountain Time (MT)</SelectItem>
                      <SelectItem value="CT">Central Time (CT)</SelectItem>
                      <SelectItem value="ET">Eastern Time (ET)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how and when you receive notifications about your voice agents.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email alerts for important events
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Daily Summary Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get daily performance summaries via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailySummary}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, dailySummary: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    value={notificationSettings.notificationEmail}
                    onChange={(e) =>
                      setNotificationSettings(prev => ({ ...prev, notificationEmail: e.target.value }))
                    }
                    placeholder="Enter notification email address"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveNotifications}>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Call Settings */}
          <TabsContent value="calls" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Call Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure voice agent behavior and call management preferences.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Retry Failed Calls</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically retry failed calls after a delay
                    </p>
                  </div>
                  <Switch
                    checked={callSettings.retryFailedCalls}
                    onCheckedChange={(checked) =>
                      setCallSettings(prev => ({ ...prev, retryFailedCalls: checked }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      value={callSettings.quietHoursStart}
                      onChange={(e) =>
                        setCallSettings(prev => ({ ...prev, quietHoursStart: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">Quiet Hours End</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      value={callSettings.quietHoursEnd}
                      onChange={(e) =>
                        setCallSettings(prev => ({ ...prev, quietHoursEnd: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-calls">Max Calls Per Hour</Label>
                  <Input
                    id="max-calls"
                    type="number"
                    value={callSettings.maxCallsPerHour}
                    onChange={(e) =>
                      setCallSettings(prev => ({ ...prev, maxCallsPerHour: parseInt(e.target.value) || 0 }))
                    }
                    placeholder="Maximum calls per hour"
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a limit to avoid overwhelming customers
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveCallSettings}>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
