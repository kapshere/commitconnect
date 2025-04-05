
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ReligiousCommitment } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserTagsInput from "./UserTagsInput";
import { BookOpen, Users, Heart } from "lucide-react";

interface ReligiousCommitmentFormProps {
  onSubmit: (data: Partial<ReligiousCommitment>) => void;
}

const ReligiousCommitmentForm = ({ onSubmit }: ReligiousCommitmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [religion, setReligion] = useState("");
  const [deity, setDeity] = useState("");
  const [ritual, setRitual] = useState("");
  const [taggedUsers, setTaggedUsers] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);

  const religions = [
    "Hinduism", "Buddhism", "Jainism", "Sikhism", "Christianity", 
    "Islam", "Judaism", "Zoroastrianism", "Taoism", "Shinto", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !religion || !deity) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data for submission
    const religiousCommitment: Partial<ReligiousCommitment> = {
      type: "religious",
      title,
      description,
      religion,
      deity,
      ritual,
      parties: [
        {
          id: "current-user", // This would be replaced with actual user ID
          name: "You",
          role: "associated"
        },
        ...taggedUsers,
      ],
      status: "pending",
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // This would be replaced with actual user ID
    };

    onSubmit(religiousCommitment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <BookOpen className="h-12 w-12 mx-auto mb-2 text-connect-500" />
        <h2 className="text-xl font-semibold">Religious Commitment</h2>
        <p className="text-sm text-gray-500">Create a sacred commitment in accordance with your faith</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title of Commitment</Label>
        <Input
          id="title"
          placeholder="Enter a title for your religious commitment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your sacred commitment and its significance"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] glow-effect"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Select value={religion} onValueChange={setReligion}>
            <SelectTrigger className="glow-effect">
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent>
              {religions.map((rel) => (
                <SelectItem key={rel} value={rel}>{rel}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deity">Deity or Higher Power</Label>
          <Input
            id="deity"
            placeholder="Name the deity or higher power"
            value={deity}
            onChange={(e) => setDeity(e.target.value)}
            className="glow-effect"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ritual" className="flex items-center">
          <Heart className="h-4 w-4 mr-2 text-connect-500" />
          Ritual or Ceremony (Optional)
        </Label>
        <Textarea
          id="ritual"
          placeholder="Describe any ritual or ceremony associated with this commitment"
          value={ritual}
          onChange={(e) => setRitual(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Witnesses (Optional)
        </Label>
        <UserTagsInput 
          onTagsChange={setTaggedUsers} 
          className="glow-effect"
        />
        <p className="text-xs text-gray-500 mt-1">
          Add people who will witness or be informed about your commitment
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
          Make Sacred Commitment
        </Button>
      </div>
    </form>
  );
};

export default ReligiousCommitmentForm;
