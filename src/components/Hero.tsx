
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      <div className="connect-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-connect-600 to-connect-400 mb-6">
            Connecting Promises to Reality
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            The first social platform powered by immutable commitments. 
            Make promises, forge connections, and build trust through 
            blockchain-verified interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-connect-500 hover:bg-connect-600">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
