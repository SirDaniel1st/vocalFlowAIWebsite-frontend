import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  UserPlus, 
  BarChart2, 
  Users2, 
  Bot, 
  Headphones,
  Settings,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const primaryActions = [
  {
    icon: Megaphone,
    label: "Start New Campaign",
    description: "Create and launch a new voice campaign",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/campaigns/new"
  },
  {
    icon: UserPlus,
    label: "Add Contact",
    description: "Add new contacts to your database",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/contacts/new"
  },
  {
    icon: BarChart2,
    label: "View Reports",
    description: "Access detailed analytics and insights",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/analytics"
  },
  {
    icon: Users2,
    label: "User Management",
    description: "Manage team access and permissions",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/users"
  }
];

const secondaryActions = [
  {
    icon: Bot,
    label: "AI Assistants",
    description: "Configure voice assistants",
    href: "/assistants"
  },
  {
    icon: Headphones,
    label: "Voice Library",
    description: "Manage voice models",
    href: "/voices"
  },
  {
    icon: Phone,
    label: "Test Call",
    description: "Try your assistant in action",
    href: "/test-call"
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Configure workspace settings",
    href: "/settings"
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access frequently used features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {primaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 group hover:border-primary/20 transition-all"
                asChild
              >
                <a href={action.href}>
                  <div className={cn(
                    "rounded-lg p-2 transition-colors",
                    action.bgColor,
                    "group-hover:bg-primary/10"
                  )}>
                    <Icon className={cn("h-5 w-5", action.color, "group-hover:text-primary")} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {action.label}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {secondaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                className="h-auto flex flex-col items-center gap-2 p-4 group"
                asChild
              >
                <a href={action.href}>
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-center">
                    <div className="font-medium text-sm group-hover:text-primary transition-colors">
                      {action.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}