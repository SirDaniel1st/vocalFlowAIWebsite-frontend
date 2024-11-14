import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./DateRangePicker";
import { EngagementChart } from "./EngagementChart";
import { CallTrendsChart } from "./CallTrendsChart";
import { MetricsGrid } from "./MetricsGrid";
import { Download, FileDown, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export function AnalyticsContent() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
          <p className="text-muted-foreground">
            Monitor campaign performance and engagement metrics
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Filters</CardTitle>
          <CardDescription>Customize your analytics view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="grid gap-2 flex-1">
              <label className="text-sm font-medium">Campaign</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="summer">Summer Product Launch</SelectItem>
                  <SelectItem value="feedback">Customer Feedback Survey</SelectItem>
                  <SelectItem value="upgrade">Service Upgrade Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2 flex-1">
              <label className="text-sm font-medium">Segment</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="new">New Leads</SelectItem>
                  <SelectItem value="existing">Existing Customers</SelectItem>
                  <SelectItem value="premium">Premium Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2 flex-1">
              <label className="text-sm font-medium">Date Range</label>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            
            <Button className="gap-2">
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <MetricsGrid />

      {/* Charts Section */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Rates</CardTitle>
            <CardDescription>Campaign engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Trends</CardTitle>
            <CardDescription>Daily call volume and success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <CallTrendsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}