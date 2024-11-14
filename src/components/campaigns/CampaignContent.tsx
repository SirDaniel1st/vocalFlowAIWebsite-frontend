import { useState } from 'react';
import { CampaignStats } from './CampaignStats';
import { CampaignTable } from './CampaignTable';
import { CampaignFilters } from './CampaignFilters';
import { CreateCampaignDialog } from './CreateCampaignDialog/CreateCampaignDialog';
import { PostLaunchMonitoring } from './monitoring/PostLaunchMonitoring';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Download, BarChart2 } from 'lucide-react';

export function CampaignContent() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Export Started",
        description: "Your campaign data will be ready for download shortly.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting campaign data.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Create and manage your voice campaigns
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create Campaign
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <CampaignStats />

      {/* Filters */}
      <CampaignFilters />

      {/* Campaigns Table */}
      <CampaignTable />

      {/* Create Campaign Dialog */}
      <CreateCampaignDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />

      {/* Post-Launch Monitoring Panel */}
      <PostLaunchMonitoring campaignId="active-campaign-id" />
    </div>
  );
}