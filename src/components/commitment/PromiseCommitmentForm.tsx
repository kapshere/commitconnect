
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PromiseCommitment } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserTagsInput from "./UserTagsInput";
import { Handshake, Calendar, Users } from "lucide-react";

interface PromiseCommitmentFormProps {
  onSubmit: (data: Partial<PromiseCommitment>) => void;
}

const PromiseCommitmentForm = ({ onSubmit }: PromiseCommitmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promiseType, setPromiseType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taggedUsers, setTaggedUsers] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);

  const promiseTypes = [
    "Personal", "Professional", "Family", "Friendship", "Community", "Ethical", 
    "Environmental", "Financial", "Health", "Educational", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !promiseType) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data for submission
    const promiseCommitment: Partial<PromiseCommitment> = {
      type: "promise",
      title,
      description,
      promiseType,
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

    onSubmit(promiseCommitment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <Handshake className="h-12 w-12 mx-auto mb-2 text-connect-500" />
        <h2 className="text-xl font-semibold">Promise Commitment</h2>
        <p className="text-sm text-gray-500">Create a binding promise to someone or yourself</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title of Promise</Label>
        <Input
          id="title"
          placeholder="What are you promising?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your promise in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] glow-effect"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="promiseType">Promise Type</Label>
          <Select value={promiseType} onValueChange={setPromiseType}>
            <SelectTrigger className="glow-effect">
              <SelectValue placeholder="Select promise type" />
            </SelectTrigger>
            <SelectContent>
              {promiseTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Fulfillment Deadline
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
          Who is this promise to?
        </Label>
        <UserTagsInput 
          onTagsChange={setTaggedUsers} 
          className="glow-effect"
        />
        <p className="text-xs text-gray-500 mt-1">
          Add the recipients of your promise or people who should be informed
        </p>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Remember:</strong> A promise is your word of honor. By creating this commitment, 
          you are making a binding pledge that will be recorded on the blockchain.
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
          Make Promise
        </Button>
      </div>
    </form>
  );
};

export default PromiseCommitmentForm;
