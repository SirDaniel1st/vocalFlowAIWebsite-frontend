import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  ThumbsUp,
  ThumbsDown,
  Minus,
  FileText,
  Download
} from 'lucide-react';

interface Transcript {
  id: number;
  contactName: string;
  date: string;
  duration: string;
  sentiment: string;
  summary: string;
  status: string;
}

interface CampaignTranscriptsProps {
  transcripts: Transcript[];
}

export function CampaignTranscripts({ transcripts }: CampaignTranscriptsProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Call Transcripts</CardTitle>
            <CardDescription>
              Detailed records of campaign interactions
            </CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Accordion type="single" collapsible className="space-y-4">
            {transcripts.map((transcript) => (
              <AccordionItem
                key={transcript.id}
                value={transcript.id.toString()}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {transcript.contactName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(transcript.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {transcript.duration}
                      </Badge>
                      {getSentimentIcon(transcript.sentiment)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        {transcript.summary}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View Full Transcript
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}