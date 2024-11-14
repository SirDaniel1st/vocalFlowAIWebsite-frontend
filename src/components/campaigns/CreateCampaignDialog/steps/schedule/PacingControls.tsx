import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PhoneCall, Info } from 'lucide-react';

interface PacingControlsProps {
  pacing: {
    callsPerHour: number;
    maxConcurrent: number;
  };
  onPacingChange: (pacing: any) => void;
}

export function PacingControls({
  pacing,
  onPacingChange,
}: PacingControlsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Call Pacing</CardTitle>
            <CardDescription>
              Control call volume and rate
            </CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <PhoneCall className="h-3 w-3" />
            {pacing.callsPerHour}/hr
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Calls per Hour</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maximum number of calls initiated per hour</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Slider
            value={[pacing.callsPerHour]}
            onValueChange={([value]) =>
              onPacingChange({ ...pacing, callsPerHour: value })
            }
            max={100}
            step={5}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10/hr</span>
            <span>100/hr</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Concurrent Calls</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maximum number of simultaneous active calls</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Slider
            value={[pacing.maxConcurrent]}
            onValueChange={([value]) =>
              onPacingChange({ ...pacing, maxConcurrent: value })
            }
            max={20}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 calls</span>
            <span>20 calls</span>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Current settings will result in approximately{' '}
            <span className="font-medium">{pacing.callsPerHour * 8}</span> calls per day,
            with up to <span className="font-medium">{pacing.maxConcurrent}</span> concurrent
            active calls.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}