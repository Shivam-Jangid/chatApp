import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function SideBar() {
  const getUsers = useChatStore((s) => s.getUsers);
  const users = useChatStore((s) => s.users);
  const setSelectedUser = useChatStore((s) => s.setSelectedUser);
  const isUsersLoading = useChatStore((s) => s.isUsersLoading);

  const onlineUsers = useAuthStore((s) => s.onlineUsers);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading)
    return (
      <div className="flex min-w-[200px] items-center justify-center text-red-500 font-mono h-full">
        <span className="animate-pulse">$ fetching users...</span>
      </div>
    );

  return (
    <div
      className="
        w-52 sm:w-sm mt-16 p-4 font-mono relative shadow-[0_0_15px_rgba(255,0,0,0.5)]
        bg-gradient-to-b from-black via-[#220000] to-black
        border border-slate-100/20 overflow-hidden
        before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,#44000020,#00000000)] before:pointer-events-none
        after:absolute after:inset-0 after:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] after:bg-[size:100%_2px] after:pointer-events-none
      "
    >
      <div className="flex items-center gap-2 mb-4 relative z-10 text-white">
        <User className="w-5 h-5 text-red-500 animate-pulse" />
        <h2 className="text-sm tracking-wider uppercase">$ users</h2>
      </div>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto relative z-10">
        {users.map((userItem) => {
          const isOnline = onlineUsers.includes(userItem);

          return (
            <button
            onClick={() => setSelectedUser(userItem)}
              key={userItem._id}
              className={`flex flex-col px-3 py-2 rounded-md  transition-colors cursor-pointer relative ${!isOnline?"hover:bg-[#330000]/50":"hover:bg-[#84cc322b]"}`}
            >
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-1 ${
                  isOnline ? "bg-green-500 ring-green-700" : "bg-red-500 ring-red-700"
                }`}
              />

              <div className="flex flex-col text-left">
                <span className={`text-white`}>{userItem.username}</span>
                <span
                  className={`text-xs font-mono ${
                    isOnline ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {isOnline ? "online" : "offline"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
