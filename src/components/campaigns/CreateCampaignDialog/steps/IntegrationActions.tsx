import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIntegrations } from './integrations/CalendarIntegrations';
import { CRMIntegrations } from './integrations/CRMIntegrations';
import { PostCallActions } from './integrations/PostCallActions';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface IntegrationActionsProps {
  data: any;
  onComplete: (data: any) => void;
}

export function IntegrationActions({ data, onComplete }: IntegrationActionsProps) {
  const [integrations, setIntegrations] = useState({
    calendar: data.integrations?.calendar || [],
    crm: data.integrations?.crm || [],
  });
  const [actions, setActions] = useState(data.actions || []);
  const { toast } = useToast();

  const handleCalendarIntegrationChange = (platforms: string[]) => {
    setIntegrations(prev => ({
      ...prev,
      calendar: platforms,
    }));
  };

  const handleCRMIntegrationChange = (platforms: string[]) => {
    setIntegrations(prev => ({
      ...prev,
      crm: platforms,
    }));
  };

  const handleActionsChange = (newActions: any[]) => {
    setActions(newActions);
  };

  const handleContinue = () => {
    if (integrations.calendar.length === 0 && integrations.crm.length === 0) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>No Integrations Selected</span>
          </div>
        ),
        description: "Please select at least one integration to continue.",
      });
      return;
    }

    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Settings Saved</span>
        </div>
      ),
      description: "Your integration settings have been saved.",
    });

    onComplete({
      integrations,
      actions,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <CalendarIntegrations
            selectedPlatforms={integrations.calendar}
            onPlatformsChange={handleCalendarIntegrationChange}
          />
        </TabsContent>

        <TabsContent value="crm">
          <CRMIntegrations
            selectedPlatforms={integrations.crm}
            onPlatformsChange={handleCRMIntegrationChange}
          />
        </TabsContent>

        <TabsContent value="actions">
          <PostCallActions
            actions={actions}
            onActionsChange={handleActionsChange}
          />
        </TabsContent>
      </Tabs>

      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={integrations.calendar.length === 0 && integrations.crm.length === 0}
      >
        Save and Continue
      </Button>
    </div>
  );
}