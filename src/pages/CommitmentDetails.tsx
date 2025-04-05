
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
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  User,
  Briefcase,
  BookOpen,
  Handshake,
  Heart,
  Lock
} from "lucide-react";
import { CommitmentType, TrustCommitment } from "@/types/commitments";

const CommitmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the commitment details from the backend
  const mockCommitment = {
    id,
    title: "Sample Commitment",
    description: "This is a sample commitment to showcase the details page layout.",
    type: "personal" as CommitmentType,
    status: "active",
    createdAt: "2023-08-15",
    deadline: "2023-12-31",
    parties: [
      { id: "1", name: "You", role: "associated" as const },
      { id: "2", name: "John Doe", role: "associated" as const },
      { id: "3", name: "Jane Smith", role: "informed" as const }
    ],
    // For trust commitments
    secretEncrypted: "UGFzc3dvcmQgaXMgMTIzNDU=",
    trustLevel: "high" as const,
    // For religious commitments
    religion: "Hinduism",
    deity: "Vishnu"
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: CommitmentType) => {
    switch (type) {
      case "personal":
        return <User className="h-5 w-5" />;
      case "business":
        return <Briefcase className="h-5 w-5" />;
      case "contract":
        return <FileText className="h-5 w-5" />;
      case "religious":
        return <BookOpen className="h-5 w-5" />;
      case "promise":
        return <Handshake className="h-5 w-5" />;
      case "friendly":
        return <Heart className="h-5 w-5" />;
      case "trust":
        return <Lock className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  // For trust commitments - mock decryption
  const decryptSecret = () => {
    const encryptedText = (mockCommitment as TrustCommitment).secretEncrypted;
    return atob(encryptedText); // Simple base64 decode for demo
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <Button 
            variant="ghost" 
            className="mb-6 group hover:bg-white/80 dark:hover:bg-gray-800/80" 
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Button>
          
          <Card className="shadow-lg border-0 overflow-hidden artful-card">
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className={`
                    p-3 rounded-full
                    ${mockCommitment.type === "personal" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                    ${mockCommitment.type === "business" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" : ""}
                    ${mockCommitment.type === "contract" ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300" : ""}
                    ${mockCommitment.type === "religious" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                    ${mockCommitment.type === "promise" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : ""}
                    ${mockCommitment.type === "friendly" ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" : ""}
                    ${mockCommitment.type === "trust" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : ""}
                  `}>
                    {getTypeIcon(mockCommitment.type)}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{mockCommitment.title}</CardTitle>
                    <CardDescription>
                      {mockCommitment.type.charAt(0).toUpperCase() + mockCommitment.type.slice(1)} Commitment
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(mockCommitment.status)}>
                  {mockCommitment.status.charAt(0).toUpperCase() + mockCommitment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{mockCommitment.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all hover:shadow-md">
                  <Calendar className="h-5 w-5 text-connect-500" />
                  <div>
                    <p className="text-sm font-medium">Created On</p>
                    <p>{new Date(mockCommitment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all hover:shadow-md">
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
                    <div 
                      key={party.id} 
                      className="flex items-center justify-between p-4 border rounded-lg glow-effect"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center text-white
                          ${party.role === "associated" ? "bg-connect-500" : "bg-gray-400 dark:bg-gray-600"}
                        `}>
                          {party.name.charAt(0)}
                        </div>
                        <span>{party.name}</span>
                      </div>
                      <Badge variant={party.role === "associated" ? "default" : "outline"} className="capitalize">
                        {party.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Type-specific content */}
              {mockCommitment.type === "trust" && (
                <div className="p-6 border border-dotted rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-2">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">Magic Potion</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This secret is encrypted and requires dual authorization to view
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant="outline" 
                      className="border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                      onClick={() => {
                        const secret = decryptSecret();
                        alert(`The secret is: ${secret}`);
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Request to Unlock Secret
                    </Button>
                  </div>
                </div>
              )}
              
              {mockCommitment.type === "religious" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">Religion</p>
                      <p>{mockCommitment.religion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">Deity</p>
                      <p>{mockCommitment.deity}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <Button variant="outline" className="border-gray-300 hover:bg-white dark:border-gray-700 dark:hover:bg-gray-800">
                Edit Commitment
              </Button>
              
              {mockCommitment.status === "active" && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
              
              {mockCommitment.status === "pending" && (
                <Button className="bg-connect-500 hover:bg-connect-600">
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
