import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "ABX12",
          },
        })
      );
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const message = inputRef.current?.value;
    if (message && wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message },
        })
      );
      if(inputRef.current && inputRef.current.value){
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-zinc-950 via-black to-neutral-900 text-white font-sans">
      <div className="flex-1 overflow-y-auto px-6 py-10 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-white/10 text-white max-w-[80%] w-fit rounded-2xl px-5 py-3 backdrop-blur-md"
            >
              {message}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-6 bg-black/30 backdrop-blur-md shadow-inner flex items-center gap-4 sticky bottom-0 z-10">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 transition"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}

export default App;
