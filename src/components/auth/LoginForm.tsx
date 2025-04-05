
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Phone, Facebook, Twitter, Linkedin, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message?.includes("Invalid login credentials")) {
        setErrorMessage("Invalid email or password. Please check your credentials and try again.");
      } else {
        setErrorMessage(error.message || "An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpSent) {
      toast({
        title: "Feature not implemented",
        description: "Phone verification is not yet implemented",
      });
    } else {
      toast({
        title: "Feature not implemented",
        description: "Phone verification is not yet implemented",
      });
      // For demo purposes, we'll simulate OTP being sent
      setIsOtpSent(true);
    }
  };

  const handleSocialLogin = async (provider: "facebook" | "twitter" | "linkedin") => {
    setErrorMessage(null);
    try {
      await signInWithProvider(provider);
      // Navigation will be handled by the callback component
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      setErrorMessage(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in to Connect</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred login method
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-connect-500 hover:text-connect-600">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-connect-500 hover:bg-connect-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="phone">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isOtpSent}
                  />
                </div>
              </div>
              
              {isOtpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full bg-connect-500 hover:bg-connect-600">
                {isOtpSent ? "Verify Code" : "Send Verification Code"}
              </Button>
              
              {isOtpSent && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOtpSent(false)} 
                  className="w-full mt-2"
                >
                  Change Phone Number
                </Button>
              )}
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSocialLogin("facebook")}
            className="w-full"
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSocialLogin("twitter")}
            className="w-full"
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSocialLogin("linkedin")}
            className="w-full"
          >
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-connect-500 hover:text-connect-600 font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
