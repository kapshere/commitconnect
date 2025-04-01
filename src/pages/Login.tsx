
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="connect-container">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 lg:pr-12">
              <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign in to your Connect account to manage your commitments, connections, and wallet.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Secure blockchain technology</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      All your commitments are secured with quantum ledger technology
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Multiple login options</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use your email, phone or social media accounts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-connect-100 flex items-center justify-center">
                      <span className="text-connect-600 text-xs">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Integrated wallet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access your funds and manage transactions in one place
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
