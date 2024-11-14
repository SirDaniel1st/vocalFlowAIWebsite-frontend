import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PhoneCall,
  CheckCircle2,
  Clock,
  BarChart2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface CampaignMetricsProps {
  metrics: {
    totalCalls: number;
    completedCalls: number;
    successRate: number;
    responseRate: number;
    averageDuration: string;
    engagementScore: number;
  };
}

export function CampaignMetrics({ metrics }: CampaignMetricsProps) {
  const metricCards = [
    {
      title: "Total Calls",
      value: metrics.totalCalls.toLocaleString(),
      secondaryValue: `${metrics.completedCalls.toLocaleString()} completed`,
      icon: PhoneCall,
      color: "text-blue-500",
      progress: (metrics.completedCalls / metrics.totalCalls) * 100
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate}%`,
      secondaryValue: "vs. 85% target",
      icon: CheckCircle2,
      color: "text-green-500",
      progress: metrics.successRate,
      trend: "up"
    },
    {
      title: "Response Rate",
      value: `${metrics.responseRate}%`,
      secondaryValue: "vs. 75% target",
      icon: BarChart2,
      color: "text-purple-500",
      progress: metrics.responseRate,
      trend: "up"
    },
    {
      title: "Avg. Duration",
      value: metrics.averageDuration,
      secondaryValue: "vs. 3m target",
      icon: Clock,
      color: "text-orange-500",
      progress: 75,
      trend: "down"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : 
                         metric.trend === "down" ? TrendingDown : 
                         null;
        const trendColor = metric.trend === "up" ? "text-green-500" : "text-red-500";
        
        return (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <p className="text-sm font-medium">{metric.title}</p>
                </div>
                {TrendIcon && (
                  <div className={`flex items-center text-sm ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{metric.secondaryValue}</span>
                </div>
                <Progress value={metric.progress} className="h-1" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}