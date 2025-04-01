
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitmentCard, { CommitmentProps } from "@/components/CommitmentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
    },
    {
      id: "4",
      title: "Personal Goal: Learning",
      description: "Complete the advanced React certification course.",
      parties: ["You"],
      deadline: "2023-08-31",
      status: "completed",
      createdAt: "2023-06-01",
    },
    {
      id: "5",
      title: "Mentorship Program",
      description: "Provide weekly mentorship sessions to junior developers.",
      parties: ["You", "Junior Dev Team"],
      deadline: "2023-11-30",
      status: "active",
      createdAt: "2023-07-05",
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
    },
  ];

  // Filter commitments based on search query
  const filteredCommitments = mockCommitments.filter(
    (commitment) =>
      commitment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commitment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter commitments by status
  const activeCommitments = filteredCommitments.filter((c) => c.status === "active");
  const pendingCommitments = filteredCommitments.filter((c) => c.status === "pending");
  const completedCommitments = filteredCommitments.filter((c) => c.status === "completed" || c.status === "expired");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Commitments</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage and track all your commitments in one place
              </p>
            </div>
            
            <Link to="/create-commitment">
              <Button className="bg-connect-500 hover:bg-connect-600">
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
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCommitments.map((commitment) => (
                    <CommitmentCard key={commitment.id} {...commitment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No commitments found matching your search.</p>
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
                <div className="text-center py-12">
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
                <div className="text-center py-12">
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
                <div className="text-center py-12">
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
