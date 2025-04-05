
import { useState } from "react";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const PhoneLoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default PhoneLoginForm;
