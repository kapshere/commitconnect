
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EmailLoginForm from "./EmailLoginForm";
import PhoneLoginForm from "./PhoneLoginForm";
import SocialLoginButtons from "./SocialLoginButtons";
import LoginError from "./LoginError";
import LoginDivider from "./LoginDivider";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleError = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in to Connect</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred login method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginError message={errorMessage} />
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <EmailLoginForm onError={handleError} />
          </TabsContent>
          
          <TabsContent value="phone">
            <PhoneLoginForm />
          </TabsContent>
        </Tabs>
        
        <LoginDivider />
        
        <SocialLoginButtons onError={handleError} />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-connect-500 hover:text-connect-600 font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
