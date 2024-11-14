import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, MoreVertical, Trash2, Users } from 'lucide-react';

interface Segment {
  id: number;
  name: string;
  description: string;
  criteria: {
    tags: string[];
    engagement: string;
    lastContact: string;
  };
  contactCount: number;
  color: string;
}

interface SegmentsListProps {
  segments: Segment[];
  onDelete: (id: number) => void;
}

export function SegmentsList({ segments, onDelete }: SegmentsListProps) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {segments.map((segment) => (
          <Card key={segment.id} className="group relative overflow-hidden">
            <div className={`absolute inset-0 w-1 bg-${segment.color}-500`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{segment.name}</h3>
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {segment.contactCount}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {segment.description}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Segment
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(segment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Segment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {segment.criteria.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="secondary">
                  Engagement: {segment.criteria.engagement}
                </Badge>
                <Badge variant="secondary">
                  Last Contact: {segment.criteria.lastContact}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}