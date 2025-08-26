import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Phone, Video, ArrowLeft, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import ChatMessage from "./ChatMessage";
import { useStompClient, useSubscription } from "react-stomp-hooks";

interface ChatAreaProps {
  chatId: string;
  onShowSidebar?: () => void;
  showBackButton?: boolean;
}

type Message = {
  // id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar?: string;
  // isOwn?: boolean;
};

const intialMessages = [
  {
    id: "1",
    sender: "Harry Maguire",
    content:
      "Hey lads, tough game yesterday. Let's talk about what went wrong and how we can improve 😊.",
    timestamp: "08:34 AM",
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
    // isOwn: false,
  },
  {
    id: "2",
    sender: "Bruno Fernandes",
    content:
      "Agreed, Harry 👍. We had some good moments, but we need to be more clinical in front of the goal 😊.",
    timestamp: "08:34 AM",
    avatar: "/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png",
    // isOwn: false,
  },
  {
    id: "3",
    sender: "You",
    content:
      "We need to control the midfield and exploit their defensive weaknesses. Bruno and Paul, I'm counting on your creativity. Marcus and Jadon, stretch their defense wide. Use your pace and take on their full-backs.",
    timestamp: "08:34 AM",
    // isOwn: true,
    // hasAttachment: true,
  },
];

const username = "you";

export default function ChatArea({
  //   chatId,
  onShowSidebar,
  showBackButton,
}: ChatAreaProps) {
  //   const isUnitedFamily = chatId === "united-family";
  const [messages, setMessages] = useState<Message[]>(intialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stompClient = useStompClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getTimestamp = (date?: Date) => {
    const newDate = new Date(date ?? new Date());
    return newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useSubscription("/topic/public", (message) => {
    const messageObj: Message = JSON.parse(message.body);
    setMessages([...messages, messageObj]);
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const chatMessage = {
      sender: username,
      content: newMessage,
      type: "CHAT",
      timestamp: getTimestamp(),
    };

    if (stompClient) {
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
        headers: { username: "you" },
      });
    } else {
      console.log("StompClient is Invalid!", stompClient);
    }
    setNewMessage("");
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
    console.log("StompClient state:", {
      client: stompClient,
      connected: stompClient?.connected,
      active: stompClient?.active,
    });
  }, [stompClient]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-chat-sidebar">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={onShowSidebar}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <UserAvatar
              name="United Family"
              src="/lovable-uploads/ff800aa0-969a-49b0-b79c-2aa6f203cd34.png"
            />
            <div>
              <h2 className="font-semibold text-foreground">
                United Family 🛡️
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

        {messages.map((message, idx) => (
          <ChatMessage
            key={idx}
            {...message}
            isOwn={username === message.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-border bg-background">
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
