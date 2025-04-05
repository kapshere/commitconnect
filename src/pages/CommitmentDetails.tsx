
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";

const CommitmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the commitment details from the backend
  const mockCommitment = {
    id,
    title: "Sample Commitment",
    description: "This is a sample commitment to showcase the details page layout.",
    type: "personal",
    status: "active",
    createdAt: "2023-08-15",
    deadline: "2023-12-31",
    parties: [
      { id: "1", name: "You", role: "associated" },
      { id: "2", name: "John Doe", role: "associated" },
      { id: "3", name: "Jane Smith", role: "informed" }
    ]
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <Button 
            variant="outline" 
            className="mb-6" 
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{mockCommitment.title}</CardTitle>
                  <CardDescription>
                    {mockCommitment.type.charAt(0).toUpperCase() + mockCommitment.type.slice(1)} Commitment
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(mockCommitment.status)}>
                  {mockCommitment.status.charAt(0).toUpperCase() + mockCommitment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">{mockCommitment.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5 text-connect-500" />
                  <div>
                    <p className="text-sm font-medium">Created On</p>
                    <p>{new Date(mockCommitment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-connect-500" />
                  <div>
                    <p className="text-sm font-medium">Deadline</p>
                    <p>{mockCommitment.deadline ? new Date(mockCommitment.deadline).toLocaleDateString() : "No deadline"}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Involved Parties</h3>
                <div className="space-y-2">
                  {mockCommitment.parties.map((party) => (
                    <div key={party.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {party.name.charAt(0)}
                        </div>
                        <span>{party.name}</span>
                      </div>
                      <Badge variant="outline">
                        {party.role.charAt(0).toUpperCase() + party.role.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Type-specific content would be rendered here based on commitment type */}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline">Edit Commitment</Button>
              
              {mockCommitment.status === "active" && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
              
              {mockCommitment.status === "pending" && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Commitment
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommitmentDetails;
