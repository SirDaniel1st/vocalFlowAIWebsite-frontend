import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserPlus, UserCheck, UserMinus } from 'lucide-react';

const stats = [
  {
    title: "Total Contacts",
    value: "12,486",
    change: "+2.5%",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "New Contacts",
    value: "248",
    change: "+14.3%",
    icon: UserPlus,
    color: "text-green-500"
  },
  {
    title: "Active Contacts",
    value: "8,642",
    change: "+5.7%",
    icon: UserCheck,
    color: "text-purple-500"
  },
  {
    title: "Unsubscribed",
    value: "164",
    change: "-2.1%",
    icon: UserMinus,
    color: "text-orange-500"
  }
];

export function ContactStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}