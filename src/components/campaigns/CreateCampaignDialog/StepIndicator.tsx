import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    "Campaign Details",
    "Segment Selection",
    "Voice Customization",
    "Call Scheduling",
    "Message Personalization",
    "Review"
  ];

  return (
    <div className="relative">
      <div className="absolute top-4 w-full h-0.5 bg-muted" />
      <ol className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <li
              key={step}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full border-2
                  ${isActive ? 'border-primary bg-primary text-primary-foreground' :
                    isCompleted ? 'border-primary bg-primary text-primary-foreground' :
                    'border-muted bg-background'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{stepNumber}</span>
                )}
              </div>
              <span className="mt-2 text-xs font-medium">
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}