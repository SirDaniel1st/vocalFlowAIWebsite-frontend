import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Megaphone,
  Users,
  BarChart3,
  CalendarClock,
  SmilePlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const metrics = [
  {
    title: "Active Campaigns",
    value: "24",
    change: "+3",
    changeLabel: "from last week",
    trend: "up",
    icon: Megaphone,
    color: "text-blue-500",
    progress: 75,
  },
  {
    title: "Total Contacts Engaged",
    value: "12,486",
    change: "+2.5k",
    changeLabel: "this month",
    trend: "up",
    icon: Users,
    color: "text-green-500",
    progress: 85,
  },
  {
    title: "Engagement Rate",
    value: "68%",
    change: "+5.2%",
    changeLabel: "vs last month",
    trend: "up",
    icon: BarChart3,
    color: "text-purple-500",
    progress: 68,
  },
  {
    title: "Upcoming Calls",
    value: "47",
    change: "Next 24h",
    changeLabel: "scheduled",
    trend: "neutral",
    icon: CalendarClock,
    color: "text-orange-500",
    progress: 45,
  },
  {
    title: "Customer Sentiment",
    value: "4.6/5",
    change: "-0.2",
    changeLabel: "from last week",
    trend: "down",
    icon: SmilePlus,
    color: "text-yellow-500",
    progress: 92,
  }
];

export function DashboardMetrics() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : 
                          metric.trend === "down" ? TrendingDown : 
                          null;
          
          return (
            <Card key={metric.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", metric.color)} />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    {TrendIcon && (
                      <span className={cn(
                        "flex items-center text-xs gap-0.5",
                        metric.trend === "up" ? "text-green-500" : "text-red-500"
                      )}>
                        <TrendIcon className="h-3 w-3" />
                        {metric.change}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Progress value={metric.progress} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      {metric.changeLabel}
                    </p>
                  </div>
                </div>
              </CardContent>
              
              {/* Decorative gradient overlay */}
              <div className={cn(
                "absolute inset-0 opacity-5",
                "bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))]",
                `from-${metric.color.split('-')[1]}-500/50 to-transparent`
              )} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}