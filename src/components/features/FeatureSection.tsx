
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Link, DollarSign, FileCheck } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      title: "Immutable Commitments",
      description: "Every commitment is securely recorded on our QLDB blockchain, ensuring permanence and verifiability.",
      icon: Shield,
    },
    {
      title: "Meaningful Connections",
      description: "Build your network based on real commitments and shared goals, not just casual interactions.",
      icon: Link,
    },
    {
      title: "Built-in Wallet",
      description: "Fund commitments and transfer value within the platform using our secure payment system.",
      icon: DollarSign,
    },
    {
      title: "Business Contracts",
      description: "Create legally binding agreements between businesses with the same immutable record-keeping.",
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="connect-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Connect?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our platform combines the power of blockchain with social networking to create a new way to build trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-connect-100 dark:bg-connect-900 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-connect-500" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
