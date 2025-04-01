
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 lg:pr-12">
              <h1 className="text-3xl font-bold mb-4">Join Connect</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your Connect account to start making immutable commitments and building valuable connections.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">1</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Create your account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Set up your profile and get started in minutes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">2</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Make your first commitment</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Define a goal or promise and secure it on the blockchain
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">3</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Connect with others</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Build your network based on trust and shared commitments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
