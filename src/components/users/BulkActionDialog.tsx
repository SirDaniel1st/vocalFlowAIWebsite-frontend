import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface BulkActionDialogProps {
  action: string | null;
  selectedCount: number;
  onClose: () => void;
  onConfirm: (data?: any) => void;
}

export function BulkActionDialog({
  action,
  selectedCount,
  onClose,
  onConfirm,
}: BulkActionDialogProps) {
  const [role, setRole] = useState<string>("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  if (!action) return null;

  if (action === "delete") {
    return (
      <AlertDialog open={true} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Selected Users</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedCount} selected users? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onConfirm()}
            >
              Remove Users
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  const handleConfirm = async () => {
    if (action === "assignRole" && !role) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a role to continue.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onConfirm(action === "assignRole" ? { role } : { permissions });
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Success</span>
          </div>
        ),
        description: `Successfully updated ${selectedCount} users.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Error</span>
          </div>
        ),
        description: "Failed to update users. Please try again.",
      });
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "assignRole" ? "Assign Role" : 
             action === "changePermissions" ? "Change Permissions" :
             action === "suspend" ? "Suspend Users" : ""}
          </DialogTitle>
          <DialogDescription>
            Apply changes to {selectedCount} selected users
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {action === "assignRole" && (
            <div className="space-y-2">
              <Label>Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {action === "changePermissions" && (
            <div className="space-y-4">
              <Label>Select Permissions</Label>
              <div className="grid gap-3">
                {[
                  { id: "view_dashboard", label: "View Dashboard" },
                  { id: "manage_users", label: "Manage Users" },
                  { id: "manage_billing", label: "Manage Billing" },
                  { id: "view_reports", label: "View Reports" },
                ].map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        setPermissions(prev =>
                          checked
                            ? [...prev, permission.id]
                            : prev.filter(id => id !== permission.id)
                        );
                      }}
                    />
                    <Label htmlFor={permission.id}>{permission.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}