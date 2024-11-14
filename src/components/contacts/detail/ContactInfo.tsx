import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Briefcase, Tags } from "lucide-react";
import { useState } from "react";

interface ContactInfoProps {
  contact: any;
  isEditing: boolean;
  onSave: (data: any) => void;
}

export function ContactInfo({ contact, isEditing, onSave }: ContactInfoProps) {
  const [editedContact, setEditedContact] = useState(contact);

  const handleChange = (field: string, value: string) => {
    setEditedContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="font-medium">Company Details</span>
          </div>
          
          {isEditing ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={editedContact.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={editedContact.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{contact.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{contact.position}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tags and Segments */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tags className="h-4 w-4" />
            <span className="font-medium">Tags & Segments</span>
          </div>
          
          {isEditing ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tags</Label>
                <Select
                  value={editedContact.tags[0]}
                  onValueChange={(value) => handleChange('tags', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Early Adopter">Early Adopter</SelectItem>
                    <SelectItem value="Product Council">Product Council</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Segments</Label>
                <Select
                  value={editedContact.segments[0]}
                  onValueChange={(value) => handleChange('segments', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="SMB">SMB</SelectItem>
                    <SelectItem value="Tech Industry">Tech Industry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {contact.segments.map((segment: string) => (
                  <Badge key={segment} variant="outline">
                    {segment}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={() => onSave(editedContact)}>
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}