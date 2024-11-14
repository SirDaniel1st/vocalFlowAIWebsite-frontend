import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { 
  Search,
  Filter,
  Clock,
  UserCog,
  Settings,
  Users,
  Megaphone,
  FileEdit,
  Shield,
  Loader2
} from "lucide-react";

const actionTypeIcons: Record<string, any> = {
  campaign: Megaphone,
  contact: Users,
  permission: Shield,
  setting: Settings,
  user: UserCog,
  document: FileEdit,
};

interface ActivityLog {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  actionType: string;
  description: string;
  timestamp: string;
  metadata?: {
    before?: string;
    after?: string;
    target?: string;
  };
}

export function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const loadMoreLogs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = [
        { name: "Sarah Wilson", email: "sarah@example.com" },
        { name: "Michael Chen", email: "michael@example.com" },
        { name: "Emma Thompson", email: "emma@example.com" }
      ];

      const actions = [
        { type: "campaign", desc: "Modified campaign settings" },
        { type: "contact", desc: "Updated contact information" },
        { type: "permission", desc: "Changed user permissions" },
        { type: "setting", desc: "Updated system settings" },
        { type: "user", desc: "Modified user profile" },
        { type: "document", desc: "Updated documentation" }
      ];

      const newLogs = Array.from({ length: 10 }, () => {
        const user = users[Math.floor(Math.random() * users.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const timestamp = new Date(Date.now() - Math.random() * 86400000 * 7);

        return {
          id: generateUniqueId(),
          userId: Math.floor(Math.random() * 5) + 1,
          userName: user.name,
          userEmail: user.email,
          actionType: action.type,
          description: action.desc,
          timestamp: timestamp.toISOString(),
          metadata: {
            target: `Target #${Math.floor(Math.random() * 1000)}`,
          },
        };
      });

      setLogs(prev => [...prev, ...newLogs]);
      setHasMore(page < 5); // Simulate limited data
      setPage(prev => prev + 1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load activity logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreLogs();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreLogs();
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>Track user actions and system changes</CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
                <SelectItem value="michael">Michael Chen</SelectItem>
                <SelectItem value="emma">Emma Thompson</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="campaign">Campaign Changes</SelectItem>
                <SelectItem value="contact">Contact Updates</SelectItem>
                <SelectItem value="permission">Permission Changes</SelectItem>
                <SelectItem value="setting">Setting Updates</SelectItem>
                <SelectItem value="user">User Management</SelectItem>
                <SelectItem value="document">Document Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea 
          className="h-[600px] pr-4"
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            {logs.map((log) => {
              const Icon = actionTypeIcons[log.actionType] || FileEdit;
              
              return (
                <div
                  key={log.id}
                  className="flex gap-4 p-4 rounded-lg border bg-card transition-colors hover:bg-muted/50"
                >
                  <div className={`rounded-full p-2 h-fit ${
                    log.actionType === 'permission' ? 'bg-yellow-500/10 text-yellow-500' :
                    log.actionType === 'campaign' ? 'bg-purple-500/10 text-purple-500' :
                    log.actionType === 'contact' ? 'bg-green-500/10 text-green-500' :
                    log.actionType === 'setting' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-gray-500/10 text-gray-500'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{log.userName}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {log.description}
                    </p>

                    {log.metadata && (
                      <div className="flex gap-2 mt-2">
                        {log.metadata.target && (
                          <Badge variant="outline">
                            {log.metadata.target}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="flex gap-4 p-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!hasMore && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No more logs to load
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}