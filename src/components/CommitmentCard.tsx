
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { CommitmentType } from "@/types/commitments";
import { User, Briefcase, FileText, BookOpen, Handshake, Heart, Lock, Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export interface CommitmentProps {
  id: string;
  title: string;
  description: string;
  parties: string[];
  deadline?: string;
  status: "active" | "pending" | "completed" | "expired";
  createdAt: string;
  value?: number;
  type?: CommitmentType;
}

const CommitmentCard = ({
  id,
  title,
  description,
  parties,
  deadline,
  status,
  createdAt,
  value,
  type = "personal",
}: CommitmentProps) => {
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

  const getTypeIcon = () => {
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
        return <User className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
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
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/commitment/${id}`}>
        <Card className="h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3 pt-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getTypeColor()}`}>
                  {getTypeIcon()}
                </div>
                <div>
                  <h3 className="font-semibold leading-tight">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{type}</p>
                </div>
              </div>
              <Badge className={getStatusColor(status)}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm line-clamp-2 text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                <span className="line-clamp-1">
                  {parties.join(", ")}
                </span>
              </div>
              
              {deadline && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>Due: {new Date(deadline).toLocaleDateString()}</span>
                </div>
              )}
              
              {value && (
                <div className="flex items-center text-sm font-medium">
                  <span className="text-primary dark:text-primary/90">${value.toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-4 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Created {new Date(createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CommitmentCard;
