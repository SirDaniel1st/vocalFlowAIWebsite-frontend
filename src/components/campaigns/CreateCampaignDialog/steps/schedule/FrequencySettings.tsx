import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, PhoneOff } from 'lucide-react';

interface FrequencySettingsProps {
  frequency: string;
  onFrequencyChange: (value: string) => void;
  retryAttempts: number;
  onRetryAttemptsChange: (value: number) => void;
}

const frequencies = [
  {
    value: "daily",
    label: "Daily",
    description: "Contact each number once per day",
  },
  {
    value: "custom",
    label: "Custom",
    description: "Set custom interval between attempts",
  },
];

export function FrequencySettings({
  frequency,
  onFrequencyChange,
  retryAttempts,
  onRetryAttemptsChange,
}: FrequencySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Frequency</CardTitle>
        <CardDescription>
          Set retry attempts and intervals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={frequency}
          onValueChange={onFrequencyChange}
          className="space-y-4"
        >
          {frequencies.map((f) => (
            <div key={f.value} className="flex items-center space-x-2">
              <RadioGroupItem value={f.value} id={f.value} />
              <Label htmlFor={f.value} className="flex-1">
                <div className="flex items-center justify-between">
                  <span>{f.label}</span>
                  {f.value === frequency && (
                    <Badge variant="secondary" className="gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {f.description}
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Retry Attempts</Label>
            <div className="flex items-center gap-2">
              <PhoneOff className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {retryAttempts} attempts
              </span>
            </div>
          </div>
          <Slider
            value={[retryAttempts]}
            onValueChange={([value]) => onRetryAttemptsChange(value)}
            max={5}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 attempt</span>
            <span>5 attempts</span>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            System will attempt to reach unresponsive contacts up to {retryAttempts} times
            with {frequency === 'daily' ? 'daily intervals' : 'custom spacing'} between attempts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}