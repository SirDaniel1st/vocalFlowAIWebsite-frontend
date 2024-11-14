import { DashboardMetrics } from './DashboardMetrics';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { CampaignSummary } from './CampaignSummary';

export function DashboardContent() {
  return (
    <div className="space-y-8 pt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <DashboardMetrics />
      
      <CampaignSummary />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RecentActivity />
        </div>
        <div className="col-span-3">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}