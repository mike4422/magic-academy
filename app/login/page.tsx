"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
              Welcome back to your learning command center.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Continue your courses, complete assignments, track progress, and keep building your portfolio.
            </p>
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
                Student login
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Login to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Access your dashboard, lessons, tasks, and certificates.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                    placeholder="Enter password"
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

              <button
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 px-6 py-4 font-black text-white shadow-2xl shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              No account yet?{" "}
              <Link href="/signup" className="font-bold text-cyan-200 hover:text-white">
                Create account
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}