
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConnectionCard, { ConnectionProps } from "@/components/ConnectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for connections
  const mockConnections: ConnectionProps[] = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Product Manager",
      commitmentCount: 8,
      isConnected: true,
    },
    {
      id: "2",
      name: "Sarah Williams",
      role: "UX Designer",
      commitmentCount: 12,
      isConnected: true,
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Software Engineer",
      commitmentCount: 5,
      isConnected: true,
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Marketing Director",
      commitmentCount: 3,
      isConnected: false,
    },
    {
      id: "5",
      name: "David Wilson",
      role: "Business Analyst",
      commitmentCount: 7,
      isConnected: false,
    },
    {
      id: "6",
      name: "Lisa Thompson",
      role: "Project Coordinator",
      commitmentCount: 4,
      isConnected: false,
    },
    {
      id: "7",
      name: "Jason Martinez",
      role: "CEO, TechStart",
      commitmentCount: 15,
      isConnected: true,
    },
    {
      id: "8",
      name: "Ryan Taylor",
      role: "Frontend Developer",
      commitmentCount: 6,
      isConnected: true,
    },
  ];

  // Filter connections based on search query
  const filteredConnections = mockConnections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter connections by status
  const connectedUsers = filteredConnections.filter((c) => c.isConnected);
  const suggestedUsers = filteredConnections.filter((c) => !c.isConnected);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Network</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your connections and discover new opportunities
              </p>
            </div>
            
            <Button className="bg-connect-500 hover:bg-connect-600">
              <UserPlus className="mr-2 h-4 w-4" />
              Find Connections
            </Button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="connected">Connected</TabsTrigger>
              <TabsTrigger value="suggested">Suggested</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredConnections.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredConnections.map((connection) => (
                    <ConnectionCard key={connection.id} {...connection} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No connections found matching your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="connected" className="mt-0">
              {connectedUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {connectedUsers.map((connection) => (
                    <ConnectionCard key={connection.id} {...connection} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No connected users found.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="suggested" className="mt-0">
              {suggestedUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {suggestedUsers.map((connection) => (
                    <ConnectionCard key={connection.id} {...connection} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No suggested connections found.</p>
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

export default Connections;
