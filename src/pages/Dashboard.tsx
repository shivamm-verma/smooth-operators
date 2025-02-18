
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BarChart,
  Package,
  Users,
  Activity,
  Home,
  Settings,
  LogOut,
  Truck,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle2,
  BadgeAlert,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 border-r glass h-screen fixed left-0 top-0 bg-gradient-to-b from-background to-secondary/20">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            SupplyChain
          </Link>
        </div>
        <nav className="px-4 space-y-2">
          {[
            { icon: Home, label: "Home", path: "/", active: false },
            { icon: BarChart, label: "Analytics", path: "/dashboard", active: true },
            { icon: Package, label: "Shipments", path: "/shipments", active: false },
            { icon: Users, label: "Partners", path: "/partners", active: false },
            { icon: Activity, label: "Activity", path: "/activity", active: false },
            { icon: Settings, label: "Settings", path: "/settings", active: false },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start transition-all duration-200 ${
                item.active
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "hover:bg-primary/5"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 px-4 w-full">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => navigate("/")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <header className="border-b glass p-4 bg-gradient-to-r from-background to-secondary/20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Administrator</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Active Shipments",
                value: "24",
                icon: Package,
                trend: "+12%",
                trendUp: true,
                gradient: "from-blue-600 to-blue-400",
              },
              {
                title: "Partners",
                value: "12",
                icon: Users,
                trend: "+3",
                trendUp: true,
                gradient: "from-purple-600 to-purple-400",
              },
              {
                title: "Transactions",
                value: "156",
                icon: Activity,
                trend: "+23%",
                trendUp: true,
                gradient: "from-indigo-600 to-indigo-400",
              },
              {
                title: "Revenue",
                value: "$45,231",
                icon: TrendingUp,
                trend: "+8%",
                trendUp: true,
                gradient: "from-green-600 to-green-400",
              },
            ].map((stat, index) => (
              <div key={index} className="glass-card border border-purple-500/20 shadow-lg shadow-purple-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className={`text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                      {stat.value}
                    </h3>
                    <p className={`text-sm mt-1 ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                      {stat.trend}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Shipments */}
            <div className="glass-card border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Recent Shipments
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "SHP001",
                    destination: "New York, USA",
                    status: "In Transit",
                    icon: Truck,
                    time: "2 hours ago",
                  },
                  {
                    id: "SHP002",
                    destination: "London, UK",
                    status: "Delivered",
                    icon: CheckCircle2,
                    time: "5 hours ago",
                  },
                  {
                    id: "SHP003",
                    destination: "Tokyo, Japan",
                    status: "Pending",
                    icon: Clock,
                    time: "1 day ago",
                  },
                ].map((shipment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <shipment.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{shipment.id}</p>
                        <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{shipment.status}</p>
                      <p className="text-xs text-muted-foreground">{shipment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="glass-card border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                System Alerts
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "System Update",
                    description: "Scheduled maintenance in 2 days",
                    icon: AlertTriangle,
                    severity: "warning",
                  },
                  {
                    title: "New Partner Request",
                    description: "3 new partnership requests pending",
                    icon: Users,
                    severity: "info",
                  },
                  {
                    title: "Security Alert",
                    description: "Unusual activity detected in shipping route",
                    icon: BadgeAlert,
                    severity: "error",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      alert.severity === "warning"
                        ? "bg-yellow-500/10"
                        : alert.severity === "error"
                        ? "bg-red-500/10"
                        : "bg-blue-500/10"
                    }`}
                  >
                    <alert.icon className={`h-5 w-5 ${
                      alert.severity === "warning"
                        ? "text-yellow-500"
                        : alert.severity === "error"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`} />
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
