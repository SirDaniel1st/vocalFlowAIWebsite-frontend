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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Tag, 
  Trash, 
  UserCog, 
  History,
  ArrowUpDown,
  MessageSquare,
  Users,
  Tags,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useState } from "react";
import { BulkActionDialog } from "./BulkActionDialog";
import { TablePagination } from "./TablePagination";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  lastContact: string;
  segment: string;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 123-4567",
    tags: ["VIP", "Enterprise"],
    status: "active",
    lastContact: "2024-02-15",
    segment: "Enterprise"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    tags: ["Prospect"],
    status: "pending",
    lastContact: "2024-02-14",
    segment: "SMB"
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    phone: "+1 (555) 345-6789",
    tags: ["Customer"],
    status: "active",
    lastContact: "2024-02-13",
    segment: "Enterprise"
  }
];

type SortField = 'name' | 'email' | 'lastContact' | 'status';
type SortOrder = 'asc' | 'desc';

export function ContactsTable() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [bulkActionType, setBulkActionType] = useState<'addTags' | 'assignSegment' | null>(null);
  const { toast } = useToast();

  const pageSize = 10;
  const totalContacts = mockContacts.length;
  const totalPages = Math.ceil(totalContacts / pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(checked ? mockContacts.map(contact => contact.id) : []);
  };

  const handleSelectContact = (contactId: number, checked: boolean) => {
    setSelectedContacts(prev =>
      checked
        ? [...prev, contactId]
        : prev.filter(id => id !== contactId)
    );
  };

  const handleBulkAction = (action: 'addTags' | 'assignSegment') => {
    setBulkActionType(action);
  };

  const handleBulkActionComplete = () => {
    toast({
      title: "Action Completed",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Successfully updated {selectedContacts.length} contacts.</span>
        </div>
      )
    });

    setBulkActionType(null);
    setSelectedContacts([]);
  };

  const handlePageChange = (page: number) => {
    if (selectedContacts.length > 0) {
      toast({
        title: "Selection Cleared",
        description: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Contact selection has been cleared due to page change.</span>
          </div>
        )
      });
    }
    
    setCurrentPage(page);
    setSelectedContacts([]);
  };

  const sortedContacts = [...mockContacts].sort((a, b) => {
    const compareValue = sortOrder === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedContacts.length === mockContacts.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="hover:text-primary"
                >
                  Contact
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="hover:text-primary"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('lastContact')}
                  className="hover:text-primary"
                >
                  Last Contact
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => handleSelectContact(contact.id, !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${contact.email}`} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={contact.status === 'active' ? 'default' : 'secondary'}
                  >
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <History className="h-4 w-4 text-muted-foreground" />
                    {new Date(contact.lastContact).toLocaleDateString()}
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
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Edit Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <History className="mr-2 h-4 w-4" />
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{selectedContacts.length} selected</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => handleBulkAction('addTags')}
            disabled={selectedContacts.length === 0}
          >
            <Tags className="h-4 w-4" />
            Add Tags
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => handleBulkAction('assignSegment')}
            disabled={selectedContacts.length === 0}
          >
            <Users className="h-4 w-4" />
            Assign Segment
          </Button>
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalContacts}
        pageSize={pageSize}
      />

      <BulkActionDialog
        type={bulkActionType}
        selectedCount={selectedContacts.length}
        onClose={() => setBulkActionType(null)}
        onComplete={handleBulkActionComplete}
      />
    </div>
  );
}