import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Shield, UserCog, Trash2, Ban, Download } from "lucide-react";

interface BulkActionMenuProps {
  selectedCount: number;
  onAction: (action: string) => void;
  disabled?: boolean;
}

export function BulkActionMenu({ selectedCount, onAction, disabled }: BulkActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Actions ({selectedCount})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onAction("assignRole")}>
          <UserCog className="mr-2 h-4 w-4" />
          Assign Role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("changePermissions")}>
          <Shield className="mr-2 h-4 w-4" />
          Change Permissions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("suspend")}>
          <Ban className="mr-2 h-4 w-4" />
          Suspend Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("export")}>
          <Download className="mr-2 h-4 w-4" />
          Export Selected
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction("delete")}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Selected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}