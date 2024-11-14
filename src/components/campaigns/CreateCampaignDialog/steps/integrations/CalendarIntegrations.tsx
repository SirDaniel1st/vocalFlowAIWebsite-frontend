import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CalendarIntegrationsProps {
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
}

const calendarPlatforms = [
  {
    id: "google",
    name: "Google Calendar",
    description: "Sync appointments and schedule follow-ups",
    icon: "/google-calendar.svg",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Connect with Outlook calendar for scheduling",
    icon: "/outlook.svg",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Automated scheduling and availability management",
    icon: "/calendly.svg",
  },
  {
    id: "zoom",
    name: "Zoom Meetings",
    description: "Create and schedule video meetings automatically",
    icon: "/zoom.svg",
  },
];

export function CalendarIntegrations({
  selectedPlatforms,
  onPlatformsChange,
}: CalendarIntegrationsProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformsChange(selectedPlatforms.filter(id => id !== platformId));
      return;
    }

    setConnecting(platformId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onPlatformsChange([...selectedPlatforms, platformId]);
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Connection Successful</span>
          </div>
        ),
        description: "Calendar integration has been set up.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Connection Failed</span>
          </div>
        ),
        description: "Failed to connect to calendar. Please try again.",
      });
    } finally {
      setConnecting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Integrations</CardTitle>
        <CardDescription>
          Connect your calendar platforms for real-time scheduling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid gap-4">
            {calendarPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {platform.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {selectedPlatforms.includes(platform.id) && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Connected
                    </Badge>
                  )}
                  <Button
                    variant={selectedPlatforms.includes(platform.id) ? "outline" : "default"}
                    onClick={() => handleConnect(platform.id)}
                    disabled={connecting === platform.id}
                  >
                    {connecting === platform.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : selectedPlatforms.includes(platform.id) ? (
                      'Disconnect'
                    ) : (
                      'Connect'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium">Auto-Schedule Appointments</span>
            <span className="text-sm text-muted-foreground">
              Automatically create calendar events for scheduled calls
            </span>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}