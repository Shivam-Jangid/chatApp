import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { useChatStore } from "@/store/useChatstore";


export default function ChatInput() {

  const [inputMess, setInputMess] = useState(""); 
  const {sendMessage} = useChatStore();

  const [btn,setBtn] = useState(false);

  useEffect(() => {

    if(inputMess.trim() === "") setBtn(false);
  
    else setBtn(true);
  },[inputMess]) 

  function sendmessage(){
    if(inputMess.trim() != ""){
      sendMessage({text:inputMess.trim()});
      setInputMess("");
    }

    else{
      return;
    }
  }

  return (
    <div className="flex gap-5 items-center justify-between">
    <Input value={inputMess} onChange={(e) => {setInputMess(e.target.value)}} className="text-base bottom-0" placeholder="Type your message here..." />
    <button onClick={sendmessage} 
    className={btn ? "cursor-pointer text-foreground/80" :"cursor-not-allowed text-foreground/30"} 
    ><Send /></button>
    </div>
  )
}
