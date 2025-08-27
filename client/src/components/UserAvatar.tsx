import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
}

export default function UserAvatar({
  src,
  name,
  size = "md",
  isOnline,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const getInitials = (name: string) => {
    if (name == undefined) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-chat-online border-2 border-white" />
      )}
    </div>
  );
}
