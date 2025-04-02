
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // If session creation was successful, navigate to dashboard
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.message);
        // If there was an error, navigate back to the login page
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Authentication Error</h2>
          <p className="mt-2">{error}</p>
          <p className="mt-4">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-connect-500" />
        <h2 className="mt-4 text-xl font-medium">Finalizing authentication...</h2>
        <p className="mt-2 text-gray-500">Please wait while we complete the sign in process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
