import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const isSigningUp = useAuthStore((s) => s.isSigningUp);
  const signup = useAuthStore((s) => s.signUp);

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    const usernameRegex = /^[-\w.$@*!]{6,30}$/;
    if (!usernameRegex.test(formData.username))
      return toast.error("Invalid Username");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#00ff66] font-mono relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:100%_2px]" />

      <div className="w-full max-w-md border border-[#033b1f] bg-black/90 p-8 rounded-xl shadow-[0_0_2px_#00ff6655] z-10">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-lg border border-[#033b1f] bg-[#001510] flex items-center justify-center group-hover:border-[#05ff8a] transition">
              <MessageSquare className="size-6 text-[#00ff66]" />
            </div>
            <h1 className="text-2xl font-bold mt-2 tracking-wide">
              user@system:~$ signup
            </h1>
            <p className="text-[#00ff66]/70">
              initialize account parameters below
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm"> username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff66]/50" />
              <input
                type="text"
                className="w-full bg-black border border-[#033b1f] focus:border-[#05ff8a] rounded-md pl-10 pr-3 py-2 outline-none text-[#00ff66] placeholder-[#00ff66]/40"
                placeholder="Knight_Rider"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm"> email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff66]/50" />
              <input
                type="email"
                className="w-full bg-black border border-[#033b1f] focus:border-[#05ff8a] rounded-md pl-10 pr-3 py-2 outline-none text-[#00ff66] placeholder-[#00ff66]/40"
                placeholder="your@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm"> password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff66]/50" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-black border border-[#033b1f] focus:border-[#05ff8a] rounded-md pl-10 pr-10 py-2 outline-none text-[#00ff66] placeholder-[#00ff66]/40"
                placeholder="*********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff66]/50 hover:text-[#05ff8a]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full border border-[#033b1f] rounded-md py-2 flex items-center justify-center gap-2 bg-[#001510] hover:bg-[#002511] hover:border-[#05ff8a] transition-colors disabled:opacity-50"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>compiling...</span>
              </>
            ) : (
              "execute command"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-[#00ff66]/70">
          already registered?{" "}
          <Link to="/signin" className="underline hover:text-[#05ff8a]">
            login
          </Link>
        </div>
      </div>
    </div>
  );
}
