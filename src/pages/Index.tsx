
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/features/FeatureSection";
import HowItWorks from "@/components/features/HowItWorks";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Index = () => {
  const testimonials = [
    {
      quote: "Connect has transformed how I make and keep commitments. The blockchain verification gives everything a sense of permanence.",
      name: "Sarah Johnson",
      title: "Entrepreneur"
    },
    {
      quote: "As a business owner, I love the contract feature. It's simplified our agreement process while making everything more secure.",
      name: "Michael Chen",
      title: "CEO, TechStart"
    },
    {
      quote: "The wallet integration makes it easy to add stakes to my commitments, which helps keep everyone accountable.",
      name: "Priya Sharma",
      title: "Project Manager"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeatureSection />
        
        <HowItWorks />
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="connect-container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands who are already building trust through immutable commitments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <p className="italic mb-4 text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-connect-500 text-white">
          <div className="connect-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to make commitments that matter?</h2>
              <p className="mb-8">
                Join Connect today and start building a network based on trust and accountability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-connect-600 hover:bg-gray-100">
                    Create Account
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-connect-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Explore Commitments
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
