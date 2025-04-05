
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ContractCommitment } from "@/types/commitments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserTagsInput from "./UserTagsInput";
import FileUpload from "./FileUpload";
import { FileUpIcon, Users } from "lucide-react";

interface ContractCommitmentFormProps {
  onSubmit: (data: Partial<ContractCommitment>) => void;
}

const ContractCommitmentForm = ({ onSubmit }: ContractCommitmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contractType, setContractType] = useState<string>("sponsorship");
  const [contractDetails, setContractDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taggedUsers, setTaggedUsers] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);
  const [documents, setDocuments] = useState<{ name: string; url: string; uploadedAt: string }[]>([]);

  const handleAddDocument = (doc: { name: string; url: string }) => {
    setDocuments([
      ...documents,
      {
        ...doc,
        uploadedAt: new Date().toISOString(),
      },
    ]);
    
    toast({
      title: "Document Added",
      description: `${doc.name} has been added to your commitment.`,
    });
  };

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

    // Prepare data for submission
    const contractCommitment: Partial<ContractCommitment> = {
      type: "contract",
      title,
      description,
      contractType: contractType as "sponsorship" | "employment" | "service" | "termsheet" | "other",
      contractDetails,
      deadline,
      parties: [
        {
          id: "current-user", // This would be replaced with actual user ID
          name: "You",
          role: "associated"
        },
        ...taggedUsers,
      ],
      documents,
      status: "pending",
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // This would be replaced with actual user ID
    };

    onSubmit(contractCommitment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter the contract title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the contract commitment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] glow-effect"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contractType">Contract Type</Label>
          <Select value={contractType} onValueChange={setContractType}>
            <SelectTrigger className="glow-effect">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sponsorship">Sponsorship Agreement</SelectItem>
              <SelectItem value="employment">Employment Contract</SelectItem>
              <SelectItem value="service">Service Agreement</SelectItem>
              <SelectItem value="termsheet">Term Sheet</SelectItem>
              <SelectItem value="other">Other Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
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
        <Label htmlFor="contractDetails">Contract Details</Label>
        <Textarea
          id="contractDetails"
          placeholder="Enter specific terms, conditions, and details of the contract"
          value={contractDetails}
          onChange={(e) => setContractDetails(e.target.value)}
          className="min-h-[150px] glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Participants
        </Label>
        <UserTagsInput 
          onTagsChange={setTaggedUsers} 
          className="glow-effect"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center">
          <FileUpIcon className="h-4 w-4 mr-2" />
          Contract Documents
        </Label>
        <FileUpload onFileUpload={handleAddDocument} supportedTypes={".pdf,.doc,.docx,.txt"} />
        
        {documents.length > 0 && (
          <div className="mt-4 space-y-2">
            <Label>Uploaded Documents</Label>
            <div className="border rounded-lg divide-y">
              {documents.map((doc, index) => (
                <div key={index} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(doc.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDocuments(documents.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
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
          Create Contract
        </Button>
      </div>
    </form>
  );
};

export default ContractCommitmentForm;
