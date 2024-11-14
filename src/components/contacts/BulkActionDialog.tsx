import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tags, Users, XCircle } from "lucide-react";

interface BulkActionDialogProps {
  type: 'addTags' | 'assignSegment' | 'delete' | null;
  selectedCount: number;
  onClose: () => void;
  onComplete: () => void;
}

export function BulkActionDialog({
  type,
  selectedCount,
  onClose,
  onComplete,
}: BulkActionDialogProps) {
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const { toast } = useToast();

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (selectedTags.includes(newTag.trim())) {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>Duplicate Tag</span>
            </div>
          ),
          description: "This tag has already been added.",
        });
        return;
      }
      setSelectedTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleComplete = () => {
    if (type === 'addTags' && selectedTags.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>No Tags Selected</span>
          </div>
        ),
        description: "Please add at least one tag.",
      });
      return;
    }

    if (type === 'assignSegment' && !selectedSegment) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>No Segment Selected</span>
          </div>
        ),
        description: "Please select a segment.",
      });
      return;
    }

    onComplete();
  };

  if (!type) return null;

  return (
    <Dialog open={!!type} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'addTags' && (
              <>
                <Tags className="h-5 w-5" />
                Add Tags to Contacts
              </>
            )}
            {type === 'assignSegment' && (
              <>
                <Users className="h-5 w-5" />
                Assign Contacts to Segment
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            Apply changes to {selectedCount} selected contacts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {type === 'addTags' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Add Tags</Label>
                <Input
                  placeholder="Type a tag and press Enter..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>
              
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {type === 'assignSegment' && (
            <div className="space-y-2">
              <Label>Select Segment</Label>
              <Select
                value={selectedSegment}
                onValueChange={setSelectedSegment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleComplete}>
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}