import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Volume2,
  Check,
  AlertTriangle,
  Loader2
} from 'lucide-react';

interface CampaignReviewProps {
  data: any;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function CampaignReview({ data, onSubmit, isSubmitting }: CampaignReviewProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getValidationStatus = () => {
    const checks = [
      {
        label: "Campaign name provided",
        passed: !!data.name,
      },
      {
        label: "Target segments selected",
        passed: data.segments.length > 0,
      },
      {
        label: "Voice settings configured",
        passed: !!data.voice.id,
      },
      {
        label: "Schedule defined",
        passed: data.schedule.timeSlots.length > 0,
      },
      {
        label: "Message script created",
        passed: !!data.message.script,
      },
    ];

    return checks;
  };

  const validationChecks = getValidationStatus();
  const isValid = validationChecks.every(check => check.passed);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Name</h4>
              <p className="text-sm text-muted-foreground">{data.name}</p>
            </div>
            <div>
              <h4 className="font-medium">Target Segments</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.segments.map((segment: string) => (
                  <Badge key={segment} variant="secondary">
                    <Users className="mr-1 h-3 w-3" />
                    {segment}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voice Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span>
                {data.voice.gender} · {data.voice.accent} · {data.voice.tone}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(data.schedule.startDate)} - {formatDate(data.schedule.endDate)}
              </span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Time Slots</h4>
              <div className="flex flex-wrap gap-2">
                {data.schedule.timeSlots.map((slot: any, index: number) => (
                  <Badge key={index} variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {slot.day} {slot.startTime}-{slot.endTime}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[100px] rounded-md border p-4">
              <p className="text-sm text-muted-foreground">{data.message.script}</p>
            </ScrollArea>
            <div className="flex flex-wrap gap-2">
              {data.message.personalization.map((token: string) => (
                <Badge key={token} variant="secondary">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {token}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Validation Status</CardTitle>
          <CardDescription>
            Ensure all requirements are met before creating the campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {validationChecks.map((check, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <span className="text-sm">{check.label}</span>
                {check.passed ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Campaign...
          </>
        ) : (
          'Create Campaign'
        )}
      </Button>
    </div>
  );
}