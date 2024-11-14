import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MessageEditor } from './MessageEditor';
import { TokenSelector } from './TokenSelector';
import { PreviewPanel } from './PreviewPanel';

interface MessagePersonalizationProps {
  data: any;
  onComplete: (data: any) => void;
}

const personalizationTokens = [
  { token: "{FirstName}", description: "Contact's first name", example: "John" },
  { token: "{LastName}", description: "Contact's last name", example: "Smith" },
  { token: "{Company}", description: "Contact's company name", example: "Acme Corp" },
  { token: "{AppointmentDate}", description: "Scheduled appointment date", example: "next Tuesday" },
  { token: "{Role}", description: "Contact's job role", example: "Product Manager" },
  { token: "{Industry}", description: "Contact's industry", example: "Technology" },
  { token: "{LastInteraction}", description: "Date of last interaction", example: "last week" },
  { token: "{CustomField1}", description: "Custom field 1", example: "Value 1" },
];

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
];

export function MessagePersonalization({ data, onComplete }: MessagePersonalizationProps) {
  const [script, setScript] = useState(data.message.script || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [tone, setTone] = useState(data.message.tone || 'professional');
  const [volume, setVolume] = useState([80]);
  const { toast } = useToast();

  const previewContact = {
    FirstName: "John",
    LastName: "Smith",
    Company: "Acme Corp",
    AppointmentDate: "next Tuesday",
    Role: "Product Manager",
    Industry: "Technology",
    LastInteraction: "last week",
    CustomField1: "Value 1",
  };

  const insertToken = (token: string) => {
    const editor = document.getElementById('script-editor') as HTMLTextAreaElement;
    const cursorPosition = editor?.selectionStart || script.length;
    setScript(prev => 
      prev.slice(0, cursorPosition) + token + prev.slice(cursorPosition)
    );
  };

  const handlePreview = () => {
    if (!script.trim()) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Empty Script</span>
          </div>
        ),
        description: "Please enter a message script before previewing.",
      });
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const getPreviewText = () => {
    let previewText = script;
    Object.entries(previewContact).forEach(([key, value]) => {
      const token = `{${key}}`;
      previewText = previewText.replace(new RegExp(token, 'g'), value);
    });
    return previewText;
  };

  const handleContinue = () => {
    if (!script.trim()) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Empty Script</span>
          </div>
        ),
        description: "Please enter a message script before continuing.",
      });
      return;
    }

    const usedTokens = personalizationTokens
      .filter(({ token }) => script.includes(token))
      .map(({ token }) => token);

    onComplete({
      message: {
        script,
        tone,
        personalization: usedTokens,
      },
    });
  };

  const characterCount = script.length;
  const maxCharacters = 1000;
  const tokensCount = personalizationTokens.filter(({ token }) => 
    script.includes(token)
  ).length;

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
      {/* Editor Panel */}
      <ResizablePanel defaultSize={60}>
        <div className="h-full p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Message Script</Label>
              <div className="text-sm text-muted-foreground">
                Draft your call script and add personalization tokens
              </div>
            </div>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <MessageEditor
            script={script}
            onScriptChange={setScript}
            onFormatting={console.log}
            characterCount={characterCount}
            maxCharacters={maxCharacters}
            tokensCount={tokensCount}
          />

          <TokenSelector
            tokens={personalizationTokens}
            onTokenSelect={insertToken}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      {/* Preview Panel */}
      <ResizablePanel defaultSize={40}>
        <div className="h-full p-4 space-y-4">
          <PreviewPanel
            previewText={getPreviewText()}
            isPlaying={isPlaying}
            volume={volume}
            onPreviewClick={handlePreview}
          />

          <Button
            className="w-full"
            onClick={handleContinue}
            disabled={!script.trim() || characterCount > maxCharacters}
          >
            Save and Continue
          </Button>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}