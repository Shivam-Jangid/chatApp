import { useChatStore } from "@/store/useChatstore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "@/store/useAuthstore";

export default function Chatselected() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authuser } = useAuthStore();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser && getMessages)
       getMessages(selectedUser._id);
  }, [getMessages, selectedUser]);

  useEffect(() =>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth" });
    }
  }, [messages])
  
  if (isMessagesLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <svg
          className="size-10 text-foreground/50 animate-spin"
          xmlns="www.w3.org"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <div className="h-full px-3 flex flex-col pb-4 w-full">
      <ChatHeader selectedUser={selectedUser} />
      <div className="space-y-3 flex-1 pb-3 overflow-auto">
  {messages.map((msg) => {
    const isOwnMessage = msg.senderId === authuser?._id;
    const isRelevant = selectedUser && (
      (isOwnMessage && msg.receiverId === selectedUser._id) ||
      (!isOwnMessage && msg.senderId === selectedUser._id)
    );

    if (!isRelevant) return null;

    return (
      <div 
        key={msg._id} 
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
        ref = {messageEndRef}
      >
        <div className={`max-w-[75%] rounded-2xl px-4 py-2 mb-1 ${
          isOwnMessage 
            ? 'bg-blue-600 text-white rounded-bl-none' 
            : 'bg-gray-200 text-gray-800 rounded-br-none'
        }`}>
          <div className={`text-[10px] mb-1 ${
            isOwnMessage ? 'text-blue-100 text-left' : 'text-gray-500 text-right'
          }`}>
            {msg.date}
          </div>
          <p className="text-sm break-words">{msg.text}</p>
          <div className={`text-[10px] mt-1 ${
            isOwnMessage ? 'text-blue-100 text-left' : 'text-gray-500 text-right'
          }`}>
            {msg.time}
          </div>
        </div>
      </div>
    );
  })}
</div>
          

      <ChatInput />
    </div>
  );
}
