
import { useState } from "react";
import { CommitmentType } from "@/types/commitments";
import { motion } from "framer-motion";
import { 
  User, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Handshake, 
  Heart, 
  Lock, 
  ChevronRight 
} from "lucide-react";

interface CommitmentTypeSelectorProps {
  onSelect: (type: CommitmentType) => void;
}

const CommitmentTypeSelector = ({ onSelect }: CommitmentTypeSelectorProps) => {
  const [hoveredType, setHoveredType] = useState<CommitmentType | null>(null);

  const commitmentTypes = [
    {
      type: "personal" as CommitmentType,
      title: "Personal",
      description: "Set personal goals and ambitions that you can optionally share with others",
      icon: User,
      color: "bg-gradient-to-r from-blue-500 to-teal-400",
    },
    {
      type: "business" as CommitmentType,
      title: "Business",
      description: "Create business agreements with immutable document storage",
      icon: Briefcase,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
    {
      type: "contract" as CommitmentType,
      title: "Contract",
      description: "Formalize contracts between parties with legal documentation",
      icon: FileText,
      color: "bg-gradient-to-r from-gray-700 to-gray-500",
    },
    {
      type: "religious" as CommitmentType,
      title: "Religious",
      description: "Make sacred commitments in accordance with your faith",
      icon: BookOpen,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      type: "promise" as CommitmentType,
      title: "Promise",
      description: "Create meaningful promises to yourself or others",
      icon: Handshake,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      type: "friendly" as CommitmentType,
      title: "Friendly",
      description: "Fun commitments between friends for activities and events",
      icon: Heart,
      color: "bg-gradient-to-r from-pink-500 to-rose-400",
    },
    {
      type: "trust" as CommitmentType,
      title: "Trust",
      description: "Share encrypted secrets that only trusted parties can access",
      icon: Lock,
      color: "bg-gradient-to-r from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Commitment Type</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select the type of commitment you want to create
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {commitmentTypes.map((item) => (
          <motion.div
            key={item.type}
            className={`
              relative rounded-xl overflow-hidden cursor-pointer
              border border-transparent hover:border-white/10
              shadow-md
            `}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={() => setHoveredType(item.type)}
            onMouseLeave={() => setHoveredType(null)}
            onClick={() => onSelect(item.type)}
          >
            <div className={`${item.color} absolute inset-0 opacity-90`} />
            <div className="relative p-6 text-white h-full flex flex-col">
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm mb-4 flex-grow">
                {item.description}
              </p>
              <div 
                className={`
                  flex items-center mt-2 text-sm font-medium 
                  transition-opacity duration-300 
                  ${hoveredType === item.type ? 'opacity-100' : 'opacity-70'}
                `}
              >
                <span>Select</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommitmentTypeSelector;
