import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Users, UserCheck, Clock, ShieldAlert } from 'lucide-react';

const stats = [
  {
    title: "Total Users",
    value: "156",
    change: "+12",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Active Users",
    value: "142",
    change: "+8",
    icon: UserCheck,
    color: "text-green-500"
  },
  {
    title: "Pending Invites",
    value: "8",
    change: "-2",
    icon: Clock,
    color: "text-yellow-500"
  },
  {
    title: "Security Alerts",
    value: "2",
    change: "0",
    icon: ShieldAlert,
    color: "text-red-500"
  }
];

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-xs text-muted-foreground">
                      {stat.change} this month
                    </span>
                  </div>
                </div>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}