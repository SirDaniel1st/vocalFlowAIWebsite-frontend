import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface ToneCustomizerProps {
  tone: {
    formality: number;
    enthusiasm: number;
    pace: number;
  };
  onToneChange: (key: string, value: number) => void;
}

export function ToneCustomizer({ tone, onToneChange }: ToneCustomizerProps) {
  const toneSettings = [
    {
      key: "formality",
      label: "Formality",
      description: "Adjust how formal or casual the voice sounds",
      min: "Casual",
      max: "Formal",
    },
    {
      key: "enthusiasm",
      label: "Enthusiasm",
      description: "Control the level of energy in the voice",
      min: "Calm",
      max: "Energetic",
    },
    {
      key: "pace",
      label: "Speaking Pace",
      description: "Set the speed of speech delivery",
      min: "Slower",
      max: "Faster",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Tone Adjustment</CardTitle>
            <CardDescription>
              Fine-tune the voice characteristics
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust sliders to customize the voice tone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {toneSettings.map(({ key, label, description, min, max }) => (
          <div key={key} className="space-y-4">
            <div className="space-y-1">
              <Label>{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="space-y-2">
              <Slider
                value={[tone[key as keyof typeof tone]]}
                onValueChange={([value]) => onToneChange(key, value)}
                max={100}
                step={1}
              />
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">{min}</span>
                <span className="text-xs text-muted-foreground">{max}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}