import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface Permission {
  id: string;
  label: string;
  description: string;
}

const availablePermissions: Permission[] = [
  {
    id: "view_dashboard",
    label: "View Dashboard",
    description: "Access to view main dashboard and analytics"
  },
  {
    id: "manage_campaigns",
    label: "Manage Campaigns",
    description: "Create, edit, and delete voice campaigns"
  },
  {
    id: "manage_contacts",
    label: "Manage Contacts",
    description: "Add, edit, and delete contact information"
  },
  {
    id: "view_reports",
    label: "View Reports",
    description: "Access to analytics and reporting features"
  },
  {
    id: "manage_team",
    label: "Manage Team",
    description: "Add and remove team members"
  },
  {
    id: "manage_billing",
    label: "Manage Billing",
    description: "Access to billing and subscription settings"
  },
  {
    id: "export_data",
    label: "Export Data",
    description: "Ability to export contact and campaign data"
  },
  {
    id: "manage_settings",
    label: "Manage Settings",
    description: "Configure system and workspace settings"
  }
];

interface EditPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
  onSave: (userId: number, role: string, permissions: string[]) => void;
}

export function EditPermissionsDialog({
  open,
  onOpenChange,
  user,
  onSave,
}: EditPermissionsDialogProps) {
  const [role, setRole] = useState(user.role);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(user.permissions);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(current =>
      current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSave = async () => {
    if (selectedPermissions.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Invalid Permissions</span>
          </div>
        ),
        description: "User must have at least one permission.",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(user.id, role, selectedPermissions);
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Permissions Updated</span>
          </div>
        ),
        description: "User permissions have been successfully updated.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Error</span>
          </div>
        ),
        description: "Failed to update permissions. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User Permissions</DialogTitle>
          <DialogDescription>
            Modify role and permissions for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>User Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {availablePermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <Checkbox
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}