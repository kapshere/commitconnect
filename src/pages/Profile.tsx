
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, User, Check, Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

const Profile = () => {
  // Mock user profile data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Product Manager with 5+ years of experience. Passionate about building user-centric products and making meaningful commitments.",
    location: "San Francisco, CA",
    commitmentStats: {
      total: 24,
      active: 8,
      completed: 14,
      expired: 2,
    },
    connections: 156,
    trustScore: 94,
    joinedDate: "2023-01-15",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader className="pb-4 flex flex-row items-center justify-between">
                  <CardTitle>Profile</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={userProfile.name} />
                    <AvatarFallback className="text-2xl bg-connect-100 text-connect-600">
                      {userProfile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{userProfile.location}</p>
                  
                  <div className="flex justify-center gap-2 mb-6">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Trust Score: {userProfile.trustScore}%
                    </Badge>
                  </div>
                  
                  <div className="w-full grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{userProfile.commitmentStats.total}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Commitments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{userProfile.connections}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Connections</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{userProfile.commitmentStats.completed}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                    </div>
                  </div>
                  
                  <div className="w-full text-left">
                    <h3 className="font-semibold mb-2 text-sm">About</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {userProfile.bio}
                    </p>
                    
                    <h3 className="font-semibold mb-2 text-sm">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {userProfile.email}
                      </p>
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {userProfile.phone}
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      Member since {new Date(userProfile.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="commitments" className="w-full">
                <TabsList className="w-full mb-8 grid grid-cols-3">
                  <TabsTrigger value="commitments">Commitments</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="commitments" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Commitment Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Active Commitments</h3>
                          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-connect-500 rounded-full" 
                              style={{ width: `${(userProfile.commitmentStats.active / userProfile.commitmentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{userProfile.commitmentStats.active} active</span>
                            <span>{userProfile.commitmentStats.total} total</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Completion Rate</h3>
                          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${(userProfile.commitmentStats.completed / userProfile.commitmentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{userProfile.commitmentStats.completed} completed</span>
                            <span>{Math.round((userProfile.commitmentStats.completed / userProfile.commitmentStats.total) * 100)}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Expired Commitments</h3>
                          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full" 
                              style={{ width: `${(userProfile.commitmentStats.expired / userProfile.commitmentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{userProfile.commitmentStats.expired} expired</span>
                            <span>{Math.round((userProfile.commitmentStats.expired / userProfile.commitmentStats.total) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              defaultValue={userProfile.name.split(" ")[0]} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              defaultValue={userProfile.name.split(" ")[1]} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            defaultValue={userProfile.email} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            defaultValue={userProfile.phone} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            defaultValue={userProfile.location} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            defaultValue={userProfile.bio} 
                            rows={4}
                          />
                        </div>
                        
                        <Button type="button" className="bg-connect-500 hover:bg-connect-600">
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            id="currentPassword" 
                            type="password" 
                            placeholder="Enter your current password" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword" 
                            type="password" 
                            placeholder="Enter new password" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword" 
                            type="password" 
                            placeholder="Confirm new password" 
                          />
                        </div>
                        
                        <Button type="button" className="bg-connect-500 hover:bg-connect-600">
                          Update Password
                        </Button>
                      </form>
                      
                      <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <Button type="button" variant="outline">
                          Enable 2FA
                        </Button>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Facebook className="h-5 w-5 mr-3 text-blue-600" />
                              <span>Facebook</span>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Twitter className="h-5 w-5 mr-3 text-blue-400" />
                              <span>Twitter</span>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Linkedin className="h-5 w-5 mr-3 text-blue-700" />
                              <span>LinkedIn</span>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
