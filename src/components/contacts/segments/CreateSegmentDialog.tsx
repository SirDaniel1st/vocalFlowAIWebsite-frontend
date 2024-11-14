import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface CreateSegmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function CreateSegmentDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateSegmentDialogProps) {
  const [segmentData, setSegmentData] = useState({
    name: "",
    description: "",
    criteria: {
      tags: [] as string[],
      engagement: "any",
      lastContact: "30days",
    },
    customTags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setSegmentData(prev => ({
        ...prev,
        customTags: [...prev.customTags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSegmentData(prev => ({
      ...prev,
      customTags: prev.customTags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(segmentData);
    setSegmentData({
      name: "",
      description: "",
      criteria: {
        tags: [],
        engagement: "any",
        lastContact: "30days",
      },
      customTags: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Segment</DialogTitle>
            <DialogDescription>
              Define criteria to automatically group contacts based on shared characteristics.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Segment Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Enterprise Customers"
                  value={segmentData.name}
                  onChange={(e) => setSegmentData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this segment..."
                  value={segmentData.description}
                  onChange={(e) => setSegmentData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>
            </div>

            <Separator />

            {/* Segment Criteria */}
            <div className="space-y-4">
              <h4 className="font-medium">Segment Criteria</h4>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Engagement Level</Label>
                  <Select
                    value={segmentData.criteria.engagement}
                    onValueChange={(value) => setSegmentData(prev => ({
                      ...prev,
                      criteria: { ...prev.criteria, engagement: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select engagement level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      <SelectItem value="high">High (80%+)</SelectItem>
                      <SelectItem value="medium">Medium (40-79%)</SelectItem>
                      <SelectItem value="low">Low (&lt;40%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Last Contact</Label>
                  <Select
                    value={segmentData.criteria.lastContact}
                    onValueChange={(value) => setSegmentData(prev => ({
                      ...prev,
                      criteria: { ...prev.criteria, lastContact: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="14days">Last 14 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Custom Tags</Label>
                  <Input
                    placeholder="Add tag and press Enter..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {segmentData.customTags.map((tag) => (
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
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Segment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}