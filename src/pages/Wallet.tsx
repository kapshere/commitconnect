
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletCard from "@/components/WalletCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

const Wallet = () => {
  // Mock transaction data
  const transactions = [
    {
      id: "tx1",
      type: "charge",
      description: "Commitment: Weekly Team Meeting",
      amount: 0.01,
      date: "2023-07-28",
      status: "completed",
    },
    {
      id: "tx2",
      type: "deposit",
      description: "Wallet Top-up",
      amount: 50.00,
      date: "2023-07-25",
      status: "completed",
    },
    {
      id: "tx3",
      type: "charge",
      description: "Commitment: Product Launch",
      amount: 0.01,
      date: "2023-07-22",
      status: "completed",
    },
    {
      id: "tx4",
      type: "charge",
      description: "Commitment: Client Contract",
      amount: 0.01,
      date: "2023-07-20",
      status: "completed",
    },
    {
      id: "tx5",
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: 25.00,
      date: "2023-07-15",
      status: "pending",
    },
    {
      id: "tx6",
      type: "charge",
      description: "Connection: Alex Johnson",
      amount: 0.01,
      date: "2023-07-10",
      status: "completed",
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "charge":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="connect-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Wallet</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your funds and track your transaction history
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <WalletCard balance={74.95} currency="$" />
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button className="bg-connect-500 hover:bg-connect-600">
                  Add Funds
                </Button>
                <Button variant="outline">
                  Withdraw
                </Button>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="text-sm text-connect-500">Default</div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 mb-6">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="charges">Charges</TabsTrigger>
                      <TabsTrigger value="deposits">Deposits</TabsTrigger>
                      <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-0">
                      <div className="space-y-4">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(transaction.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <p className={`font-medium mr-2 ${
                                transaction.type === "deposit" ? "text-green-500" : "text-gray-900 dark:text-gray-100"
                              }`}>
                                {transaction.type === "deposit" ? "+" : transaction.type === "withdrawal" ? "-" : ""}
                                ${transaction.amount.toFixed(2)}
                              </p>
                              {getStatusIcon(transaction.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="charges" className="mt-0">
                      <div className="space-y-4">
                        {transactions
                          .filter((tx) => tx.type === "charge")
                          .map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                  <p className="font-medium">{transaction.description}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium mr-2">
                                  ${transaction.amount.toFixed(2)}
                                </p>
                                {getStatusIcon(transaction.status)}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="deposits" className="mt-0">
                      <div className="space-y-4">
                        {transactions
                          .filter((tx) => tx.type === "deposit")
                          .map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                  <p className="font-medium">{transaction.description}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium text-green-500 mr-2">
                                  +${transaction.amount.toFixed(2)}
                                </p>
                                {getStatusIcon(transaction.status)}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="withdrawals" className="mt-0">
                      <div className="space-y-4">
                        {transactions
                          .filter((tx) => tx.type === "withdrawal")
                          .map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                  <p className="font-medium">{transaction.description}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium mr-2">
                                  -${transaction.amount.toFixed(2)}
                                </p>
                                {getStatusIcon(transaction.status)}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wallet;
