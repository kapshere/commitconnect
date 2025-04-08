import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { CommitmentType, Commitment, TrustCommitment } from "@/types/commitments";

const CommitmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commitment, setCommitment] = useState<Partial<Commitment> | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      console.log("Looking for commitment with ID:", id);
      // Try to get the commitment data from sessionStorage using the exact ID
      const storedCommitment = sessionStorage.getItem(id);
      
      if (storedCommitment) {
        try {
          const parsedCommitment = JSON.parse(storedCommitment);
          console.log("Found commitment:", parsedCommitment);
          setCommitment(parsedCommitment);
        } catch (error) {
          console.error("Error parsing commitment data:", error);
        }
      } else {
        console.error("No commitment found with ID:", id);
      }
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading commitment details...</p>
      </div>
    );
  }
  
  if (!commitment) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Commitment Not Found</CardTitle>
              <CardDescription>The commitment you're looking for doesn't exist or has been removed.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getStatusColor = (status: string = "active") => {
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

  const getTypeIcon = (type: CommitmentType = "personal") => {
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

  const decryptSecret = () => {
    const encryptedText = (commitment as TrustCommitment).secretEncrypted;
    return atob(encryptedText || ""); // Simple base64 decode for demo
  };

  const getTypeColor = (type: CommitmentType = "personal") => {
    switch (type) {
      case "personal":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "business":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "contract":
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
      case "religious":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "promise":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "friendly":
        return "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
      case "trust":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }
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
                  <div className={`p-3 rounded-full ${getTypeColor(commitment.type as CommitmentType)}`}>
                    {getTypeIcon(commitment.type as CommitmentType)}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{commitment.title}</CardTitle>
                    <CardDescription>
                      {commitment.type ? (commitment.type.charAt(0).toUpperCase() + commitment.type.slice(1)) : "Personal"} Commitment
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(commitment.status)}>
                  {commitment.status ? (commitment.status.charAt(0).toUpperCase() + commitment.status.slice(1)) : "Active"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{commitment.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all hover:shadow-md">
                  <Calendar className="h-5 w-5 text-connect-500" />
                  <div>
                    <p className="text-sm font-medium">Created On</p>
                    <p>{commitment.createdAt ? new Date(commitment.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all hover:shadow-md">
                  <Clock className="h-5 w-5 text-connect-500" />
                  <div>
                    <p className="text-sm font-medium">Deadline</p>
                    <p>{commitment.deadline ? new Date(commitment.deadline).toLocaleDateString() : "No deadline"}</p>
                  </div>
                </div>
              </div>
              
              {commitment.parties && commitment.parties.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Involved Parties</h3>
                  <div className="space-y-2">
                    {commitment.parties.map((party, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 border rounded-lg glow-effect"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            h-10 w-10 rounded-full flex items-center justify-center text-white
                            ${party.role === "associated" ? "bg-connect-500" : "bg-gray-400 dark:bg-gray-600"}
                          `}>
                            {party.name ? party.name.charAt(0) : "?"}
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
              )}
              
              {commitment.type === "trust" && (commitment as TrustCommitment).secretEncrypted && (
                <div className="p-6 border border-dotted rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-2">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">Encrypted Secret</h3>
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
              
              {commitment.type === "religious" && (commitment as any).religion && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">Religion</p>
                      <p>{(commitment as any).religion}</p>
                    </div>
                  </div>
                  
                  {(commitment as any).deity && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium">Deity</p>
                        <p>{(commitment as any).deity}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {commitment.type === "personal" && (commitment as any).goal && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Goal</h3>
                  <p>{(commitment as any).goal}</p>
                </div>
              )}

              {commitment.type === "promise" && (commitment as any).promiseType && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Promise Type</h3>
                  <p className="capitalize">{(commitment as any).promiseType}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <Button variant="outline" className="border-gray-300 hover:bg-white dark:border-gray-700 dark:hover:bg-gray-800">
                Edit Commitment
              </Button>
              
              {commitment.status === "active" && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
              
              {commitment.status === "pending" && (
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
