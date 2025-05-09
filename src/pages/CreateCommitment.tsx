
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  
  const handleTypeSelect = (type: CommitmentType) => {
    setSelectedType(type);
  };
  
  const handleSubmit = (data: Partial<Commitment>) => {
    console.log("Creating commitment:", data);
    
    // Generate a unique ID for the commitment
    const mockId = `commitment-${Date.now()}`;
    
    // Store the created commitment in sessionStorage for retrieval
    const commitmentData = {
      id: mockId,
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    // Store the commitment data with the full ID as the key
    sessionStorage.setItem(mockId, JSON.stringify(commitmentData));
    
    toast.success("Commitment Created", {
      description: `Your ${selectedType} commitment has been created successfully.`,
      action: {
        label: "View",
        onClick: () => {
          navigate(`/commitment/${mockId}`);
        },
      },
    });
    
    // Navigate to the new commitment details page
    setTimeout(() => {
      navigate(`/commitment/${mockId}`);
    }, 500);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-earth-50 to-earth-100 dark:from-blue-900/30 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="connect-container">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-nordic-600 to-nordic-500 bg-clip-text text-transparent">
            Create New Commitment
          </h1>
          
          <Card className="shadow-nordic border-0 overflow-hidden artful-card">
            <CardContent className="p-6 sm:p-8">
              {!selectedType ? (
                <CommitmentTypeSelector onSelect={handleTypeSelect} />
              ) : (
                <div className="animate-fade-in">
                  <button 
                    onClick={() => setSelectedType(null)}
                    className="text-nordic-500 mb-6 inline-flex items-center hover:underline"
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
