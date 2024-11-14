import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare, Clock, ThumbsUp } from "lucide-react";
import { format } from "date-fns";

interface EngagementHistoryItem {
  id: number;
  type: 'call' | 'email' | 'message';
  date: string;
  duration?: string;
  sentiment?: number;
  summary?: string;
  status?: string;
}

interface ContactEngagementProps {
  engagementHistory: EngagementHistoryItem[];
}

export function ContactEngagement({ engagementHistory }: ContactEngagementProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'email':
        return Mail;
      case 'message':
        return MessageSquare;
      default:
        return MessageSquare;
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.7) return 'text-green-500';
    if (sentiment >= 0.4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {engagementHistory.map((item) => {
            const Icon = getIcon(item.type);
            
            return (
              <div
                key={item.id}
                className="relative grid gap-4 pl-10 pb-4 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[10px] w-2 h-2 rounded-full bg-primary ring-4 ring-background" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    {item.duration && (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </Badge>
                    )}
                    {item.status && (
                      <Badge variant="outline">
                        {item.status}
                      </Badge>
                    )}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className={`h-4 w-4 ${
                            item.sentiment ? getSentimentColor(item.sentiment) : 'text-muted-foreground'
                          }`} />
                          {item.sentiment && (
                            <span className="text-sm">
                              {Math.round(item.sentiment * 100)}%
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sentiment Score</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {item.summary && (
                  <p className="text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                )}

                <div className="text-xs text-muted-foreground">
                  {format(new Date(item.date), 'MMM dd, yyyy HH:mm')}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}