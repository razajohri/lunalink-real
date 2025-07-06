import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const { signUp, signIn, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (showForgotPassword) {
        const { error } = await resetPassword(formData.email);
        
        if (error) {
          toast({
            title: "Reset Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Reset Email Sent!",
            description: "Check your email for password reset instructions.",
          });
          setShowForgotPassword(false);
        }
      } else if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Successfully logged in.",
          });
          navigate('/profile-setup');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
        
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account, then login.",
          });
          setIsLogin(true);
        }
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
                  {showForgotPassword 
                    ? 'Reset Password' 
                    : isLogin 
                      ? 'Welcome Back' 
                      : 'Get Started'
                  }
                </h2>
                <p className="text-slate-300">
                  {showForgotPassword
                    ? 'Enter your email to receive password reset instructions'
                    : isLogin 
                      ? 'Sign in to your account to continue' 
                      : 'Create your account to start using AI voice agents'
                  }
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !showForgotPassword && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>

              {!showForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                disabled={isLoading}
              >
                {isLoading 
                  ? (showForgotPassword 
                      ? 'Sending Reset Email...' 
                      : isLogin 
                        ? 'Signing In...' 
                        : 'Creating Account...')
                  : (showForgotPassword 
                      ? 'Send Reset Email' 
                      : isLogin 
                        ? 'Sign In' 
                        : 'Create Account')
                }
              </Button>
            </form>

            {/* Navigation */}
            <div className="text-center space-y-2">
              {isLogin && !showForgotPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-slate-300 hover:text-white hover:bg-white/10 text-sm"
                >
                  Forgot your password?
                </Button>
              )}
              
              {!showForgotPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </Button>
              )}
              
              {showForgotPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setIsLogin(true);
                  }}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Back to Sign In
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;