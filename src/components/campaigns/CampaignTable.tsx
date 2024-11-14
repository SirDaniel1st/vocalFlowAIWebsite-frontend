import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  MoreHorizontal,
  Play,
  Pause,
  Copy,
  Edit,
  Trash,
  BarChart2,
  Users,
  PhoneCall,
  Calendar,
  ArrowUpDown,
  ThumbsUp,
  Target
} from 'lucide-react';
import { useState } from 'react';

interface Campaign {
  id: number;
  name: string;
  type: string;
  status: string;
  progress: number;
  totalCalls: number;
  completedCalls: number;
  successRate: number;
  sentiment: number;
  startDate: string;
  endDate: string;
  segment: string;
  engagementRate: number;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Summer Product Launch",
    type: "outbound",
    status: "active",
    progress: 75,
    totalCalls: 2500,
    completedCalls: 1875,
    successRate: 92,
    sentiment: 85,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    segment: "Enterprise Customers",
    engagementRate: 78
  },
  {
    id: 2,
    name: "Customer Feedback Survey",
    type: "survey",
    status: "scheduled",
    progress: 0,
    totalCalls: 1000,
    completedCalls: 0,
    successRate: 0,
    sentiment: 0,
    startDate: "2024-02-15",
    endDate: "2024-02-29",
    segment: "Recent Signups",
    engagementRate: 0
  },
  {
    id: 3,
    name: "Service Upgrade Campaign",
    type: "outbound",
    status: "completed",
    progress: 100,
    totalCalls: 1500,
    completedCalls: 1500,
    successRate: 88,
    sentiment: 92,
    startDate: "2024-01-15",
    endDate: "2024-01-31",
    segment: "Premium Users",
    engagementRate: 85
  }
];

type SortField = 'name' | 'engagementRate' | 'sentiment' | 'startDate';
type SortOrder = 'asc' | 'desc';

export function CampaignTable() {
  const [sortField, setSortField] = useState<SortField>('startDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'completed':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return 'text-green-500';
    if (sentiment >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'engagementRate':
        comparison = a.engagementRate - b.engagementRate;
        break;
      case 'sentiment':
        comparison = a.sentiment - b.sentiment;
        break;
      case 'startDate':
        comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('name')}
                className="hover:text-primary"
              >
                Campaign
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Target Segment</TableHead>
            <TableHead>Progress & Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('engagementRate')}
                className="hover:text-primary"
              >
                Engagement
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('sentiment')}
                className="hover:text-primary"
              >
                Sentiment
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('startDate')}
                className="hover:text-primary"
              >
                Timeline
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCampaigns.map((campaign) => (
            <TableRow key={campaign.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="space-y-2">
                  <div className="font-medium">{campaign.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {campaign.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(campaign.status)}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{campaign.segment}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{campaign.progress}%</span>
                    <span className="text-muted-foreground">
                      {campaign.completedCalls}/{campaign.totalCalls}
                    </span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{campaign.engagementRate}%</span>
                        </div>
                        <Progress 
                          value={campaign.engagementRate} 
                          className="h-2 bg-blue-100"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on user interactions and response rates</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ThumbsUp className={`h-4 w-4 ${getSentimentColor(campaign.sentiment)}`} />
                  <span className={getSentimentColor(campaign.sentiment)}>
                    {campaign.sentiment}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {campaign.status === 'active' ? (
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause Campaign
                      </DropdownMenuItem>
                    ) : campaign.status === 'scheduled' || campaign.status === 'draft' ? (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Start Campaign
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}