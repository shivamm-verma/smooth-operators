
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Mail, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (provider: string) => {
    setIsLoading(true);
    // Simulating authentication process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Successfully logged in",
        description: `Logged in with ${provider}`,
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            SupplyChain Sync
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="outline" className="hover:border-purple-500">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-blue-600">
              Revolutionize Your Supply Chain
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Integrate blockchain, AI, and smart contracts for enhanced security,
              transparency, and automation.
            </p>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="glass-card space-y-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            <h2 className="text-2xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Get Started
            </h2>
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700"
                onClick={() => handleLogin("github")}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                onClick={() => handleLogin("google")}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-600"
                onClick={() => handleLogin("facebook")}
                disabled={isLoading}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Continue with Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Blockchain Security",
                description:
                  "Immutable ledger ensuring data integrity and transparency",
                gradient: "from-blue-600 to-blue-400",
              },
              {
                title: "AI Optimization",
                description:
                  "Smart analytics for demand forecasting and route optimization",
                gradient: "from-purple-600 to-purple-400",
              },
              {
                title: "Smart Contracts",
                description:
                  "Automated payments and contract execution for better efficiency",
                gradient: "from-indigo-600 to-indigo-400",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card border border-purple-500/20 shadow-lg shadow-purple-500/10"
              >
                <h3 className={`text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
