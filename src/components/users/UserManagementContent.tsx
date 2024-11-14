import { useState } from 'react';
import { UserTable } from './UserTable';
import { UserStats } from './UserStats';
import { UserFilters } from './UserFilters';
import { ActivityLogs } from './activity/ActivityLogs';
import { InviteUserDialog } from './InviteUserDialog';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Download, Upload, AlertTriangle } from 'lucide-react';

export function UserManagementContent() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExportUsers = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Export Started",
        description: "Your user data export will be ready shortly.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Export Failed</span>
          </div>
        ),
        description: "There was an error exporting user data. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions across your organization
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="gap-2" onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Invite User
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExportUsers}>
            <Download className="h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <UserStats />

      {/* Filters */}
      <UserFilters />

      {/* User Table */}
      <UserTable />

      {/* Activity Logs */}
      <ActivityLogs />

      {/* Invite Dialog */}
      <InviteUserDialog 
        open={isInviteDialogOpen} 
        onOpenChange={setIsInviteDialogOpen}
      />
    </div>
  );
}