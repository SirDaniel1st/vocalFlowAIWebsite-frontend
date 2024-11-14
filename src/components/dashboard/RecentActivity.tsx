import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Phone, User, Volume2, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const activities = [
  {
    icon: Phone,
    title: "Incoming Call Handled",
    description: "AI Assistant handled customer inquiry about billing",
    time: "2 minutes ago",
    status: "success",
    type: "calls"
  },
  {
    icon: Bot,
    title: "New Assistant Created",
    description: "Sales team created 'Product Specialist' assistant",
    time: "1 hour ago",
    status: "info",
    type: "assistants"
  },
  {
    icon: Volume2,
    title: "Voice Model Updated",
    description: "Updated voice model for customer service",
    time: "3 hours ago",
    status: "info",
    type: "system"
  },
  {
    icon: User,
    title: "New Team Member",
    description: "Sarah Johnson joined the workspace",
    time: "5 hours ago",
    status: "info",
    type: "team"
  },
  {
    icon: Phone,
    title: "Outbound Campaign Started",
    description: "Summer promotion campaign initiated",
    time: "6 hours ago",
    status: "success",
    type: "calls"
  },
  {
    icon: Bot,
    title: "Assistant Performance Report",
    description: "Monthly performance metrics updated",
    time: "8 hours ago",
    status: "info",
    type: "assistants"
  }
];

const activityTypes = [
  { label: "All Activities", value: "all" },
  { label: "Calls", value: "calls" },
  { label: "Assistants", value: "assistants" },
  { label: "Team", value: "team" },
  { label: "System", value: "system" }
];

export function RecentActivity() {
  const [filter, setFilter] = useState("all");

  const filteredActivities = activities.filter(
    activity => filter === "all" || activity.type === filter
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your workspace</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {activityTypes.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onClick={() => setFilter(type.value)}
                className="cursor-pointer"
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className={`rounded-full p-2 ${
                    activity.status === "success" 
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20" 
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/20"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}