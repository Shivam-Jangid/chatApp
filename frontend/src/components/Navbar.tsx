import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User } from "lucide-react";

export default function Navbar() {
  const signout = useAuthStore((s) => s.signout);
  const authUser = useAuthStore((s) => s.authUser);

  return (
    <header className="fixed h-16 w-full top-0 z-40 border-b border-[#013220] bg-black/90 backdrop-blur-sm text-[#00ff66] font-mono">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-[#7affb2] transition-colors"
        >
          <div className="w-8 h-8 rounded-md border border-[#033b1f] bg-[#001510] flex items-center justify-center hover:border-[#05ff8a] transition">
            <MessageSquare className="w-4 h-4 text-[#00ff66]" />
          </div>
          <h1 className="text-sm sm:text-base font-bold tracking-wide">
            user@system:~$ chat
          </h1>
        </Link>

        <div className="flex items-center gap-2 text-sm">

          {authUser && (
            <>
              <Link
                to="/profile"
                className="px-3 py-1 rounded-md border border-[#033b1f] bg-[#001510] hover:bg-[#002511] hover:border-[#05ff8a] hover:text-[#b7ffd8] transition-colors flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">profile</span>
              </Link>

              <button
                onClick={signout}
                className="px-3 py-1 rounded-md border border-[#033b1f] bg-[#001510] hover:bg-[#330a0a] hover:border-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
