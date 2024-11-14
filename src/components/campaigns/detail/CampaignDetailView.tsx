import { useState } from 'react';
import { CampaignHeader } from './CampaignHeader';
import { CampaignMetrics } from './CampaignMetrics';
import { CampaignSentiment } from './CampaignSentiment';
import { CampaignTranscripts } from './CampaignTranscripts';
import { CampaignTimeline } from './CampaignTimeline';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

// Mock campaign data
const campaignData = {
  id: 1,
  name: "Summer Product Launch",
  status: "active",
  type: "outbound",
  startDate: "2024-02-01",
  endDate: "2024-02-28",
  segment: "Enterprise Customers",
  metrics: {
    totalCalls: 2500,
    completedCalls: 1875,
    successRate: 92,
    responseRate: 85,
    averageDuration: "2m 45s",
    engagementScore: 78
  },
  sentiment: {
    positive: 65,
    neutral: 25,
    negative: 10
  },
  transcripts: [
    {
      id: 1,
      contactName: "John Smith",
      date: "2024-02-10T14:30:00",
      duration: "3m 15s",
      sentiment: "positive",
      summary: "Customer expressed interest in new features",
      status: "completed"
    },
    {
      id: 2,
      contactName: "Sarah Johnson",
      date: "2024-02-10T15:45:00",
      duration: "2m 30s",
      sentiment: "neutral",
      summary: "General product inquiries discussed",
      status: "completed"
    },
    {
      id: 3,
      contactName: "Michael Brown",
      date: "2024-02-11T09:15:00",
      duration: "4m 00s",
      sentiment: "positive",
      summary: "Demo scheduled for next week",
      status: "completed"
    }
  ],
  milestones: [
    {
      id: 1,
      date: "2024-02-01",
      title: "Campaign Started",
      description: "Initial outreach began",
      type: "start"
    },
    {
      id: 2,
      date: "2024-02-05",
      title: "First 500 Calls",
      description: "Milestone reached with 92% success rate",
      type: "milestone"
    },
    {
      id: 3,
      date: "2024-02-15",
      title: "Mid-Campaign Review",
      description: "Positive sentiment trending upward",
      type: "checkpoint"
    }
  ]
};

export function CampaignDetailView() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Campaigns
      </Button>

      {/* Campaign Header */}
      <CampaignHeader campaign={campaignData} />

      {/* Campaign Metrics */}
      <CampaignMetrics metrics={campaignData.metrics} />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Sentiment Analysis */}
        <CampaignSentiment sentiment={campaignData.sentiment} />

        {/* Timeline */}
        <CampaignTimeline milestones={campaignData.milestones} />
      </div>

      {/* Transcripts */}
      <CampaignTranscripts transcripts={campaignData.transcripts} />
    </div>
  );
}