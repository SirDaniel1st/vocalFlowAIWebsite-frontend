import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart2, ChevronRight, Users, Clock } from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "Summer Product Launch",
    segment: "New Leads",
    progress: 75,
    engagementRate: 68,
    status: "active",
    startDate: "Jun 15",
    endDate: "Jul 15",
    totalContacts: 2500,
    contactedCount: 1875,
  },
  {
    id: 2,
    name: "Customer Feedback Survey",
    segment: "Existing Customers",
    progress: 45,
    engagementRate: 72,
    status: "active",
    startDate: "Jun 20",
    endDate: "Jul 05",
    totalContacts: 1000,
    contactedCount: 450,
  },
  {
    id: 3,
    name: "Service Upgrade Promotion",
    segment: "Premium Tier",
    progress: 90,
    engagementRate: 85,
    status: "active",
    startDate: "Jun 10",
    endDate: "Jun 30",
    totalContacts: 500,
    contactedCount: 450,
  }
];

export function CampaignSummary() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Campaigns</h2>
          <p className="text-muted-foreground">
            Monitor and manage your ongoing campaign performance
          </p>
        </div>
        <Button>
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-4">
                {/* Campaign Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{campaign.name}</h3>
                    <Badge variant="secondary" className="rounded-full">
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Users className="h-4 w-4" />
                    <span>{campaign.segment}</span>
                  </div>
                </div>

                {/* Progress and Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{campaign.startDate} - {campaign.endDate}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Engagement Rate</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {campaign.engagementRate}%
                      <span className="text-sm text-muted-foreground font-normal ml-2">
                        of target
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                  <div className="text-sm text-right">
                    <p className="font-medium">{formatNumber(campaign.contactedCount)}</p>
                    <p className="text-muted-foreground">of {formatNumber(campaign.totalContacts)} contacted</p>
                  </div>
                  <Button className="gap-2" variant="outline">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}