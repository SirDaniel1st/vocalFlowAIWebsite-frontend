import { Search, Filter, Calendar, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function CampaignFilters() {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns by name or segment..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-1 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="outbound">Outbound</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
                <SelectItem value="survey">Survey</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="enterprise">Enterprise Customers</SelectItem>
                <SelectItem value="recent">Recent Signups</SelectItem>
                <SelectItem value="premium">Premium Users</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerWithRange date={date} setDate={setDate} />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Advanced Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Engagement Rate</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-engagement" />
                      <Label htmlFor="high-engagement">High (80%+)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="medium-engagement" />
                      <Label htmlFor="medium-engagement">Medium (50-79%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="low-engagement" />
                      <Label htmlFor="low-engagement">Low (&lt;50%)</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Customer Sentiment</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="positive-sentiment" />
                      <Label htmlFor="positive-sentiment">Positive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="neutral-sentiment" />
                      <Label htmlFor="neutral-sentiment">Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="negative-sentiment" />
                      <Label htmlFor="negative-sentiment">Negative</Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}