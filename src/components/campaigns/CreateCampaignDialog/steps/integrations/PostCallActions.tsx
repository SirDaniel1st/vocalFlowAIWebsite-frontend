import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, X, Mail, MessageSquare, FileText, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface PostCallActionsProps {
  actions: any[];
  onActionsChange: (actions: any[]) => void;
}

const triggers = [
  { value: "call_completed", label: "Call Completed" },
  { value: "appointment_scheduled", label: "Appointment Scheduled" },
  { value: "voicemail", label: "Left Voicemail" },
  { value: "no_answer", label: "No Answer" },
  { value: "custom", label: "Custom Condition" },
];

const actionTypes = [
  { value: "email", label: "Send Email", icon: Mail },
  { value: "sms", label: "Send SMS", icon: MessageSquare },
  { value: "task", label: "Create Task", icon: FileText },
];

export function PostCallActions({
  actions,
  onActionsChange,
}: PostCallActionsProps) {
  const [newAction, setNewAction] = useState({
    trigger: "",
    type: "",
    subject: "",
    content: "",
  });

  const handleAddAction = () => {
    if (!newAction.trigger || !newAction.type) {
      return;
    }

    onActionsChange([
      ...actions,
      { ...newAction, id: Date.now() },
    ]);

    setNewAction({
      trigger: "",
      type: "",
      subject: "",
      content: "",
    });
  };

  const handleRemoveAction = (actionId: number) => {
    onActionsChange(actions.filter(action => action.id !== actionId));
  };

  const getActionIcon = (type: string) => {
    const action = actionTypes.find(a => a.value === type);
    return action ? action.icon : FileText;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Call Actions</CardTitle>
        <CardDescription>
          Configure automated actions based on call outcomes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Builder */}
        <div className="space-y-4 rounded-lg border p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>When this happens</Label>
              <Select
                value={newAction.trigger}
                onValueChange={(value) => setNewAction(prev => ({
                  ...prev,
                  trigger: value,
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  {triggers.map((trigger) => (
                    <SelectItem key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Do this</Label>
              <Select
                value={newAction.type}
                onValueChange={(value) => setNewAction(prev => ({
                  ...prev,
                  type: value,
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      <div className="flex items-center gap-2">
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {newAction.type && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Subject/Title</Label>
                <Input
                  value={newAction.subject}
                  onChange={(e) => setNewAction(prev => ({
                    ...prev,
                    subject: e.target.value,
                  }))}
                  placeholder="Enter subject or title"
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Input
                  value={newAction.content}
                  onChange={(e) => setNewAction(prev => ({
                    ...prev,
                    content: e.target.value,
                  }))}
                  placeholder="Enter content or description"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleAddAction}
            disabled={!newAction.trigger || !newAction.type}
            className="w-full gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Action
          </Button>
        </div>

        {/* Actions List */}
        <div className="space-y-2">
          <Label>Configured Actions</Label>
          <ScrollArea className="h-[200px] rounded-md border">
            <div className="p-4 space-y-4">
              {actions.length === 0 ? (
                <div className="flex items-center justify-center h-[100px] text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  No actions configured
                </div>
              ) : (
                actions.map((action) => {
                  const ActionIcon = getActionIcon(action.type);
                  const triggerLabel = triggers.find(t => t.value === action.trigger)?.label;
                  const actionLabel = actionTypes.find(a => a.value === action.type)?.label;

                  return (
                    <div
                      key={action.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <ActionIcon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{action.subject}</span>
                            <Badge variant="secondary">
                              {actionLabel}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            When: {triggerLabel}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAction(action.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}