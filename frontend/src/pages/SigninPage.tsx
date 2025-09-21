import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Terminal, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signin = useAuthStore((s) => s.signin);
  const isLoggingIn = useAuthStore((s) => s.isLoggingIn);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#00110a,_#000)] p-6">
      <div className="w-full max-w-lg border border-[#013220] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:100%_3px] mix-blend-overlay opacity-30 animate-scanline"></div>

        <div className="flex gap-4 items-start p-6 bg-black/90 text-[#00ff66] font-mono leading-relaxed">
          <div className="flex-shrink-0 mt-1">
            <Terminal className="w-8 h-8 text-[#00ff66] opacity-90 animate-pulse" />
          </div>

          <div className="flex-1">
            <h1 className="text-xl tracking-wider uppercase mb-6">
              user@system:~$ login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs text-[#7affb2] uppercase mb-1">
                  email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0aff66]/50" />
                  <input
                    type="email"
                    className="w-full bg-black/70 border border-[#022b17] focus:border-[#05ff8a] rounded-md pl-10 pr-3 py-2 outline-none text-[#c7ffd9] placeholder-[#00ff66]/40"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#7affb2] uppercase mb-1">
                  password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0aff66]/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-black/70 border border-[#022b17] focus:border-[#05ff8a] rounded-md pl-10 pr-10 py-2 outline-none text-[#c7ffd9] placeholder-[#00ff66]/40"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#0aff66]/50 hover:text-[#05ff8a] z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md border border-[#033b1f] bg-[#001510] text-[#00ff66] hover:bg-[#002511] hover:border-[#05ff8a] hover:text-[#b7ffd8] transition transform hover:-translate-y-0.5"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    authenticating...
                  </span>
                ) : (
                  <span>$ sign in</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-sm text-[#7affb2]">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="underline hover:text-[#00ff66] transition-colors"
              >
                create one
              </Link>
            </div>

            <div className="mt-6 text-xs text-[#7affb2] flex items-center gap-2">
              <span className="animate-flicker">$</span>
              <span className="text-[12px] opacity-80">
                awaiting credentials...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
