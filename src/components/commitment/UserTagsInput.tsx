
import { useState } from "react";
import { Check, X, Plus, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UserTagsInputProps {
  onTagsChange: (tags: { id: string; name: string; role: "associated" | "informed" }[]) => void;
  className?: string;
}

// Mock user data - in a real app, this would come from an API call
const mockUsers = [
  { id: "user1", name: "Alex Johnson" },
  { id: "user2", name: "Sarah Williams" },
  { id: "user3", name: "Michael Brown" },
  { id: "user4", name: "Emily Davis" },
  { id: "user5", name: "David Wilson" },
];

const UserTagsInput = ({ onTagsChange, className }: UserTagsInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<"associated" | "informed">("associated");
  const [tags, setTags] = useState<{ id: string; name: string; role: "associated" | "informed" }[]>([]);
  const [suggestions, setSuggestions] = useState<typeof mockUsers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 1) {
      // Filter users based on input
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) &&
        !tags.some(tag => tag.id === user.id)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addTag = (user?: typeof mockUsers[0]) => {
    if (user) {
      // Add existing user
      const newTag = { id: user.id, name: user.name, role: selectedRole };
      setTags([...tags, newTag]);
    } else if (inputValue) {
      // Add manually entered name
      const newTag = { 
        id: `manual-${Date.now()}`, 
        name: inputValue, 
        role: selectedRole 
      };
      setTags([...tags, newTag]);
    }
    
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Notify parent component
    const updatedTags = user 
      ? [...tags, { id: user.id, name: user.name, role: selectedRole }]
      : [...tags, { id: `manual-${Date.now()}`, name: inputValue, role: selectedRole }];
    
    onTagsChange(updatedTags);
  };

  const removeTag = (id: string) => {
    const updatedTags = tags.filter(tag => tag.id !== id);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const updateTagRole = (id: string, newRole: "associated" | "informed") => {
    const updatedTags = tags.map(tag => 
      tag.id === id ? { ...tag, role: newRole } : tag
    );
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Type a name or email address"
            value={inputValue}
            onChange={handleInputChange}
            className="pr-10"
          />
          {inputValue && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setInputValue("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
              <ul className="py-1 max-h-60 overflow-auto">
                {suggestions.map(user => (
                  <li
                    key={user.id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    onClick={() => addTag(user)}
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Select
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as "associated" | "informed")}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="associated">Associated</SelectItem>
            <SelectItem value="informed">Informed</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          type="button" 
          size="icon" 
          onClick={() => addTag()}
          disabled={!inputValue}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge 
              key={tag.id}
              variant={tag.role === "associated" ? "default" : "secondary"}
              className="flex items-center gap-1 py-1.5 pl-2 pr-1"
            >
              <span>{tag.name}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  className={`rounded-full p-0.5 ${
                    tag.role === "associated" 
                      ? "bg-primary-foreground text-primary" 
                      : "bg-secondary-foreground/10 text-secondary-foreground"
                  }`}
                  onClick={() => updateTagRole(
                    tag.id, 
                    tag.role === "associated" ? "informed" : "associated"
                  )}
                  title={tag.role === "associated" ? "Change to Informed" : "Change to Associated"}
                >
                  {tag.role === "associated" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                </button>
                <button
                  type="button"
                  className="rounded-full p-0.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500"
                  onClick={() => removeTag(tag.id)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTagsInput;
