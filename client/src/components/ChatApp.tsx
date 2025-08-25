import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState("united-family");
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useIsMobile();

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile backdrop */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
        ${isMobile && !showSidebar ? "-translate-x-full" : "translate-x-0"}
        transition-transform duration-300 ease-in-out
      `}
      >
        <ChatSidebar
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          isMobile={isMobile}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 min-w-0">
        <ChatArea
          chatId={selectedChat}
          onShowSidebar={() => setShowSidebar(true)}
          showBackButton={isMobile}
        />
      </div>
    </div>
  );
}
