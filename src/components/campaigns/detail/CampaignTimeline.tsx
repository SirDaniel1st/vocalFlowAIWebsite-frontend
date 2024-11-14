import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  CheckCircle2,
  Flag,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'start' | 'milestone' | 'checkpoint';
}

interface CampaignTimelineProps {
  milestones: Milestone[];
}

export function CampaignTimeline({ milestones }: CampaignTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'start':
        return Play;
      case 'milestone':
        return Flag;
      case 'checkpoint':
        return CheckCircle2;
      default:
        return AlertCircle;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'text-green-500 bg-green-500/10';
      case 'milestone':
        return 'text-purple-500 bg-purple-500/10';
      case 'checkpoint':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Timeline</CardTitle>
        <CardDescription>
          Key milestones and progress tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          {milestones.map((milestone, index) => {
            const Icon = getIcon(milestone.type);
            const iconColor = getIconColor(milestone.type);
            
            return (
              <div
                key={milestone.id}
                className="relative grid gap-4 pl-12 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className={`absolute left-[14px] p-2 rounded-full ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(milestone.date)}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}