
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FriendlyCommitment } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserTagsInput from "./UserTagsInput";
import { Heart, Users, Calendar } from "lucide-react";

interface FriendlyCommitmentFormProps {
  onSubmit: (data: Partial<FriendlyCommitment>) => void;
}

const FriendlyCommitmentForm = ({ onSubmit }: FriendlyCommitmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [occasion, setOccasion] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taggedUsers, setTaggedUsers] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title for your commitment.",
        variant: "destructive",
      });
      return;
    }

    if (taggedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please tag at least one friend for this commitment.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data for submission
    const friendlyCommitment: Partial<FriendlyCommitment> = {
      type: "friendly",
      title,
      description,
      occasion,
      deadline,
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

    onSubmit(friendlyCommitment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <Heart className="h-12 w-12 mx-auto mb-2 text-pink-500" />
        <h2 className="text-xl font-semibold">Friendly Commitment</h2>
        <p className="text-sm text-gray-500">Create a fun, friendly commitment with your friends</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="E.g., Weekly game night, Movie marathon, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your friendly commitment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] glow-effect"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="occasion">Occasion (Optional)</Label>
          <Input
            id="occasion"
            placeholder="E.g., Birthday, Vacation, Weekend plan"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="glow-effect"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            When?
          </Label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="glow-effect"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Tag Friends
        </Label>
        <UserTagsInput 
          onTagsChange={setTaggedUsers} 
          className="glow-effect"
        />
        <p className="text-xs text-gray-500 mt-1">
          Tag friends to include in this friendly commitment
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
          Create Fun Commitment
        </Button>
      </div>
    </form>
  );
};

export default FriendlyCommitmentForm;
