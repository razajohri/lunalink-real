import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  Clock,
  BarChart,
  DollarSign,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ShopifyConnectionStatus from "@/components/ShopifyConnectionStatus";

const Sidebar = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Voice Agents", href: "/voice-agents", icon: Phone },
    { name: "Call Logs", href: "/call-logs", icon: Clock },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "My Shopify Brain", href: "/my-shopify-brain", icon: Sparkles },
    { name: "Billing", href: "/billing", icon: DollarSign },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-44 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <img
            src="/src/assets/lunalink-logo.jpg"
            alt="LunaLink AI"
            className="h-8 w-auto"
          />
          <div>
            <h1 className="font-bold text-foreground text-lg">LunaLink</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Shopify Connection Status */}
      <div className="p-4 border-t border-border space-y-3">
        <ShopifyConnectionStatus />

        {/* Sign Out Button */}
        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
