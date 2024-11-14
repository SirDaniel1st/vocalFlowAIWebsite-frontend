import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CalendarSchedule } from './schedule/CalendarSchedule';
import { TimeSlotSelector } from './schedule/TimeSlotSelector';
import { FrequencySettings } from './schedule/FrequencySettings';
import { PacingControls } from './schedule/PacingControls';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CallSchedulingProps {
  data: any;
  onComplete: (data: any) => void;
}

export function CallScheduling({ data, onComplete }: CallSchedulingProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: data.schedule?.startDate || undefined,
    to: data.schedule?.endDate || undefined,
  });
  
  const [frequency, setFrequency] = useState(data.schedule?.frequency || 'daily');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    data.schedule?.days || []
  );
  const [timeSlots, setTimeSlots] = useState(data.schedule?.timeSlots || []);
  const [retryAttempts, setRetryAttempts] = useState(data.schedule?.retryAttempts || 3);
  const [pacing, setPacing] = useState({
    callsPerHour: data.schedule?.pacing?.callsPerHour || 50,
    maxConcurrent: data.schedule?.pacing?.maxConcurrent || 10,
  });
  const [respectTimezones, setRespectTimezones] = useState(
    data.schedule?.respectTimezones || true
  );
  
  const { toast } = useToast();

  const handleContinue = () => {
    if (!date?.from || !date?.to) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Missing Dates</span>
          </div>
        ),
        description: "Please select campaign start and end dates.",
      });
      return;
    }

    if (timeSlots.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>No Time Slots</span>
          </div>
        ),
        description: "Please select at least one time slot.",
      });
      return;
    }

    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Schedule Saved</span>
        </div>
      ),
      description: "Your campaign schedule has been saved.",
    });

    onComplete({
      schedule: {
        startDate: date.from,
        endDate: date.to,
        frequency,
        days: selectedDays,
        timeSlots,
        retryAttempts,
        pacing,
        respectTimezones,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar and Date Selection */}
        <CalendarSchedule
          date={date}
          onDateChange={setDate}
          selectedDays={selectedDays}
          onDaysChange={setSelectedDays}
        />

        {/* Time Slots */}
        <TimeSlotSelector
          timeSlots={timeSlots}
          onTimeSlotsChange={setTimeSlots}
          respectTimezones={respectTimezones}
          onRespectTimezonesChange={setRespectTimezones}
        />
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Frequency Settings */}
        <FrequencySettings
          frequency={frequency}
          onFrequencyChange={setFrequency}
          retryAttempts={retryAttempts}
          onRetryAttemptsChange={setRetryAttempts}
        />

        {/* Pacing Controls */}
        <PacingControls
          pacing={pacing}
          onPacingChange={setPacing}
        />
      </div>

      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={!date?.from || !date?.to || timeSlots.length === 0}
      >
        Save and Continue
      </Button>
    </div>
  );
}