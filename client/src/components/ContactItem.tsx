import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";

interface ContactItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  isSelected?: boolean;
  isPinned?: boolean;
  isGroup?: boolean;
  isTyping?: boolean;
  isOnline?: boolean;
  isRead?: boolean;
  unreadCount?: number;
  onClick: () => void;
}

export default function ContactItem({
  name,
  lastMessage,
  timestamp,
  avatar,
  isSelected,
  isTyping,
  isOnline,
  isRead = true,
  unreadCount,
  onClick,
}: ContactItemProps) {
  return (
    <div
      className={cn(
        "flex items-center p-3 space-x-3 rounded-lg cursor-pointer transition-colors hover:bg-chat-sidebar-hover",
        isSelected && "bg-primary/10 border border-primary/20"
      )}
      onClick={onClick}
    >
      <UserAvatar name={name} src={avatar} isOnline={isOnline} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn("truncate font-medium", !isRead && "font-semibold")}>
            {name}
          </h3>
          <span className="flex-shrink-0 text-xs text-muted-foreground">
            {timestamp}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className={cn(
            "truncate text-sm",
            isTyping && "text-chat-typing",
            !isRead && isTyping && "font-medium",
            !isRead && !isTyping && "font-medium text-foreground",
            isRead && "text-muted-foreground"
          )}>
            {lastMessage}
          </p>

          {unreadCount && (
            <Badge variant="destructive" 
              className="flex items-center justify-center ml-2 h-5 w-5 p-0 rounded-full text-xs bg-chat-notification"
            >
              {unreadCount}
            </Badge>
          )}

          {!isRead && !unreadCount && (
            <div className="flex-shrink-0 ml-2 w-2 h-2 rounded-full bg-chat-notification" />
          )}
        </div>
      </div>
    </div>
  );
}
