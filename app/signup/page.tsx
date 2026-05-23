"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Account created. Please check your email to confirm your account.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />
      <div className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-[-10%] top-32 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />

      <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hidden lg:block"
          >
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-black">Magic Academy</p>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                  Elite Tech School
                </p>
              </div>
            </Link>

            <h1 className="mt-10 max-w-2xl text-6xl font-black tracking-[-0.06em]">
              Start building your digital future today.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Join a premium learning platform for fullstack web development,
              mobile apps, AI automation, UI/UX design, ads creation, and freelancing.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["40+", "Projects"],
                ["6", "Tracks"],
                ["24/7", "Access"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
                >
                  <p className="text-3xl font-black">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <p className="font-black">Magic Academy</p>
            </Link>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">
                Create account
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Join Magic Academy
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Create your student account and start your learning journey.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            {message && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {message}
              </div>
            )}

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Full name
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                  <User className="h-5 w-5 text-cyan-300" />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                  <Mail className="h-5 w-5 text-cyan-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                  <Lock className="h-5 w-5 text-cyan-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Confirm password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                  <Lock className="h-5 w-5 text-cyan-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 px-6 py-4 font-black text-white shadow-2xl shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-cyan-200 hover:text-white">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}