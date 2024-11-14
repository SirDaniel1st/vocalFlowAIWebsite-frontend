import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Volume2, Play, Pause, Radio } from 'lucide-react';
import { useState } from 'react';

interface VoicePreviewProps {
  voice: any;
  tone: any;
  language: any;
  isPlaying: boolean;
  onPreviewClick: () => void;
}

const sampleTexts = [
  "Hello! I'm excited to tell you about our latest product updates.",
  "Thank you for being a valued customer. We appreciate your business.",
  "We'd love to schedule a quick call to discuss your needs.",
];

export function VoicePreview({
  voice,
  tone,
  language,
  isPlaying,
  onPreviewClick,
}: VoicePreviewProps) {
  const [volume, setVolume] = useState([80]);
  const [selectedText, setSelectedText] = useState(sampleTexts[0]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Voice Preview</CardTitle>
            <CardDescription>
              Listen to how your voice settings sound
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                className="w-[100px]"
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
              />
              <span className="w-12 text-sm text-muted-foreground">
                {volume}%
              </span>
            </div>
            <Button
              variant={isPlaying ? "secondary" : "default"}
              onClick={onPreviewClick}
              className="gap-2"
              disabled={!voice.id}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {voice.id && (
          <div className="flex items-center gap-2">
            <Badge variant="outline">{voice.name}</Badge>
            <Badge variant="secondary">{language.code}</Badge>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary"
            >
              {language.accent}
            </Badge>
          </div>
        )}

        <ScrollArea className="h-[100px] rounded-md border">
          <div className="p-4 space-y-4">
            {sampleTexts.map((text, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedText === text
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedText(text)}
              >
                <p className="text-sm">{text}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {isPlaying && (
          <div className="flex items-center gap-2 text-primary animate-pulse">
            <Radio className="h-4 w-4" />
            <span className="text-sm">Playing preview...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}