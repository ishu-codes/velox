// import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrentPageStore } from "@/store/currentPage";
import { useShallow } from "zustand/shallow";

export default function ChatApp() {
  // const [selectedChat, setSelectedChat] = useState();
  // const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useIsMobile();

  const [currentPage] = useCurrentPageStore(
    useShallow((s) => [s.currentPage, s.desc, s.setCurrentPage])
  );

  // const handleSelectChat = (chatId: string) => {
  //   setSelectedChat(chatId);
  //   if (isMobile) {
  //     setShowSidebar(false);
  //   }
  // };

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile backdrop */}
      {/* {isMobile && showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )} */}

      {/* Sidebar */}
      <div
        className={`
        w-full md:w-fit absolute md:relative md:translate-0
        transition-transform duration-300 ease-in-out z-50
      `}
        style={{
          transform: `${
            isMobile && currentPage !== "home" ? "translateX(-100%)" : ""
          }`,
        }}
      >
        <ChatSidebar isMobile={isMobile} />
      </div>

      {/* Main chat area */}
      <div className="w-full min-w-0 z-0">
        <ChatArea showBackButton={isMobile} />
      </div>
    </div>
  );
}
