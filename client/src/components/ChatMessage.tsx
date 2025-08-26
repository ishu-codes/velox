import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Check, CheckCheck, Clock } from "lucide-react";
import { getFormattedTimestamp } from "@/lib/date";
// import tacticalBoard from "@/assets/tactical-board.png";

interface ChatMessageProps {
  // id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar?: string;
  isOwn: boolean;
  hasAttachment?: boolean;
  sent?: boolean;
  received?: boolean;
  seen?: boolean;
}

export default function ChatMessage({
  sender,
  content,
  timestamp,
  avatar,
  isOwn,
  hasAttachment,
  sent,
  received,
  seen,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex space-x-3",
        isOwn && "flex-row-reverse space-x-reverse"
      )}
    >
      {!isOwn && <UserAvatar name={sender} src={avatar} size="sm" />}

      <div
        className={cn(
          "flex flex-col space-y-1 max-w-xs lg:max-w-md",
          isOwn && "items-end"
        )}
      >
        {!isOwn && (
          <span className="text-sm font-medium text-foreground">{sender}</span>
        )}

        <div
          className={cn(
            "px-4 py-2 text-sm rounded-2xl",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-chat-message-bg border border-border rounded-bl-md"
          )}
        >
          <p className="leading-relaxed">{content}</p>
        </div>

        {hasAttachment && (
          <div className="mt-2">
            <img
              src={
                "https://m.media-amazon.com/images/I/716Wc-EsGwL._SL1500_.jpg"
              }
              alt="Tactical board"
              className="max-w-60 h-auto rounded-lg border border-border"
            />
          </div>
        )}

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">
            {getFormattedTimestamp(timestamp)}
          </span>
          <span className="mt-[-2px]">
            {isOwn && <SentReceivedSeen {...{ sent, received, seen }} />}
          </span>
        </div>
      </div>
    </div>
  );
}

const SentReceivedSeen = ({
  sent,
  received,
  seen,
}: {
  sent?: boolean;
  received?: boolean;
  seen?: boolean;
}) => {
  if (seen) return <CheckCheck className="text-blue-500" size={10} />;
  if (received) return <CheckCheck size={10} />;
  if (sent) return <Check size={10} />;
  return <Clock size={10} />;
};
