import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarScheduleProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  selectedDays: string[];
  onDaysChange: (days: string[]) => void;
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function CalendarSchedule({
  date,
  onDateChange,
  selectedDays,
  onDaysChange,
}: CalendarScheduleProps) {
  const handleDayToggle = (day: string) => {
    onDaysChange(
      selectedDays.includes(day)
        ? selectedDays.filter(d => d !== day)
        : [...selectedDays, day]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Duration</CardTitle>
        <CardDescription>
          Set campaign dates and active days
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border"
        />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {date?.from ? (
              <>
                {date.to ? (
                  `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
                ) : (
                  date.from.toLocaleDateString()
                )}
              </>
            ) : (
              "Select date range"
            )}
          </span>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <Label>Active Days</Label>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-2"
                >
                  <Label htmlFor={day} className="flex items-center gap-2">
                    {day}
                  </Label>
                  <Switch
                    id={day}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex flex-wrap gap-2">
            {selectedDays.map((day) => (
              <Badge key={day} variant="secondary">
                {day}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}