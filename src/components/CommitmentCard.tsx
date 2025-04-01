
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type CommitmentStatus = "pending" | "active" | "completed" | "expired";

export interface CommitmentProps {
  id: string;
  title: string;
  description: string;
  parties: string[];
  deadline?: string;
  status: CommitmentStatus;
  createdAt: string;
  value?: number;
}

const statusConfig = {
  pending: { 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock 
  },
  active: { 
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Users 
  },
  completed: { 
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle 
  },
  expired: { 
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle 
  },
};

const CommitmentCard = ({ title, description, parties, deadline, status, createdAt, value }: CommitmentProps) => {
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className={cn("flex items-center font-normal", statusConfig[status].color)}
          >
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Created on {new Date(createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Parties</span>
            <span>{parties.length} participants</span>
          </div>
          {deadline && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Deadline</span>
              <span>{new Date(deadline).toLocaleDateString()}</span>
            </div>
          )}
          {value !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Value</span>
              <span>${value.toFixed(2)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="flex -space-x-2">
          {parties.slice(0, 3).map((party, index) => (
            <div 
              key={index}
              className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
            >
              {party.charAt(0)}
            </div>
          ))}
          {parties.length > 3 && (
            <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
              +{parties.length - 3}
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500">Secured on QLDB</span>
      </CardFooter>
    </Card>
  );
};

export default CommitmentCard;
