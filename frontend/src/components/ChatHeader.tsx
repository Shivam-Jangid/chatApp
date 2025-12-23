import type { userType } from "@/store/useChatstore";

export default function ChatHeader({
  selectedUser,
}: {
  selectedUser: userType | null;
}) {
  return (
    <div className=" flex items-center pt-2 pb-4 gap-3">
      <div className="rounded-full border bg-foreground/30 py-1 text-background text-lg px-3">{selectedUser?.username[0].toUpperCase()}</div>

      <div className="flex-1">
        <div className="">{selectedUser?.username}</div>
        <div className="text-xs text-foreground/50">Offline</div>
      </div>
    </div>
  );
}
