import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Variable, Info } from 'lucide-react';

interface TokenSelectorProps {
  tokens: Array<{ token: string; description: string }>;
  onTokenSelect: (token: string) => void;
}

export function TokenSelector({ tokens, onTokenSelect }: TokenSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>Available Tokens</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to insert into your message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="h-[100px] rounded-md border p-4">
        <div className="flex flex-wrap gap-2">
          {tokens.map(({ token, description }) => (
            <TooltipProvider key={token}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => onTokenSelect(token)}
                  >
                    <Variable className="mr-1 h-3 w-3" />
                    {token}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}