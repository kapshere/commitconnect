
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitmentCard, { CommitmentProps } from "@/components/CommitmentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, Briefcase, User, FileText, BookOpen, Handshake, Heart, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { CommitmentType } from "@/types/commitments";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CommitmentType | "all">("all");
  
  // Mock data for commitments
  const mockCommitments: CommitmentProps[] = [
    {
      id: "1",
      title: "Weekly Team Meeting",
      description: "Commit to attending all scheduled team meetings for Q3 2023.",
      parties: ["You", "Team Alpha", "Marketing Dept"],
      deadline: "2023-09-30",
      status: "active",
      createdAt: "2023-07-15",
      type: "personal",
    },
    {
      id: "2",
      title: "Product Launch Deadline",
      description: "Deliver all required assets for the Q4 product launch.",
      parties: ["You", "Design Team", "Development"],
      deadline: "2023-10-15",
      status: "pending",
      createdAt: "2023-07-20",
      value: 250,
      type: "business",
    },
    {
      id: "3",
      title: "Client Contract",
      description: "Service agreement with Acme Corp for website redesign.",
      parties: ["You", "Acme Corp"],
      deadline: "2023-12-31",
      status: "active",
      createdAt: "2023-07-10",
      value: 5000,
      type: "contract",
    },
    {
      id: "4",
      title: "Personal Goal: Learning",
      description: "Complete the advanced React certification course.",
      parties: ["You"],
      deadline: "2023-08-31",
      status: "completed",
      createdAt: "2023-06-01",
      type: "personal",
    },
    {
      id: "5",
      title: "Mentorship Program",
      description: "Provide weekly mentorship sessions to junior developers.",
      parties: ["You", "Junior Dev Team"],
      deadline: "2023-11-30",
      status: "active",
      createdAt: "2023-07-05",
      type: "promise",
    },
    {
      id: "6",
      title: "Fundraiser Pledge",
      description: "Commitment to raise $1000 for charity event.",
      parties: ["You", "Charity Organization"],
      deadline: "2023-09-15",
      status: "expired",
      createdAt: "2023-05-20",
      value: 1000,
      type: "friendly",
    },
    {
      id: "7",
      title: "Religious Vow",
      description: "Annual prayer and meditation practice.",
      parties: ["You"],
      deadline: "2023-11-01",
      status: "active",
      createdAt: "2023-07-02",
      type: "religious",
    },
    {
      id: "8",
      title: "Secret Storage",
      description: "Secure storage of sensitive information.",
      parties: ["You", "Legal Team"],
      deadline: "2024-01-15",
      status: "active",
      createdAt: "2023-07-25",
      type: "trust",
    },
  ];

  // Filter commitments by search query
  const filteredCommitments = mockCommitments.filter(
    (commitment) => {
      const matchesSearch = commitment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           commitment.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedFilter === "all" || commitment.type === selectedFilter;
      
      return matchesSearch && matchesType;
    }
  );

  // Filter commitments by status
  const activeCommitments = filteredCommitments.filter((c) => c.status === "active");
  const pendingCommitments = filteredCommitments.filter((c) => c.status === "pending");
  const completedCommitments = filteredCommitments.filter((c) => c.status === "completed" || c.status === "expired");

  const getFilterIcon = (type: CommitmentType | "all") => {
    switch (type) {
      case "personal":
        return <User className="h-4 w-4" />;
      case "business":
        return <Briefcase className="h-4 w-4" />;
      case "contract":
        return <FileText className="h-4 w-4" />;
      case "religious":
        return <BookOpen className="h-4 w-4" />;
      case "promise":
        return <Handshake className="h-4 w-4" />;
      case "friendly":
        return <Heart className="h-4 w-4" />;
      case "trust":
        return <Lock className="h-4 w-4" />;
      default:
        return <Filter className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-connect-500 to-blue-600 bg-clip-text text-transparent">
                Your Commitments
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage and track all your commitments in one place
              </p>
            </div>
            
            <Link to="/create-commitment">
              <Button className="bg-connect-500 hover:bg-connect-600 shadow-md hover:shadow-lg transition-shadow">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Commitment
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search commitments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glow-effect"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className="glow-effect"
              >
                <Filter className="h-4 w-4 mr-1" />
                All Types
              </Button>
              
              <Button
                variant={selectedFilter === "personal" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("personal")}
                className={`glow-effect ${selectedFilter === "personal" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
              >
                <User className="h-4 w-4 mr-1" />
                Personal
              </Button>
              
              <Button
                variant={selectedFilter === "business" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("business")}
                className={`glow-effect ${selectedFilter === "business" ? "bg-purple-500 hover:bg-purple-600" : ""}`}
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Business
              </Button>
              
              <Button
                variant={selectedFilter === "contract" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("contract")}
                className="glow-effect"
              >
                <FileText className="h-4 w-4 mr-1" />
                Contract
              </Button>
              
              <Button
                variant={selectedFilter === "religious" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("religious")}
                className={`glow-effect ${selectedFilter === "religious" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Religious
              </Button>
              
              <Button
                variant={selectedFilter === "promise" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("promise")}
                className={`glow-effect ${selectedFilter === "promise" ? "bg-green-500 hover:bg-green-600" : ""}`}
              >
                <Handshake className="h-4 w-4 mr-1" />
                Promise
              </Button>
              
              <Button
                variant={selectedFilter === "friendly" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("friendly")}
                className={`glow-effect ${selectedFilter === "friendly" ? "bg-pink-500 hover:bg-pink-600" : ""}`}
              >
                <Heart className="h-4 w-4 mr-1" />
                Friendly
              </Button>
              
              <Button
                variant={selectedFilter === "trust" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("trust")}
                className={`glow-effect ${selectedFilter === "trust" ? "bg-red-500 hover:bg-red-600" : ""}`}
              >
                <Lock className="h-4 w-4 mr-1" />
                Trust
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="all" className="glow-effect">All</TabsTrigger>
              <TabsTrigger value="active" className="glow-effect">Active</TabsTrigger>
              <TabsTrigger value="pending" className="glow-effect">Pending</TabsTrigger>
              <TabsTrigger value="completed" className="glow-effect">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCommitments.map((commitment) => (
                    <CommitmentCard key={commitment.id} {...commitment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                  <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No commitments found</p>
                  <p className="text-gray-400 dark:text-gray-500 mb-6">Try adjusting your search or filters</p>
                  <Link to="/create-commitment">
                    <Button className="bg-connect-500 hover:bg-connect-600">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Commitment
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              {activeCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCommitments.map((commitment) => (
                    <CommitmentCard key={commitment.id} {...commitment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                  <p className="text-gray-500 dark:text-gray-400">No active commitments found.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              {pendingCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingCommitments.map((commitment) => (
                    <CommitmentCard key={commitment.id} {...commitment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                  <p className="text-gray-500 dark:text-gray-400">No pending commitments found.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              {completedCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCommitments.map((commitment) => (
                    <CommitmentCard key={commitment.id} {...commitment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                  <p className="text-gray-500 dark:text-gray-400">No completed commitments found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
