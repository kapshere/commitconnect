
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthCallback from "@/components/auth/AuthCallback";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Connections from "./pages/Connections";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { StrictMode } from "react";
import CreateCommitment from "./pages/CreateCommitment";
import CommitmentDetails from "./pages/CommitmentDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/connections" element={<PageTransition><Connections /></PageTransition>} />
                <Route path="/wallet" element={<PageTransition><Wallet /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                <Route path="/create-commitment" element={<PageTransition><CreateCommitment /></PageTransition>} />
                <Route path="/commitment/:id" element={<PageTransition><CommitmentDetails /></PageTransition>} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
