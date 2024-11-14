import { useState } from 'react';
import { VoiceSelector } from './voice/VoiceSelector';
import { ToneCustomizer } from './voice/ToneCustomizer';
import { LanguageSelector } from './voice/LanguageSelector';
import { VoicePreview } from './voice/VoicePreview';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface VoiceCustomizationProps {
  data: any;
  onComplete: (data: any) => void;
}

export function VoiceCustomization({ data, onComplete }: VoiceCustomizationProps) {
  const [selectedVoice, setSelectedVoice] = useState(data.voice || {
    id: '',
    name: '',
    gender: '',
    language: '',
    accent: '',
  });
  const [tone, setTone] = useState({
    formality: data.tone?.formality || 50,
    enthusiasm: data.tone?.enthusiasm || 50,
    pace: data.tone?.pace || 50,
  });
  const [language, setLanguage] = useState({
    code: data.language?.code || 'en-US',
    accent: data.language?.accent || 'neutral',
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleVoiceSelect = (voice: any) => {
    setSelectedVoice(voice);
    setIsPlaying(false);
  };

  const handleToneChange = (key: string, value: number) => {
    setTone(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLanguageChange = (key: string, value: string) => {
    setLanguage(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreview = () => {
    if (!selectedVoice.id) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Voice Required</span>
          </div>
        ),
        description: "Please select a voice before previewing.",
      });
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleContinue = () => {
    if (!selectedVoice.id) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Voice Required</span>
          </div>
        ),
        description: "Please select a voice before continuing.",
      });
      return;
    }

    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Voice Settings Saved</span>
        </div>
      ),
      description: "Your voice customization settings have been saved.",
    });

    onComplete({
      voice: selectedVoice,
      tone,
      language,
    });
  };

  return (
    <div className="space-y-6">
      {/* Voice Selection */}
      <VoiceSelector
        selectedVoice={selectedVoice}
        onVoiceSelect={handleVoiceSelect}
      />

      {/* Tone and Language Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <ToneCustomizer
          tone={tone}
          onToneChange={handleToneChange}
        />

        <LanguageSelector
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Voice Preview */}
      <VoicePreview
        voice={selectedVoice}
        tone={tone}
        language={language}
        isPlaying={isPlaying}
        onPreviewClick={handlePreview}
      />

      {/* Continue Button */}
      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={!selectedVoice.id}
      >
        Save and Continue
      </Button>
    </div>
  );
}