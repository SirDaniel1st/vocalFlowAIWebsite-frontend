import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Tags,
  Filter,
  Upload,
  FileSpreadsheet,
  Search,
  Info,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download
} from 'lucide-react';

interface SegmentSelectionProps {
  data: any;
  onComplete: (data: any) => void;
}

const predefinedSegments = [
  {
    id: "enterprise",
    name: "Enterprise Customers",
    description: "Large business customers with over 1000 employees",
    count: 486,
    tags: ["Enterprise", "High Value"],
  },
  {
    id: "recent",
    name: "Recent Signups",
    description: "Customers who joined in the last 30 days",
    count: 124,
    tags: ["New Customer"],
  },
  {
    id: "premium",
    name: "Premium Users",
    description: "Users on premium subscription plans",
    count: 257,
    tags: ["Premium", "High Value"],
  },
];

export function SegmentSelection({ data, onComplete }: SegmentSelectionProps) {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(
    data.segments || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleSegmentToggle = (segmentId: string) => {
    setSelectedSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.name.match(/\.(csv|xlsx)$/)) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Invalid File Type</span>
          </div>
        ),
        description: "Please upload a CSV or Excel file.",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Upload Successful</span>
          </div>
        ),
        description: "Contact list has been imported successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Upload Failed</span>
          </div>
        ),
        description: "Failed to import contacts. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = () => {
    if (selectedSegments.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>No Segments Selected</span>
          </div>
        ),
        description: "Please select at least one segment to continue.",
      });
      return;
    }

    onComplete({
      segments: selectedSegments,
    });
  };

  const filteredSegments = predefinedSegments.filter(segment =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="segments">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="segments">Predefined Segments</TabsTrigger>
          <TabsTrigger value="import">Import Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search segments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[400px]">
            <div className="grid gap-4">
              {filteredSegments.map((segment) => (
                <Card
                  key={segment.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSegments.includes(segment.id) ? 'border-primary' : ''
                  }`}
                  onClick={() => handleSegmentToggle(segment.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedSegments.includes(segment.id)}
                        onCheckedChange={() => handleSegmentToggle(segment.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{segment.name}</h4>
                          <Badge variant="secondary" className="gap-1">
                            <Users className="h-3 w-3" />
                            {segment.count}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {segment.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {segment.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              <Tags className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Contacts</CardTitle>
              <CardDescription>
                Upload your contact list from a CSV or Excel file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download a template file with the required format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Separator />

              <div className="grid place-items-center gap-4 p-8 border-2 border-dashed rounded-lg">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Choose a file or drag & drop</p>
                    <p className="text-sm text-muted-foreground">
                      CSV or Excel files only (max 5MB)
                    </p>
                  </div>
                </div>
                <Input
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <Button variant="outline" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Select File
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {selectedSegments.length} segments selected
          </span>
        </div>
        <Button onClick={handleContinue}>
          Save and Continue
        </Button>
      </div>
    </div>
  );
}