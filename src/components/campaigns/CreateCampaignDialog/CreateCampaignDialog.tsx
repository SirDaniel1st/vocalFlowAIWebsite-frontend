import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { StepIndicator } from "./StepIndicator";
import { CampaignDetails } from "./steps/CampaignDetails";
import { SegmentSelection } from "./steps/SegmentSelection";
import { VoiceCustomization } from "./steps/VoiceCustomization";
import { CallScheduling } from "./steps/CallScheduling";
import { MessagePersonalization } from "./steps/MessagePersonalization";
import { CampaignReview } from "./steps/CampaignReview";
import { z } from "zod";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
}: CreateCampaignDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    segments: [],
    voice: {
      id: "",
      gender: "",
      accent: "",
      tone: "",
    },
    schedule: {
      startDate: new Date(),
      endDate: new Date(),
      timeSlots: [],
      frequency: "daily",
    },
    message: {
      script: "",
      personalization: [],
    },
  });

  const totalSteps = 6;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepComplete = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CampaignDetails
            data={formData}
            onComplete={handleStepComplete}
          />
        );
      case 2:
        return (
          <SegmentSelection
            data={formData}
            onComplete={handleStepComplete}
          />
        );
      case 3:
        return (
          <VoiceCustomization
            data={formData}
            onComplete={handleStepComplete}
          />
        );
      case 4:
        return (
          <CallScheduling
            data={formData}
            onComplete={handleStepComplete}
          />
        );
      case 5:
        return (
          <MessagePersonalization
            data={formData}
            onComplete={handleStepComplete}
          />
        );
      case 6:
        return (
          <CampaignReview
            data={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Campaign Created</span>
          </div>
        ),
        description: "Your campaign has been created successfully.",
      });
      
      onOpenChange(false);
      setCurrentStep(1);
      setFormData({
        name: "",
        description: "",
        segments: [],
        voice: {
          id: "",
          gender: "",
          accent: "",
          tone: "",
        },
        schedule: {
          startDate: new Date(),
          endDate: new Date(),
          timeSlots: [],
          frequency: "daily",
        },
        message: {
          script: "",
          personalization: [],
        },
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Error</span>
          </div>
        ),
        description: "Failed to create campaign. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up your voice campaign in a few simple steps
          </DialogDescription>
        </DialogHeader>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <div className="py-4">
          {renderStep()}
        </div>

        {currentStep !== 1 && currentStep !== 6 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
            >
              Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}