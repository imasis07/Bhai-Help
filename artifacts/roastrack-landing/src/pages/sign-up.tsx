import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, BarChart3 } from "lucide-react";

const BG     = "hsl(222,47%,6%)";
const CARD   = "hsl(222,47%,9%)";
const INPUT  = "hsl(222,47%,12%)";
const BORDER = "rgba(14,165,233,0.18)";
const BORDER_FOCUS = "rgba(14,165,233,0.5)";
const PRIMARY = "hsl(199,89%,48%)";
const DIM2   = "rgba(255,255,255,0.28)";

export default function SignUpPage() {
  const [, setLocation] = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation("/verify-email");
    }, 900);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden py-8" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(14,165,233,0.05)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="px-8 pt-8 pb-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-7">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                <BarChart3 className="w-4 h-4" style={{ color: PRIMARY }} />
              </div>
              <span className="font-bold text-white">ROAS<span style={{ color: PRIMARY }}>Track</span></span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-sm mb-7" style={{ color: DIM2 }}>Start tracking influencer ROI for free</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: DIM2 }}>First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Rahul"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: INPUT, border: "1px solid rgba(14,165,233,0.18)", caretColor: PRIMARY }}
                    onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: DIM2 }}>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Sharma"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: INPUT, border: "1px solid rgba(14,165,233,0.18)", caretColor: PRIMARY }}
                    onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: DIM2 }}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{ background: INPUT, border: "1px solid rgba(14,165,233,0.18)", caretColor: PRIMARY }}
                  onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: DIM2 }}>Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: INPUT, border: "1px solid rgba(14,165,233,0.18)", caretColor: PRIMARY }}
                    onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: DIM2 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    onMouseLeave={e => (e.currentTarget.style.color = DIM2)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password strength */}
                {password.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{
                        background: password.length >= i * 2
                          ? i <= 1 ? "hsl(0,80%,60%)" : i === 2 ? "hsl(35,90%,55%)" : i === 3 ? "hsl(45,100%,55%)" : "hsl(142,71%,55%)"
                          : "rgba(255,255,255,0.08)"
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Terms */}
              <p className="text-[11px]" style={{ color: DIM2 }}>
                By creating an account, you agree to our{" "}
                <span className="underline cursor-pointer" style={{ color: PRIMARY }}>Terms of Service</span> and{" "}
                <span className="underline cursor-pointer" style={{ color: PRIMARY }}>Privacy Policy</span>.
              </p>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ background: PRIMARY, color: "hsl(222,47%,6%)", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="text-xs" style={{ color: DIM2 }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="#4285F4" d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.67 3.67 0 0 1-1.6 2.41v2h2.58c1.52-1.4 2.4-3.46 2.4-5.87z"/>
                <path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.58-2a4.8 4.8 0 0 1-7.17-2.52H.93v2.07A8 8 0 0 0 8 16z"/>
                <path fill="#FBBC05" d="M3.55 9.54A4.83 4.83 0 0 1 3.3 8c0-.53.09-1.05.25-1.54V4.39H.93A8 8 0 0 0 0 8c0 1.29.31 2.51.93 3.61l2.62-2.07z"/>
                <path fill="#EA4335" d="M8 3.18c1.23 0 2.33.42 3.2 1.25l2.4-2.4A8 8 0 0 0 .93 4.39L3.55 6.46A4.77 4.77 0 0 1 8 3.18z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm mt-6" style={{ color: DIM2 }}>
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold" style={{ color: PRIMARY }}>Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
