import { useState } from 'react';
import { ContactsTable } from './ContactsTable';
import { ContactFilters } from './ContactFilters';
import { ContactStats } from './ContactStats';
import { SegmentationTools } from './segments/SegmentationTools';
import { Button } from "@/components/ui/button";
import { UserPlus, Upload, Download } from 'lucide-react';
import { ImportContactsDialog } from './ImportContactsDialog';

export function ContactsContent() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage and organize your contact database
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Stats Cards */}
          <ContactStats />

          {/* Filters */}
          <ContactFilters />

          {/* Contacts Table */}
          <ContactsTable />
        </div>

        {/* Segmentation Sidebar */}
        <div className="lg:col-span-1">
          <SegmentationTools />
        </div>
      </div>

      {/* Import Dialog */}
      <ImportContactsDialog 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen}
      />
    </div>
  );
}