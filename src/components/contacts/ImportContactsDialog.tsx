import { useRef, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import  importContactsBatch from "@/lib/api-client";
import Papa from 'papaparse';
import { 
  Upload, 
  FileType, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Loader2 
} from 'lucide-react';

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ImportContactsDialog({ 
  open, 
  onOpenChange,
  onSuccess 
}: ImportContactsDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.name.match(/\.(csv|xlsx?)$/i)) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a CSV or Excel file.",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "File size should be less than 5MB.",
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100);
        }
      };

      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          
          // Parse CSV data
          Papa.parse(content, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header: string) => {
              // Normalize headers
              const headerMap: { [key: string]: string } = {
                'first_name': 'firstName',
                'last_name': 'lastName',
                'job_title': 'jobTitle'
              };
              return headerMap[header.toLowerCase()] || header;
            },
            complete: async (results) => {
              try {
                const result = await importContactsBatch(user.id, results.data);

                toast({
                  title: "Import Successful",
                  description: (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>
                        Successfully imported {result.success} contacts.
                        {result.failed > 0 && ` Failed to import ${result.failed} contacts.`}
                      </span>
                    </div>
                  )
                });

                onSuccess?.();
                onOpenChange(false);
              } catch (error) {
                throw error;
              }
            },
            error: (error: Error) => {
              throw error;
            }
          });
        } catch (error) {
          console.error('Import error:', error);
          toast({
            variant: "destructive",
            title: "Import Failed",
            description: (
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>An error occurred while importing contacts. Please try again.</span>
              </div>
            )
          });
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('File reading error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Failed to read the file. Please try again.</span>
          </div>
        )
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    const template = 'firstName,lastName,email,phone,company,jobTitle,tags,segments\nJohn,Doe,john@example.com,+1234567890,Acme Inc,Manager,"VIP,Customer","Enterprise,Tech"\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file containing your contacts data.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>File Upload</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isUploading}
              />
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Drop your file here or click to browse
                </span>
                <span className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel (max 5MB)
                </span>
              </Label>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}

          <div className="space-y-2">
            <Label>Template</Label>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileType className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Download template file</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDownloadTemplate}
              >
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Label htmlFor="file-upload">
            <Button
              disabled={isUploading}
              className="cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                'Select File'
              )}
            </Button>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}