import {
  BarChart3,
  Bot,
  FileAudio,
  Home,
  LayoutGrid,
  MessageSquare,
  Settings,
  Users,
  Zap,
  Megaphone,
  UserCircle,
  FolderKanban,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

interface DashboardSidebarProps {
  isOpen: boolean;
}

const sidebarItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    href: '/dashboard' 
  },
  {
    icon: Megaphone,
    label: 'Campaigns',
    href: '/dashboard/campaigns',
    subItems: [
      { label: 'Active Campaigns', href: '/dashboard/campaigns/active' },
      { label: 'Drafts', href: '/dashboard/campaigns/drafts' },
      { label: 'Completed', href: '/dashboard/campaigns/completed' },
    ]
  },
  {
    icon: Users,
    label: 'Contacts',
    href: '/dashboard/contacts',
    subItems: [
      { label: 'All Contacts', href: '/dashboard/contacts/all' },
      { label: 'Segments', href: '/dashboard/contacts/segments' },
      { label: 'Tags', href: '/dashboard/contacts/tags' },
    ]
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    href: '/dashboard/analytics',
    subItems: [
      { label: 'Overview', href: '/dashboard/analytics/overview' },
      { label: 'Reports', href: '/dashboard/analytics/reports' },
      { label: 'Insights', href: '/dashboard/analytics/insights' },
    ]
  },
  {
    icon: UserCircle,
    label: 'User Management',
    href: '/dashboard/users',
    subItems: [
      { label: 'Team Members', href: '/dashboard/users/team' },
      { label: 'Roles', href: '/dashboard/users/roles' },
      { label: 'Permissions', href: '/dashboard/users/permissions' },
    ]
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
    subItems: [
      { label: 'Account', href: '/dashboard/settings/account' },
      { label: 'Integrations', href: '/dashboard/settings/integrations' },
      { label: 'Customization', href: '/dashboard/settings/customization' },
    ]
  },
];

export function DashboardSidebar({ isOpen }: DashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(current =>
      current.includes(label)
        ? current.filter(item => item !== label)
        : [...current, label]
    );
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 z-20",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-12 items-center justify-start gap-2 px-2">
          {isOpen ? (
            <>
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold">VocalFlow AI</span>
            </>
          ) : (
            <Zap className="h-6 w-6 text-primary mx-auto" />
          )}
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.label);

            if (!item.subItems) {
              return isOpen ? (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-4"
                  asChild
                >
                  <a href={item.href}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </a>
                </Button>
              ) : (
                <Tooltip key={item.label} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      asChild
                    >
                      <a href={item.href}>
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return isOpen ? (
              <Collapsible
                key={item.label}
                open={isExpanded}
                onOpenChange={() => toggleExpanded(item.label)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-9 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.label}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={subItem.href}>
                        {subItem.label}
                      </a>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center"
                    asChild
                  >
                    <a href={item.href}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}