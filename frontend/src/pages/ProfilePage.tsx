import { useAuthStore } from "../store/useAuthStore";
import { Terminal } from "lucide-react";

export default function ProfilePage() {
  const authUser = useAuthStore((s) => s.authUser);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#00110a,_#000)] p-6">
      <div className="w-full max-w-2xl border border-[#013220] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.04) 1px,transparent 1px)] bg-[length:100%_3px] mix-blend-overlay opacity-30 animate-scanline"></div>

        <div className="flex gap-4 items-start p-6 bg-black/90 text-[#00ff66] font-mono leading-relaxed">
          <div className="flex-shrink-0 mt-1">
            <Terminal className="w-8 h-8 text-[#00ff66] opacity-90 animate-pulse" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl tracking-wider uppercase drop-shadow-[0_1px_8px_rgba(0,255,102,0.15)]">
                user@system:~$ profile
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7affb2] opacity-80">status:</span>
                <span className="px-2 py-1 text-xs rounded-md bg-[rgba(0,255,102,0.06)] border border-[#033b1f]">active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow label="email" value={authUser?.email ?? "unknown@domain"} />
              <InfoRow label="username" value={authUser?.username ?? "anonymous"} />
              <InfoRow label="member since" value={authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "—"} />

              <div className="p-3 rounded-md border border-[#022b17] hover:border-[#05ff8a] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(0,255,102,0.06)]">
                <div className="text-[10px] text-[#7affb2] uppercase mb-1">account-info</div>
                <div className="text-sm break-words">Type: <span className="text-[#c7ffd9]">Standard</span></div>
                <div className="text-sm">Plan: <span className="text-[#c7ffd9]">Free</span></div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="ml-auto text-xs text-[#7affb2] flex items-center gap-2">
                <span className="animate-flicker">$</span>
                <span className="text-[12px] opacity-80">ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: string | number | null | undefined;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="p-3 rounded-md border border-[#022b17] hover:border-[#05ff8a] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,255,102,0.04)]">
      <div className="text-[10px] text-[#7affb2] uppercase mb-1">{label}</div>
      <div className="text-sm text-[#c7ffd9] break-words">
        {value ?? "—"}
      </div>
    </div>
  );
}