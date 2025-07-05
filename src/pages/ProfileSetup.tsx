import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    phone: '',
  });

  const { user, updateProfile, getProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if profile already has additional info
    const checkProfile = async () => {
      const { data, error } = await getProfile();
      if (!error && data && (data.company || data.phone)) {
        // Profile already completed, redirect to dashboard
        navigate('/dashboard');
      }
    };

    checkProfile();
  }, [user, navigate, getProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Updated!",
          description: "Welcome to LunaLink AI Dashboard.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card className="p-8 bg-gradient-glass backdrop-blur-md border-white/10 shadow-card">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <img 
                  src="/lovable-uploads/4724f8bd-cc0b-401b-80fe-9f041d72c595.png" 
                  alt="LunaLink AI" 
                  className="h-10 w-auto"
                />
                <h1 className="text-2xl font-bold text-white">LunaLink AI</h1>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  Complete Your Profile
                </h2>
                <p className="text-slate-300">
                  Tell us a bit more about yourself to get the best experience
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-200">Company (Optional)</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating Profile...' : 'Complete Profile'}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSkip}
                  className="w-full text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Skip for Now
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;