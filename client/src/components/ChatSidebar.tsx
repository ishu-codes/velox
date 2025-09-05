import {
  Search,
  MoreVertical,
  User,
  Settings,
  Palette,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContactItem from "./ContactItem";
import { useTheme } from "./theme-provider";
import { useCurrentPageStore } from "@/store/currentPage";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";

interface ChatSidebarProps {
  isMobile?: boolean;
}

const chatData = [
  {
    id: "harry-maguire",
    name: "Harry Maguire",
    lastMessage: "You need to improve now",
    timestamp: "09:12 AM",
    isPinned: true,
    isRead: false,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
  {
    id: "united-family",
    name: "United Family 🛡️",
    lastMessage: "Rashford is typing...",
    timestamp: "06:25 AM",
    isGroup: true,
    isTyping: true,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
  {
    id: "rasmus-hojlund",
    name: "Rasmus Højlund",
    lastMessage: "Bos, I need to talk today",
    timestamp: "03:11 AM",
    unreadCount: 2,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
  {
    id: "andre-onana",
    name: "Andre Onana",
    lastMessage: "I need more time bos 😊",
    timestamp: "11:34 AM",
    isRead: true,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
  {
    id: "reguilon",
    name: "Reguilon",
    lastMessage: "Great performance lad 🔥",
    timestamp: "09:12 AM",
    isRead: false,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
  {
    id: "bruno-fernandes",
    name: "Bruno Fernandes",
    lastMessage: "Play the game Bruno!",
    timestamp: "10:21 AM",
    isRead: false,
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
  },
];

export default function ChatSidebar({ isMobile }: ChatSidebarProps) {
  const { theme, setTheme } = useTheme();
  const [currentPageDesc, setCurrentPage] = useCurrentPageStore(
    useShallow((s) => [s.desc, s.setCurrentPage])
  );

  return (
    <div
      className={`w-full md:w-80 h-screen flex flex-col bg-background border-r border-border ${
        isMobile ? "w-full" : ""
      }`}
    >
      {/* Search Header */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 bg-background border-input"
              placeholder="Search conversations..."
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  <span>Change Theme</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Link to="/logout" className="">
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-3">
        <div className="flex space-x-6">
          <button className="text-sm font-medium pb-2 text-primary border-b-2 border-primary">
            All
          </button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Personal
          </button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Groups
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          {chatData
            .filter((chat) => chat.isPinned)
            .map((chat) => (
              <ContactItem
                key={chat.id}
                {...chat}
                isSelected={currentPageDesc === chat.id}
                onClick={() => setCurrentPage("chat", chat.id)}
              />
            ))}

          {chatData
            .filter((chat) => !chat.isPinned)
            .map((chat) => (
              <ContactItem
                key={chat.id}
                {...chat}
                isSelected={currentPageDesc === chat.id}
                onClick={() => setCurrentPage("chat", chat.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
