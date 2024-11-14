import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe } from 'lucide-react';

interface TimeSlotSelectorProps {
  timeSlots: string[];
  onTimeSlotsChange: (slots: string[]) => void;
  respectTimezones: boolean;
  onRespectTimezonesChange: (value: boolean) => void;
}

const timeSlots = [
  { id: "morning", label: "Morning", time: "09:00-12:00" },
  { id: "afternoon", label: "Afternoon", time: "12:00-17:00" },
  { id: "evening", label: "Evening", time: "17:00-20:00" },
];

export function TimeSlotSelector({
  timeSlots: selectedSlots,
  onTimeSlotsChange,
  respectTimezones,
  onRespectTimezonesChange,
}: TimeSlotSelectorProps) {
  const handleTimeSlotToggle = (slot: string) => {
    onTimeSlotsChange(
      selectedSlots.includes(slot)
        ? selectedSlots.filter(s => s !== slot)
        : [...selectedSlots, slot]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Slots</CardTitle>
        <CardDescription>
          Select preferred calling hours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {timeSlots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedSlots.includes(slot.id) ? "default" : "outline"}
              className="w-full justify-start gap-4"
              onClick={() => handleTimeSlotToggle(slot.id)}
            >
              <Clock className="h-4 w-4" />
              <span className="flex-1 text-left">{slot.label}</span>
              <Badge variant="secondary">
                {slot.time}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label>Respect Contact Timezones</Label>
            <p className="text-sm text-muted-foreground">
              Adjust call times based on contact's local time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={respectTimezones}
              onCheckedChange={onRespectTimezonesChange}
            />
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Selected time slots will be adjusted according to each contact's timezone
            to ensure calls are made during appropriate hours.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}