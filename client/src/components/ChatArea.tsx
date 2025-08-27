import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Phone, Video, ArrowLeft, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import ChatMessage from "./ChatMessage";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { v4 as uuid } from "uuid";
import { useUsernameStore } from "@/store/username";
import { useShallow } from "zustand/shallow";
import { useCurrentPageStore } from "@/store/currentPage";

interface ChatAreaProps {
  // chatId: string;
  onShowSidebar?: () => void;
  showBackButton?: boolean;
}

type User = {
  id: string;
  name?: string;
};

type Group = {
  id: string;
  name?: string;
  direct?: boolean;
};

type Message = {
  id: string;
  sender: User;
  content: string;
  group?: Group;
  // group?: string;
  timestamp: string;
  avatar?: string;
  // isOwn?: boolean;
  sent?: boolean;
  received?: boolean;
  seen?: boolean;
};

// type MessageDTO = {
//   id: string;
//   sender: string;
//   content: string;
//   group?: string;
//   timestamp: string;
//   sent?: boolean;
// };

// const intialMessages = [
//   {
//     id: "1",
//     sender: "Harry Maguire",
//     content:
//       "Hey lads, tough game yesterday. Let's talk about what went wrong and how we can improve 😊.",
//     group: "united-family",
//     timestamp: "Sun Aug 25 2025 20:34:13 GMT+0530 (India Standard Time)",
//     avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
//     // isOwn: false,
//   },
//   {
//     id: "2",
//     sender: "Bruno Fernandes",
//     content:
//       "Agreed, Harry 👍. We had some good moments, but we need to be more clinical in front of the goal 😊.",
//     group: "united-family",
//     timestamp: "Sun Aug 25 2025 20:34:36 GMT+0530 (India Standard Time)",
//     avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
//     // isOwn: false,
//   },
//   {
//     id: "3",
//     sender: "Masi",
//     content:
//       "We need to control the midfield and exploit their defensive weaknesses. Bruno and Paul, I'm counting on your creativity. Marcus and Jadon, stretch their defense wide. Use your pace and take on their full-backs.",
//     group: "united-family",
//     timestamp: "Sun Aug 25 2025 20:34:58 GMT+0530 (India Standard Time)",
//     // isOwn: true,
//     // hasAttachment: true,
//     // sent: true,
//   },
// ];

export default function ChatArea({
  //   chatId,
  // onShowSidebar,
  showBackButton,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const username = useUsernameStore(useShallow((state) => state.username));

  const stompClient = useStompClient();

  const [currentPageDesc, setCurrentPage] = useCurrentPageStore(
    useShallow((s) => [s.desc, s.setCurrentPage])
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useSubscription(`/topic/${currentPageDesc}/public`, (message) => {
    const messageObj: Message = JSON.parse(message.body);
    console.group({ messageObj });
    if (messageObj.sender.id === username) {
      setMessages([
        ...messages.filter((m) => m.id !== messageObj.id),
        {
          ...messageObj,
          sent: true,
        },
      ]);
    } else {
      setMessages([...messages, messageObj]);
    }
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const chatMessage = {
      id: uuid(),
      sender: {
        id: username,
      },
      content: newMessage,
      group: {
        id: currentPageDesc,
      },
      type: "CHAT",
      timestamp: new Date().toString(),
    };

    if (stompClient) {
      stompClient.publish({
        destination: `/app/chat/${currentPageDesc}/sendMessage`,
        body: JSON.stringify({
          ...chatMessage,
          sender: {
            id: username,
          },
          group: { id: currentPageDesc },
        }),
        headers: { username },
      });
    } else {
      console.log("StompClient is Invalid!", stompClient);
    }
    setNewMessage("");
    console.log({ chatMessage });
    setMessages([...messages, chatMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetch(
      `http://${
        (import.meta.env.VITE_URL ?? "ws://localhost:8080/ws").match(
          /^wss?:\/\/([^/]+)/
        )?.[1] ?? ""
      }/messages/${currentPageDesc || "united-family"}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setMessages(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [currentPageDesc]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setCurrentPage("home");
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-chat-sidebar">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage("home")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <UserAvatar
              name={currentPageDesc}
              src="/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png"
            />
            <div>
              <h2 className="font-semibold text-foreground">
                {currentPageDesc}
              </h2>
              <p className="text-sm text-chat-typing">Rashford is typing...</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            Today
          </span>
        </div>

        {messages?.length > 0 && (
          <>
            {messages?.map((message, idx) => (
              <ChatMessage
                key={idx}
                {...message}
                isOwn={username === message.sender.id}
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-border bg-background z-20">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4"></Send>
          </Button>
        </div>
      </div>
    </div>
  );
}
