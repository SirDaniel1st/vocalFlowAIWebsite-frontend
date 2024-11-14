import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface VoiceSelectorProps {
  selectedVoice: any;
  onVoiceSelect: (voice: any) => void;
}

const voices = [
  {
    id: "sarah",
    name: "Sarah",
    gender: "female",
    language: "English",
    accent: "American",
    description: "Clear and professional female voice with a natural American accent",
    tags: ["Professional", "Clear", "Trustworthy"],
  },
  {
    id: "michael",
    name: "Michael",
    gender: "male",
    language: "English",
    accent: "British",
    description: "Warm and engaging male voice with a refined British accent",
    tags: ["Warm", "Engaging", "Sophisticated"],
  },
  {
    id: "emma",
    name: "Emma",
    gender: "female",
    language: "English",
    accent: "Australian",
    description: "Friendly and energetic female voice with an Australian accent",
    tags: ["Friendly", "Energetic", "Approachable"],
  },
  {
    id: "david",
    name: "David",
    gender: "male",
    language: "English",
    accent: "American",
    description: "Authoritative and confident male voice with an American accent",
    tags: ["Authoritative", "Confident", "Professional"],
  },
];

export function VoiceSelector({ selectedVoice, onVoiceSelect }: VoiceSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Select Voice</CardTitle>
            <CardDescription>
              Choose a voice that best represents your brand
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Listen to samples to find the perfect voice for your campaign</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <RadioGroup
            value={selectedVoice.id}
            onValueChange={(value) => {
              const voice = voices.find(v => v.id === value);
              if (voice) onVoiceSelect(voice);
            }}
          >
            <div className="grid gap-4">
              {voices.map((voice) => (
                <Label
                  key={voice.id}
                  htmlFor={voice.id}
                  className="cursor-pointer"
                >
                  <div className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                    selectedVoice.id === voice.id ? 'border-primary' : ''
                  }`}>
                    <RadioGroupItem
                      value={voice.id}
                      id={voice.id}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{voice.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {voice.accent}
                          </Badge>
                          <Badge variant="outline">
                            {voice.gender}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {voice.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {voice.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}