
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import { Activity as ActivityIcon, ArrowRight, Clock, Lock, Package, Search, User } from "lucide-react";

interface Transaction {
  id: string;
  type: "shipment" | "partnership" | "payment";
  company: {
    name: string;
    logo: string;
  };
  description: string;
  amount?: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [
  {
    id: "TRX001",
    type: "shipment",
    company: {
      name: "TechLogistics Inc",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=tech",
    },
    description: "Shipment completed to New York",
    amount: "$5,230",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "TRX002",
    type: "partnership",
    company: {
      name: "GlobalShip Co",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=global",
    },
    description: "New partnership established",
    timestamp: "5 hours ago",
    status: "completed",
  },
  {
    id: "TRX003",
    type: "payment",
    company: {
      name: "FastFreight Solutions",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=fast",
    },
    description: "Payment for shipment #SHP003",
    amount: "$3,450",
    timestamp: "1 day ago",
    status: "pending",
  },
];

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { toast } = useToast();

  const handleViewPrivateKey = () => {
    toast({
      title: "Authentication Required",
      description: "Please authenticate to view the private key.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "failed":
        return "text-red-500 bg-red-500/10";
    }
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "shipment":
        return Package;
      case "partnership":
        return User;
      case "payment":
        return ActivityIcon;
    }
  };

  const TypeIcon = getTypeIcon(transaction.type);

  return (
    <HoverCard>
      <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
        <HoverCardTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer flex-1">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={transaction.company.logo} alt={transaction.company.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <TypeIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">{transaction.company.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{transaction.description}</p>
            </div>
            <div className="text-right">
              {transaction.amount && (
                <p className="font-medium">{transaction.amount}</p>
              )}
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        </HoverCardTrigger>
        <div className="flex items-center ml-4 space-x-2">
          <Button variant="outline" size="sm" onClick={handleViewPrivateKey}>
            <Lock className="h-4 w-4 mr-2" />
            View Key
          </Button>
        </div>
      </div>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={transaction.company.logo} alt={transaction.company.name} className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="font-semibold">{transaction.company.name}</h4>
              <p className="text-sm text-muted-foreground">Transaction ID: {transaction.id}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{transaction.timestamp}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TypeIcon className="h-4 w-4 text-muted-foreground" />
              <span>Type: {transaction.type}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Activity = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Recent Activity
          </h2>
          <p className="text-muted-foreground">Track all transactions and interactions</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-9 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4">
        {transactions
          .filter(
            (transaction) =>
              transaction.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
      </div>
    </div>
  );
};

export default Activity;
