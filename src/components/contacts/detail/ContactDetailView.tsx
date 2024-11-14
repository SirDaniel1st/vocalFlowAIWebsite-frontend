import { useState } from 'react';
import { ContactHeader } from './ContactHeader';
import { ContactInfo } from './ContactInfo';
import { ContactEngagement } from './ContactEngagement';
import { ContactNotes } from './ContactNotes';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  tags: string[];
  segments: string[];
  status: 'active' | 'inactive';
  engagementScore: number;
  lastContact: string;
  notes: Array<{
    id: number;
    content: string;
    date: string;
    author: string;
  }>;
  engagementHistory: Array<{
    id: number;
    type: 'call' | 'email' | 'message';
    date: string;
    duration?: string;
    sentiment?: number;
    summary?: string;
    status?: string;
  }>;
}

const mockContact: Contact = {
  id: 1,
  name: "Sarah Wilson",
  email: "sarah.wilson@example.com",
  phone: "+1 (555) 123-4567",
  company: "TechCorp Inc.",
  position: "Product Manager",
  tags: ["VIP", "Early Adopter", "Product Council"],
  segments: ["Enterprise", "Tech Industry"],
  status: "active",
  engagementScore: 85,
  lastContact: "2024-01-15",
  notes: [
    {
      id: 1,
      content: "Discussed upcoming product features. Very interested in AI capabilities.",
      date: "2024-01-15",
      author: "John Doe"
    },
    {
      id: 2,
      content: "Scheduled follow-up demo for team next week.",
      date: "2024-01-10",
      author: "Jane Smith"
    }
  ],
  engagementHistory: [
    {
      id: 1,
      type: "call",
      date: "2024-01-15",
      duration: "30m",
      sentiment: 0.8,
      summary: "Product demo and feature discussion"
    },
    {
      id: 2,
      type: "email",
      date: "2024-01-10",
      status: "opened",
      sentiment: 0.7,
      summary: "Follow-up email with pricing details"
    }
  ]
};

export function ContactDetailView() {
  const [contact, setContact] = useState<Contact>(mockContact);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = async (updatedData: Partial<Contact>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContact(prev => ({ ...prev, ...updatedData }));
      setIsEditing(false);
      
      toast({
        title: "Changes saved",
        description: "Contact information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button and Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </Button>
        
        <ContactHeader
          contact={contact}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Contact Info */}
        <div className="md:col-span-2 space-y-6">
          <ContactInfo
            contact={contact}
            isEditing={isEditing}
            onSave={handleSave}
          />
          <ContactEngagement
            engagementHistory={contact.engagementHistory}
          />
        </div>

        {/* Notes and Activity */}
        <div>
          <ContactNotes
            notes={contact.notes}
            onAddNote={async (content) => {
              const newNote = {
                id: Date.now(),
                content,
                date: new Date().toISOString(),
                author: "John Doe" // Would come from auth context
              };
              
              setContact(prev => ({
                ...prev,
                notes: [newNote, ...prev.notes]
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}