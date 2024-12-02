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
import { useToast } from "@/hooks/use-toast";
import { Upload, FileType, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportContactsDialog({ open, onOpenChange }: ImportContactsDialogProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Check file type
      if (!selectedFile.name.match(/\.(csv|xlsx|xls)$/)) {
        toast({
          variant: "destructive",
          title: "Invalid File Type", // Ensure title is a string
          description: (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>Please upload a CSV or Excel file.</span>
            </div>
          ),
        });
        return;
      }

      // Check file size (e.g., 5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large", // Ensure title is a string
          description: (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>File size should be less than 5MB.</span>
            </div>
          ),
        });
        return;
      }

      setFile(selectedFile);
      toast({
        title: "File Selected", // Ensure title is a string
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{selectedFile.name} ready for import.</span>
          </div>
        ),
      });
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected", // Ensure title is a string
        description: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Please select a file to import.</span>
          </div>
        ),
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Import Successful", // Ensure title is a string
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Contacts have been successfully imported.</span>
          </div>
        ),
      });

      onOpenChange(false);
      setFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Failed", // Ensure title is a string
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>An error occurred while importing contacts. Please try again.</span>
          </div>
        ),
      });
    } finally {
      setIsUploading(false);
    }
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
              />
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {file ? file.name : "Drop your file here or click to browse"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel (max 5MB)
                </span>
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Template</Label>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileType className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Download template file</span>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              "Import Contacts"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
