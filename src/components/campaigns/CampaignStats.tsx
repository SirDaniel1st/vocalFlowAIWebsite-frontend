import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Megaphone, 
  Users, 
  PhoneCall,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Megaphone,
    color: "text-blue-500",
    progress: 75
  },
  {
    title: "Total Audience",
    value: "24.5K",
    change: "+5.2K",
    trend: "up",
    icon: Users,
    color: "text-green-500",
    progress: 85
  },
  {
    title: "Completed Calls",
    value: "8,642",
    change: "+1.2K",
    trend: "up",
    icon: PhoneCall,
    color: "text-purple-500",
    progress: 65
  },
  {
    title: "Avg. Duration",
    value: "2m 45s",
    change: "-15s",
    trend: "down",
    icon: Clock,
    color: "text-orange-500",
    progress: 45
  }
];

export function CampaignStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = stat.trend === "up" ? "text-green-500" : "text-red-500";
        
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <p className="text-sm font-medium">{stat.title}</p>
                </div>
                <div className={`flex items-center text-sm ${trendColor}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <Progress value={stat.progress} className="h-1" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}