import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useState } from "react";

interface Note {
  id: number;
  content: string;
  date: string;
  author: string;
}

interface ContactNotesProps {
  notes: Note[];
  onAddNote: (content: string) => void;
}

export function ContactNotes({ notes, onAddNote }: ContactNotesProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes & Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!newNote.trim()}
          >
            Add Note
          </Button>
        </form>

        <ScrollArea className="h-[400px] mt-6">
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${note.author}`} />
                  <AvatarFallback>
                    {note.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{note.author}</p>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(note.date), 'MMM dd, yyyy HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {note.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}