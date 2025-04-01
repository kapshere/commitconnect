
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create an account",
      description: "Sign up using your phone, email, or social media and set up your Connect profile.",
    },
    {
      number: "02",
      title: "Make a commitment",
      description: "Define what you're committing to, who's involved, and the terms of the commitment.",
    },
    {
      number: "03",
      title: "Secure on blockchain",
      description: "Your commitment is recorded permanently on our quantum ledger database.",
    },
    {
      number: "04",
      title: "Build your network",
      description: "Connect with others, fulfill your commitments, and build your reputation.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="connect-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Connect Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Follow these simple steps to start making immutable commitments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
                <div className="text-3xl font-bold text-connect-500 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-8 w-8 text-connect-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
