import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';

interface CampaignSentimentProps {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export function CampaignSentiment({ sentiment }: CampaignSentimentProps) {
  const sentimentData = [
    {
      label: "Positive",
      value: sentiment.positive,
      icon: ThumbsUp,
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      label: "Neutral",
      value: sentiment.neutral,
      icon: Minus,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      label: "Negative",
      value: sentiment.negative,
      icon: ThumbsDown,
      color: "text-red-500",
      bgColor: "bg-red-500",
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>
          Customer sentiment distribution across all calls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stacked Progress Bar */}
          <div className="h-4 w-full rounded-full overflow-hidden flex">
            {sentimentData.map((item) => (
              <div
                key={item.label}
                className={`${item.bgColor} transition-all`}
                style={{ width: `${item.value}%` }}
              />
            ))}
          </div>

          {/* Sentiment Breakdown */}
          <div className="grid gap-4">
            {sentimentData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress 
                      value={item.value} 
                      className={`w-32 h-2 ${item.bgColor}/20`} 
                    />
                    <span className="w-12 text-right font-medium">
                      {item.value}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}