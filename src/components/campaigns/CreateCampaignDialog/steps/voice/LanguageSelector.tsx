import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface LanguageSelectorProps {
  language: {
    code: string;
    accent: string;
  };
  onLanguageChange: (key: string, value: string) => void;
}

const languages = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "en-AU", label: "English (Australia)" },
  { code: "en-CA", label: "English (Canada)" },
];

const accents = [
  { value: "neutral", label: "Neutral" },
  { value: "regional", label: "Regional" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
];

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Language & Accent</CardTitle>
            <CardDescription>
              Set language preferences for your audience
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose language and accent to match your target audience</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={language.code}
            onValueChange={(value) => onLanguageChange("code", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Accent Style</Label>
          <Select
            value={language.accent}
            onValueChange={(value) => onLanguageChange("accent", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select accent" />
            </SelectTrigger>
            <SelectContent>
              {accents.map((accent) => (
                <SelectItem key={accent.value} value={accent.value}>
                  {accent.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}