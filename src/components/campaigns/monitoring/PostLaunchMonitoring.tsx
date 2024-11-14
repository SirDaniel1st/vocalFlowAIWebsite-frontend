import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  AlertTriangle,
  Phone,
  PhoneCall,
  PhoneOff,
  CheckCircle2,
  Clock,
  BarChart2,
  Users,
  Volume2,
  Loader2,
} from 'lucide-react';

interface PostLaunchMonitoringProps {
  campaignId: string;
}

export function PostLaunchMonitoring({ campaignId }: PostLaunchMonitoringProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePauseResume = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsPaused(!isPaused);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Campaign {isPaused ? 'Resumed' : 'Paused'}</span>
          </div>
        ),
        description: `Campaign has been ${isPaused ? 'resumed' : 'paused'} successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Action Failed</span>
          </div>
        ),
        description: "Failed to update campaign status. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = [
    {
      label: "Total Calls",
      value: "156",
      change: "+12",
      icon: Phone,
      color: "text-blue-500",
      progress: 75,
    },
    {
      label: "Success Rate",
      value: "85%",
      change: "+2.3%",
      icon: CheckCircle2,
      color: "text-green-500",
      progress: 85,
    },
    {
      label: "Avg. Duration",
      value: "3m 24s",
      change: "-12s",
      icon: Clock,
      color: "text-orange-500",
      progress: 65,
    },
  ];

  const liveStatus = [
    { status: "in-progress", count: 4 },
    { status: "queued", count: 8 },
    { status: "completed", count: 144 },
    { status: "failed", count: 12 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'text-green-500';
      case 'queued':
        return 'text-blue-500';
      case 'completed':
        return 'text-gray-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <PhoneCall className="h-4 w-4" />;
      case 'queued':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'failed':
        return <PhoneOff className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={`fixed right-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-12'
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-10 top-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <Card className="h-full rounded-none border-l">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Campaign Monitor</CardTitle>
              <CardDescription>Real-time performance tracking</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isPaused ? "default" : "secondary"}
                    size="sm"
                    onClick={handlePauseResume}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isPaused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPaused ? 'Resume Campaign' : 'Pause Campaign'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Real-Time Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Real-Time Metrics</h3>
            <div className="space-y-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${metric.color}`} />
                        <span>{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metric.value}</span>
                        <span className="text-xs text-muted-foreground">
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <Progress value={metric.progress} className="h-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Call Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Live Status</h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {liveStatus.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                      </span>
                      <span className="capitalize">{item.status}</span>
                    </div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Response Rate
                    </div>
                    <div className="text-lg font-bold">68%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Voice Quality
                    </div>
                    <div className="text-lg font-bold">95%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Health */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Campaign Health</span>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                Healthy
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              All systems operating normally. Performance metrics within expected ranges.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}