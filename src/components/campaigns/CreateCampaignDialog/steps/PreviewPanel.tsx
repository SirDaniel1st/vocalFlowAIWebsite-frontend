import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Volume2, Play } from 'lucide-react';

interface PreviewPanelProps {
  previewText: string;
  isPlaying: boolean;
  volume: number[];
  onPreviewClick: () => void;
}

export function PreviewPanel({
  previewText,
  isPlaying,
  volume,
  onPreviewClick,
}: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>
          See how your message will appear to contacts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {volume}% volume
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onPreviewClick}
          >
            {isPlaying ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Stop Preview
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play Preview
              </>
            )}
          </Button>
        </div>

        <ScrollArea className="h-[400px] rounded-md border bg-muted/50 p-4">
          <div className="space-y-4">
            <div className="rounded-lg bg-background p-4 shadow-sm">
              <p className="text-sm whitespace-pre-wrap">
                {previewText || "Your personalized message will appear here..."}
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}