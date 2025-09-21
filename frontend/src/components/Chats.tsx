import { Terminal } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessagesInput from "./MessagesInput";

export default function Chats() {
  const messages = useChatStore((s) => s.messages);
  const getMessages = useChatStore((s) => s.getMessages);
  const selectedUser = useChatStore((s) => s.selectedUser);
  useEffect(() => {
    if(selectedUser && selectedUser._id)
        getMessages(selectedUser._id);

  }, [selectedUser, getMessages])
  const isMessagesLoading = useChatStore((s) => s.isMessagesLoading);
  if(isMessagesLoading){
    return <div>
      Loading...
    </div>
  }
  return (
    <div className="min-h-screen my-16 flex-1 w-full flex flex-col overflow-auto bg-[radial-gradient(ellipse_at_top_left,_#00110a,_#000)] p-6 text-[#00ff66] font-mono relative">
      <ChatHeader />
      <MessagesInput />
    </div>
  );
}
