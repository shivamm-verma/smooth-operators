
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Lock, Mail, MoreVertical, Shield, Trash } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  operator: string;
  logo: string;
  status: "active" | "blocked";
  joinDate: string;
}

const partners: Partner[] = [
  {
    id: "1",
    name: "Supply Solutions Ltd",
    operator: "Sarah Johnson",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=supply",
    status: "active",
    joinDate: "Jan 2024",
  },
  {
    id: "2",
    name: "Cargo Connect Inc",
    operator: "Michael Brown",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=cargo",
    status: "active",
    joinDate: "Dec 2023",
  },
  {
    id: "3",
    name: "LogiTech Partners",
    operator: "Lisa Wong",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=logi",
    status: "blocked",
    joinDate: "Nov 2023",
  },
];

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const { toast } = useToast();

  const handleViewPrivateKey = () => {
    toast({
      title: "Authentication Required",
      description: "Please authenticate to view the private key.",
      variant: "destructive",
    });
  };

  const handleAction = (action: string) => {
    toast({
      title: `${action} Partner`,
      description: `Successfully ${action.toLowerCase()}ed ${partner.name}`,
    });
  };

  return (
    <HoverCard>
      <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
        <HoverCardTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{partner.name}</h3>
              <p className="text-sm text-muted-foreground">Since {partner.joinDate}</p>
            </div>
          </div>
        </HoverCardTrigger>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleViewPrivateKey}>
            <Lock className="h-4 w-4 mr-2" />
            View Key
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAction("Email")}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Block")}>
                <Shield className="h-4 w-4 mr-2" />
                {partner.status === "blocked" ? "Unblock" : "Block"} Partner
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Delete")} className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete Partner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={partner.logo} alt={partner.name} className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="font-semibold">{partner.name}</h4>
              <p className="text-sm text-muted-foreground">Operator: {partner.operator}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">
              Status:{" "}
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs ${
                  partner.status === "active"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {partner.status}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">Member since {partner.joinDate}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Partners = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Partner Companies
          </h2>
          <p className="text-muted-foreground">Manage your business partners and collaborations</p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>
      <div className="space-y-4">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default Partners;
