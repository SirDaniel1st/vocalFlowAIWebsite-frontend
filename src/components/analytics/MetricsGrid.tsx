import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PhoneCall,
  UserCheck,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const metrics = [
  {
    title: "Total Calls",
    value: "12,486",
    change: "+15%",
    trend: "up",
    icon: PhoneCall,
    color: "text-blue-500",
  },
  {
    title: "Success Rate",
    value: "85.2%",
    change: "+2.3%",
    trend: "up",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "Avg. Call Duration",
    value: "3m 24s",
    change: "-12s",
    trend: "down",
    icon: Clock,
    color: "text-orange-500",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = metric.trend === "up" ? "text-green-500" : "text-red-500";
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className={`flex items-center gap-1 text-sm ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    {metric.change}
                  </span>
                </div>
                <Progress value={75} className="h-1" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}