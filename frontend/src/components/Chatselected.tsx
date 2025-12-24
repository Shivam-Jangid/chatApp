import { useChatStore } from "@/store/useChatstore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "@/store/useAuthstore";

export default function Chatselected() {
  const { messages, getMessages, isMessagesLoading,subscribing,unsubscribing, selectedUser } =
    useChatStore();
  const { authuser } = useAuthStore();

  useEffect(() => {
    if (selectedUser && getMessages)
       getMessages(selectedUser._id);
    subscribing();
    return () => unsubscribing();
  }, [getMessages, selectedUser,subscribing,unsubscribing]);
  
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
        {messages.map((message) => <div key={message._id} className="flex justify-between">
              {message.senderId == authuser?._id && selectedUser?._id == message.receiverId ? (
                <div className="lg:w-1/4 max-w-1/2  bg-blue-600 text-white rounded-2xl rounded-bl-none px-3 py-1  shadow-md">
                  <div className="flex items-center justify-start mb-2 text-[10px] opacity-90">
                    <span className="">{message.date}</span>
                  </div>
                  <p className=" text-sm ">{message.text}</p>
                  <div className="flex items-center justify-start mt-2 text-[10px] opacity-90">
                    <span className="">{message.time}</span>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {message.senderId == selectedUser?._id ? (
                <div className="bg-gray-300 max-w-1/2  lg:w-1/4 text-gray-800 rounded-2xl rounded-br-none px-3 py-1 shadow-sm">
                  <div className="flex items-center mb-2 justify-end text-[10px] text-gray-500">
                    {message.date}
                  </div>
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center mt-2 justify-end text-[10px] text-gray-500">
                    {message.time}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            )}
      </div>

      <ChatInput />
    </div>
  );
}
