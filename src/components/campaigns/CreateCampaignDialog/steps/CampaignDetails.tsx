import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Loader2 } from 'lucide-react';
import { z } from "zod";

const campaignSchema = z.object({
  name: z.string()
    .min(1, "Campaign name is required")
    .max(50, "Campaign name cannot exceed 50 characters"),
  description: z.string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

interface CampaignDetailsProps {
  data: any;
  onComplete: (data: any) => void;
}

export function CampaignDetails({ data, onComplete }: CampaignDetailsProps) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    description: data.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    try {
      campaignSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Details</CardTitle>
        <CardDescription>
          Start by giving your campaign a name and description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="name">Campaign Name</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose a descriptive name to easily identify your campaign</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className={`text-sm ${
              formData.name.length > 50 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {formData.name.length}/50
            </span>
          </div>
          <Input
            id="name"
            placeholder="e.g., Summer Product Launch 2024"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add context and goals for your campaign</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className={`text-sm ${
              formData.description.length > 500 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {formData.description.length}/500
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="Enter campaign description..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save and Continue'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}