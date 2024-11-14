import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Users,
  Edit2,
  Trash2,
  ChevronRight,
  Tags,
  Filter,
} from 'lucide-react';
import { CreateSegmentDialog } from './CreateSegmentDialog';
import { SegmentsList } from './SegmentsList';

const mockSegments = [
  {
    id: 1,
    name: "Enterprise Customers",
    description: "Large business customers with over 1000 employees",
    criteria: {
      tags: ["Enterprise", "VIP"],
      engagement: "high",
      lastContact: "30days",
    },
    contactCount: 486,
    color: "blue",
  },
  {
    id: 2,
    name: "Recent Signups",
    description: "Customers who joined in the last 30 days",
    criteria: {
      tags: ["New Customer"],
      engagement: "any",
      lastContact: "7days",
    },
    contactCount: 124,
    color: "green",
  },
  {
    id: 3,
    name: "High-Value Prospects",
    description: "Qualified leads with high engagement",
    criteria: {
      tags: ["Prospect", "High Value"],
      engagement: "high",
      lastContact: "14days",
    },
    contactCount: 257,
    color: "purple",
  },
];

export function SegmentationTools() {
  const [segments, setSegments] = useState(mockSegments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateSegment = (newSegment: any) => {
    setSegments(prev => [...prev, {
      ...newSegment,
      id: Date.now(),
      contactCount: 0,
    }]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteSegment = (segmentId: number) => {
    setSegments(prev => prev.filter(segment => segment.id !== segmentId));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Segments</CardTitle>
            <CardDescription>Create and manage contact segments</CardDescription>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Segment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Segments</p>
                    <p className="text-2xl font-bold">{segments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Active Filters</p>
                    <p className="text-2xl font-bold">
                      {segments.reduce((acc, segment) => 
                        acc + Object.keys(segment.criteria).length, 0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Segments List */}
          <SegmentsList
            segments={segments}
            onDelete={handleDeleteSegment}
          />
        </div>

        {/* Create Segment Dialog */}
        <CreateSegmentDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateSegment}
        />
      </CardContent>
    </Card>
  );
}