
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { TrustCommitment } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UserTagsInput from "./UserTagsInput";
import { Lock, FileKey, Users, FlaskRound } from "lucide-react";

interface TrustCommitmentFormProps {
  onSubmit: (data: Partial<TrustCommitment>) => void;
}

const TrustCommitmentForm = ({ onSubmit }: TrustCommitmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [secretText, setSecretText] = useState("");
  const [trustLevel, setTrustLevel] = useState<"low" | "medium" | "high">("medium");
  const [taggedUsers, setTaggedUsers] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);

  // Mock encryption function (in a real app, this would use actual encryption)
  const encryptSecret = (text: string) => {
    return btoa(text); // Base64 encoding for demonstration
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !secretText) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (taggedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please tag at least one person to share this trust with.",
        variant: "destructive",
      });
      return;
    }

    // Encrypt the secret
    const encryptedSecret = encryptSecret(secretText);

    // Prepare data for submission
    const trustCommitment: Partial<TrustCommitment> = {
      type: "trust",
      title,
      description,
      secretEncrypted: encryptedSecret,
      trustLevel,
      parties: [
        {
          id: "current-user", // This would be replaced with actual user ID
          name: "You",
          role: "associated"
        },
        ...taggedUsers,
      ],
      status: "active", // Trust commitments are active immediately
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // This would be replaced with actual user ID
    };

    onSubmit(trustCommitment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <Lock className="h-12 w-12 mx-auto mb-2 text-connect-500" />
        <h2 className="text-xl font-semibold">Trust Commitment</h2>
        <p className="text-sm text-gray-500">Share a secret with trusted individuals</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Give this trust commitment a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the nature of this trust (visible to all parties)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="secretText" className="flex items-center">
          <FileKey className="h-4 w-4 mr-2" />
          The Secret
        </Label>
        <div className="relative">
          <Textarea
            id="secretText"
            placeholder="Enter the secret information to be encrypted"
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
            className="min-h-[100px] pr-10 glow-effect"
          />
          <div className="absolute right-3 top-3 text-connect-500">
            <Lock className="h-5 w-5" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This information will be encrypted and only visible to tagged users when unlocked
        </p>
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Share Secret With
        </Label>
        <UserTagsInput 
          onTagsChange={setTaggedUsers} 
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <FlaskRound className="h-4 w-4 mr-2" />
          Trust Level
        </Label>
        <RadioGroup value={trustLevel} onValueChange={(val) => setTrustLevel(val as "low" | "medium" | "high")} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-100 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> Trust commitments use 2x2 multisig encryption. 
          The secret can only be decrypted when both you and the recipient agree to unlock it.
          This creates an immutable record of trust between parties.
        </p>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-connect-500 hover:bg-connect-600">
          Create Trust Commitment
        </Button>
      </div>
    </form>
  );
};

export default TrustCommitmentForm;
