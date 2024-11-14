import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Variable } from 'lucide-react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Wand2,
} from 'lucide-react';

interface MessageEditorProps {
  script: string;
  onScriptChange: (value: string) => void;
  onFormatting: (format: string) => void;
  characterCount: number;
  maxCharacters: number;
  tokensCount: number;
}

export function MessageEditor({
  script,
  onScriptChange,
  onFormatting,
  characterCount,
  maxCharacters,
  tokensCount,
}: MessageEditorProps) {
  const isOverLimit = characterCount > maxCharacters;

  return (
    <div className="space-y-4">
      {/* Formatting Toolbar */}
      <div className="flex items-center gap-2">
        <ToggleGroup type="multiple" variant="outline" size="sm">
          <ToggleGroupItem value="bold" onClick={() => onFormatting('bold')}>
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" onClick={() => onFormatting('italic')}>
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" onClick={() => onFormatting('underline')}>
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleGroup type="single" variant="outline" size="sm">
          <ToggleGroupItem value="bullet" onClick={() => onFormatting('bullet')}>
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="number" onClick={() => onFormatting('number')}>
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2 ml-auto"
          onClick={() => onFormatting('suggestions')}
        >
          <Wand2 className="h-4 w-4" />
          AI Suggestions
        </Button>
      </div>

      <Textarea
        id="script-editor"
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        placeholder="Enter your message script here..."
        className="min-h-[300px] font-mono"
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Variable className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {tokensCount} tokens used
          </span>
        </div>
        <span className={isOverLimit ? "text-destructive" : "text-muted-foreground"}>
          {characterCount}/{maxCharacters} characters
        </span>
      </div>
    </div>
  );
}