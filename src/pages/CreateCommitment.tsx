
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CommitmentType, Commitment } from "@/types/commitments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitmentTypeSelector from "@/components/commitment/CommitmentTypeSelector";
import PersonalCommitmentForm from "@/components/commitment/PersonalCommitmentForm";
import BusinessCommitmentForm from "@/components/commitment/BusinessCommitmentForm";
import { Card } from "@/components/ui/card";

const CreateCommitment = () => {
  const [selectedType, setSelectedType] = useState<CommitmentType | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleTypeSelect = (type: CommitmentType) => {
    setSelectedType(type);
  };
  
  const handleSubmit = (data: Partial<Commitment>) => {
    console.log("Creating commitment:", data);
    
    // Mock submission - in a real app, this would save to the backend
    const mockId = "commitment-" + Date.now();
    
    toast({
      title: "Commitment Created",
      description: `Your ${selectedType} commitment has been created successfully.`,
    });
    
    // Navigate back to dashboard
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
        return <p className="text-center p-6">Contract commitment form coming soon...</p>;
      case "religious":
        return <p className="text-center p-6">Religious commitment form coming soon...</p>;
      case "promise":
        return <p className="text-center p-6">Promise commitment form coming soon...</p>;
      case "friendly":
        return <p className="text-center p-6">Friendly commitment form coming soon...</p>;
      case "trust":
        return <p className="text-center p-6">Trust commitment form coming soon...</p>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <h1 className="text-3xl font-bold mb-8 text-center">Create New Commitment</h1>
          
          <Card className="p-6 shadow-md">
            {!selectedType ? (
              <CommitmentTypeSelector onSelect={handleTypeSelect} />
            ) : (
              <div>
                <button 
                  onClick={() => setSelectedType(null)}
                  className="text-connect-500 mb-6 inline-flex items-center hover:underline"
                >
                  ← Back to commitment types
                </button>
                
                {renderForm()}
              </div>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCommitment;
