import { Terminal } from "lucide-react";

export default function Nochat() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#00110a,_#000)] p-6 text-[#00ff66] font-mono relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:100%_2px]" />

      <div className="w-full max-w-2xl border border-[#033b1f] rounded-xl shadow-[0_0_4px_#00ff6655] p-8 bg-black/90 z-10 flex flex-col gap-6 items-center">
        <Terminal className="w-10 h-10 animate-pulse" />
        <h1 className="text-xl tracking-wide uppercase">
          user@system:~$ chats
        </h1>

       <div className="text-center space-y-2">
        <p className="text-[#7affb2]/80">Initializing chat protocols...</p>
        <p className="text-[#7affb2]/70">
          Select a channel to begin <span className="text-[#00ff66]">operations</span>
        </p>
      </div>

      </div>
    </div>
  );
}
