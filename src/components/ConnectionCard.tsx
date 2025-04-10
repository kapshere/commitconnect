
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserPlus, MessageSquare, User } from "lucide-react";

export interface ConnectionProps {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  commitmentCount: number;
  isConnected: boolean;
}

const ConnectionCard = ({ name, avatar, role, commitmentCount, isConnected }: ConnectionProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3 pt-4 flex flex-row items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={name} className="h-12 w-12 rounded-full" />
          ) : (
            <User className="h-6 w-6 text-primary" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-md">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="secondary" className="font-normal">
            <UserCheck className="h-3 w-3 mr-1" />
            {commitmentCount} Commitments
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between">
        <Button variant="outline" size="sm" className="w-[48%]">
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        {isConnected ? (
          <Button variant="secondary" size="sm" className="w-[48%]">
            <UserCheck className="h-4 w-4 mr-1" />
            Connected
          </Button>
        ) : (
          <Button variant="default" size="sm" className="w-[48%]">
            <UserPlus className="h-4 w-4 mr-1" />
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
