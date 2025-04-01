
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, PlusCircle, History } from "lucide-react";

interface WalletCardProps {
  balance: number;
  currency: string;
}

const WalletCard = ({ balance, currency }: WalletCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Your Connect Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
          <h2 className="text-3xl font-bold">{currency}{balance.toFixed(2)}</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="sm" className="flex items-center justify-center">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center">
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Receive
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="default" size="sm" className="w-[48%] bg-connect-500 hover:bg-connect-600">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
        <Button variant="secondary" size="sm" className="w-[48%]">
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
