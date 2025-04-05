
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SocialLoginButtonsProps {
  onError: (message: string) => void;
}

const SocialLoginButtons = ({ onError }: SocialLoginButtonsProps) => {
  const { signInWithProvider } = useAuth();

  const handleSocialLogin = async (provider: "facebook" | "twitter" | "linkedin") => {
    try {
      await signInWithProvider(provider);
      // Navigation will be handled by the callback component
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      onError(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
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
  );
};

export default SocialLoginButtons;
