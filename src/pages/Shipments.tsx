
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Lock, Mail, MapPin, Package } from "lucide-react";

interface Company {
  id: string;
  name: string;
  operator: string;
  logo: string;
  shipments: number;
  location: string;
}

const companies: Company[] = [
  {
    id: "1",
    name: "TechLogistics Inc",
    operator: "John Smith",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=tech",
    shipments: 156,
    location: "New York, USA",
  },
  {
    id: "2",
    name: "GlobalShip Co",
    operator: "Emma Wilson",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=global",
    shipments: 243,
    location: "London, UK",
  },
  {
    id: "3",
    name: "FastFreight Solutions",
    operator: "David Chen",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=fast",
    shipments: 89,
    location: "Singapore",
  },
];

const CompanyCard = ({ company }: { company: Company }) => {
  const { toast } = useToast();

  const handleViewPrivateKey = () => {
    toast({
      title: "Authentication Required",
      description: "Please authenticate to view the private key.",
      variant: "destructive",
    });
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{company.name}</h3>
              <p className="text-sm text-muted-foreground">{company.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{company.shipments}</span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="font-semibold">{company.name}</h4>
              <p className="text-sm text-muted-foreground">Operator: {company.operator}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{company.shipments} Shipments</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{company.location}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleViewPrivateKey}>
              <Lock className="h-4 w-4 mr-2" />
              View Private Key
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Shipments = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Completed Shipments
          </h2>
          <p className="text-muted-foreground">View all companies we've completed shipments with</p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>
      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Shipments;
