
import { useState } from "react";
import { CommitmentType } from "@/types/commitments";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Briefcase, 
  ScrollText, 
  Church, 
  HandshakeIcon, 
  Heart, 
  Lock 
} from "lucide-react";

interface CommitmentTypeSelectorProps {
  onSelect: (type: CommitmentType) => void;
}

interface TypeOption {
  value: CommitmentType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const CommitmentTypeSelector = ({ onSelect }: CommitmentTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<CommitmentType | null>(null);
  
  const commitmentTypes: TypeOption[] = [
    {
      value: "personal",
      label: "Personal",
      icon: <User className="h-10 w-10 text-blue-500" />,
      description: "Track personal goals and ambitions, tag others as associated or informed."
    },
    {
      value: "business",
      label: "Business",
      icon: <Briefcase className="h-10 w-10 text-green-600" />,
      description: "Create business agreements with contracts, invoices and other documents."
    },
    {
      value: "contract",
      label: "Contract",
      icon: <ScrollText className="h-10 w-10 text-purple-600" />,
      description: "Formal contracts between individuals or organizations."
    },
    {
      value: "religious",
      label: "Religious",
      icon: <Church className="h-10 w-10 text-amber-600" />,
      description: "Spiritual commitments made with religious significance."
    },
    {
      value: "promise",
      label: "Promise",
      icon: <Heart className="h-10 w-10 text-red-500" />,
      description: "Simple promises between people."
    },
    {
      value: "friendly",
      label: "Friendly",
      icon: <HandshakeIcon className="h-10 w-10 text-teal-500" />,
      description: "Casual commitments between friends and acquaintances."
    },
    {
      value: "trust",
      label: "Trust",
      icon: <Lock className="h-10 w-10 text-indigo-600" />,
      description: "Secure commitments with encrypted secrets shared between parties."
    }
  ];

  const handleSelect = (type: CommitmentType) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Choose a Commitment Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commitmentTypes.map((type) => (
          <Card 
            key={type.value}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === type.value 
                ? "ring-2 ring-connect-500 shadow-lg" 
                : "hover:border-connect-300"
            }`}
            onClick={() => handleSelect(type.value)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-gray-50">
                {type.icon}
              </div>
              <h3 className="font-medium text-lg">{type.label}</h3>
              <p className="text-sm text-gray-500">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommitmentTypeSelector;
