
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { CommitmentType, Commitment } from "@/types/commitments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitmentTypeSelector from "@/components/commitment/CommitmentTypeSelector";
import PersonalCommitmentForm from "@/components/commitment/PersonalCommitmentForm";
import BusinessCommitmentForm from "@/components/commitment/BusinessCommitmentForm";
import ContractCommitmentForm from "@/components/commitment/ContractCommitmentForm";
import ReligiousCommitmentForm from "@/components/commitment/ReligiousCommitmentForm";
import PromiseCommitmentForm from "@/components/commitment/PromiseCommitmentForm";
import FriendlyCommitmentForm from "@/components/commitment/FriendlyCommitmentForm";
import TrustCommitmentForm from "@/components/commitment/TrustCommitmentForm";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const CreateCommitment = () => {
  const [selectedType, setSelectedType] = useState<CommitmentType | null>(null);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  const handleTypeSelect = (type: CommitmentType) => {
    setSelectedType(type);
  };
  
  const handleSubmit = (data: Partial<Commitment>) => {
    console.log("Creating commitment:", data);
    
    // Mock submission - in a real app, this would save to the backend
    const mockId = "commitment-" + Date.now();
    
    toast.success("Commitment Created", {
      description: `Your ${selectedType} commitment has been created successfully.`,
      action: {
        label: "View",
        onClick: () => navigate(`/commitment/${mockId}`),
      },
    });
    
    // Navigate to the new commitment details page
    setTimeout(() => {
      navigate(`/commitment/${mockId}`);
    }, 1000);
  };
  
  const renderForm = () => {
    switch (selectedType) {
      case "personal":
        return <PersonalCommitmentForm onSubmit={handleSubmit} />;
      case "business":
        return <BusinessCommitmentForm onSubmit={handleSubmit} />;
      case "contract":
        return <ContractCommitmentForm onSubmit={handleSubmit} />;
      case "religious":
        return <ReligiousCommitmentForm onSubmit={handleSubmit} />;
      case "promise":
        return <PromiseCommitmentForm onSubmit={handleSubmit} />;
      case "friendly":
        return <FriendlyCommitmentForm onSubmit={handleSubmit} />;
      case "trust":
        return <TrustCommitmentForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="connect-container">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-connect-500 to-blue-600 bg-clip-text text-transparent">
            Create New Commitment
          </h1>
          
          <Card className="shadow-lg border-0 overflow-hidden artful-card">
            <CardContent className="p-6 sm:p-8">
              {!selectedType ? (
                <CommitmentTypeSelector onSelect={handleTypeSelect} />
              ) : (
                <div className="animate-fade-in">
                  <button 
                    onClick={() => setSelectedType(null)}
                    className="text-connect-500 mb-6 inline-flex items-center hover:underline"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to commitment types
                  </button>
                  
                  {renderForm()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCommitment;
