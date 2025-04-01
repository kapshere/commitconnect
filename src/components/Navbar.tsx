
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, User, Users, CheckSquare, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 sticky top-0 z-50">
      <div className="connect-container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-connect-500 flex items-center justify-center mr-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-connect-600">Connect</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="connect-link flex items-center">
              <CheckSquare className="h-4 w-4 mr-1" />
              <span>Commitments</span>
            </Link>
            <Link to="/connections" className="connect-link flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Connections</span>
            </Link>
            <Link to="/wallet" className="connect-link flex items-center">
              <Wallet className="h-4 w-4 mr-1" />
              <span>Wallet</span>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="ml-2">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="default" size="sm" className="bg-connect-500 hover:bg-connect-600">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4 pb-3">
              <Link 
                to="/dashboard" 
                className="connect-link flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                <span>Commitments</span>
              </Link>
              <Link 
                to="/connections" 
                className="connect-link flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Connections</span>
              </Link>
              <Link 
                to="/wallet" 
                className="connect-link flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Wallet className="h-4 w-4 mr-2" />
                <span>Wallet</span>
              </Link>
              <Link 
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="default" size="sm" className="w-full bg-connect-500 hover:bg-connect-600">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
