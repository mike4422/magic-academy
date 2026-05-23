"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Smartphone,
  Megaphone,
  Bot,
  Palette,
  BriefcaseBusiness,
  PlayCircle,
  CheckCircle2,
  Star,
  ShieldCheck,
  Trophy,
  Zap,
  Users,
  BookOpen,
  Menu,
  X,
  Moon,
  Sun,
  TerminalSquare,
  BarChart3,
  GraduationCap,
  Download,
  Video,
  MessageCircle,
  Layers3,
  Cpu,
  Globe2,
  ChevronDown,
} from "lucide-react";

const navItems = ["Courses", "Experience", "Dashboard", "Pricing", "FAQ"];

const techLogos = ["HTML", "CSS", "JS", "React", "Next.js", "Node", "SQL", "AI"];

const categories = [
  {
    title: "Fullstack Web Development",
    icon: Code2,
    level: "Beginner to Pro",
    duration: "16 weeks",
    instructor: "Magic Dev Team",
    gradient: "from-cyan-400 via-blue-500 to-purple-500",
    description: "Build production-ready websites, dashboards, APIs, databases, and fullstack SaaS applications.",
  },
  {
    title: "React & Next.js",
    icon: Layers3,
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Frontend Studio",
    gradient: "from-blue-400 via-cyan-400 to-teal-300",
    description: "Master modern frontend architecture, routing, components, animations, and app deployment.",
  },
  {
    title: "Node.js Backend",
    icon: Cpu,
    level: "Intermediate",
    duration: "7 weeks",
    instructor: "Backend Lab",
    gradient: "from-emerald-300 via-cyan-400 to-blue-500",
    description: "Create secure APIs, authentication, database flows, admin systems, and server-side logic.",
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    level: "Beginner Friendly",
    duration: "12 weeks",
    instructor: "Mobile Guild",
    gradient: "from-purple-400 via-fuchsia-500 to-pink-400",
    description: "Design and ship sleek mobile apps with modern UI patterns and real-world workflows.",
  },
  {
    title: "Flutter Development",
    icon: Smartphone,
    level: "Practical Track",
    duration: "10 weeks",
    instructor: "App Studio",
    gradient: "from-sky-300 via-blue-500 to-indigo-500",
    description: "Build cross-platform mobile apps with clean layouts, state handling, and polished UX.",
  },
  {
    title: "Ads Creation & Marketing",
    icon: Megaphone,
    level: "Business Track",
    duration: "6 weeks",
    instructor: "Growth Lab",
    gradient: "from-orange-300 via-pink-500 to-purple-500",
    description: "Create ad creatives, funnels, analytics dashboards, campaign systems, and conversion flows.",
  },
  {
    title: "AI Automation",
    icon: Bot,
    level: "Modern Skills",
    duration: "5 weeks",
    instructor: "AI Ops Team",
    gradient: "from-cyan-300 via-violet-500 to-fuchsia-500",
    description: "Use AI tools, agents, prompts, automations, and APIs to build smarter digital products.",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    level: "Creative Track",
    duration: "6 weeks",
    instructor: "Design Studio",
    gradient: "from-violet-400 via-purple-500 to-cyan-400",
    description: "Design premium interfaces, fintech dashboards, landing pages, design systems, and prototypes.",
  },
  {
    title: "Freelancing & Tech Skills",
    icon: BriefcaseBusiness,
    level: "Career Track",
    duration: "4 weeks",
    instructor: "Career Lab",
    gradient: "from-amber-300 via-orange-400 to-pink-500",
    description: "Learn proposals, pricing, client communication, portfolio packaging, and project delivery.",
  },
];

const experience = [
  { icon: TerminalSquare, title: "Interactive coding lessons", text: "Learn by building inside guided coding challenges and real project flows." },
  { icon: Globe2, title: "Real-world projects", text: "Every skill connects to practical websites, apps, dashboards, and client-ready products." },
  { icon: Smartphone, title: "Mobile-friendly learning", text: "Study from desktop or mobile with a clean, distraction-free learning workspace." },
  { icon: GraduationCap, title: "Certificates", text: "Complete tracks, submit projects, and earn branded certificates for your portfolio." },
  { icon: Users, title: "Mentorship", text: "Get structured guidance, reviews, and direction from experienced builders." },
  { icon: MessageCircle, title: "Community support", text: "Join focused student circles, challenges, leaderboards, and weekly accountability." },
  { icon: Video, title: "Live classes", text: "Attend live sessions, breakdowns, project reviews, and roadmap planning calls." },
  { icon: Download, title: "Downloadable resources", text: "Access templates, project briefs, checklists, notes, and assignment files." },
];

const pricing = [
  {
    name: "Starter",
    priceMonthly: 500,
    priceYearly: 2050,
    badge: "For beginners",
    description: "Start learning core tech skills with guided videos and practice tasks.",
    features: ["Core beginner courses", "Weekly assignments", "Downloadable resources", "Community access", "Progress tracker"],
  },
  {
    name: "Pro",
    priceMonthly: 850,
    priceYearly: 4500,
    badge: "Most Popular",
    description: "Build serious portfolio projects with mentorship and structured reviews.",
    features: ["All Starter features", "Fullstack project roadmap", "Mentor project reviews", "Certificates", "Private student dashboard", "Live class access"],
    popular: true,
  },
  {
    name: "Premium",
    priceMonthly: 1200,
    priceYearly: 7500,
    badge: "Career accelerator",
    description: "For students who want deeper support, project polish, and freelance readiness.",
    features: ["All Pro features", "1-on-1 strategy calls", "Portfolio review", "Freelance launch plan", "Priority support", "Advanced AI automation track"],
  },
];

const testimonials = [
  {
    name: "Ada M.",
    role: "Frontend Student",
    result: "Built 5 portfolio projects",
    quote: "Magic Academy made the learning path clear. I stopped jumping between random tutorials and started shipping real projects.",
  },
  {
    name: "David K.",
    role: "Freelance Developer",
    result: "Landed first client project",
    quote: "The project tasks helped me explain my skills to clients. The dashboard and roadmap made the journey feel premium and serious.",
  },
  {
    name: "Mira T.",
    role: "Marketing Student",
    result: "Created campaign dashboards",
    quote: "I joined for web development but the ads and AI automation tracks helped me build a complete digital business skillset.",
  },
];

const faqs = [
  {
    q: "Is Magic Academy beginner friendly?",
    a: "Yes. The roadmap starts from the fundamentals and gradually moves into fullstack apps, mobile apps, AI tools, UI/UX, marketing, and freelancing.",
  },
  {
    q: "Will students build real projects?",
    a: "Yes. Every track includes project tasks, submission checklists, dashboard progress, and portfolio-focused assignments.",
  },
  {
    q: "Does it include mentorship?",
    a: "The Pro and Premium plans include structured mentorship, project reviews, live sessions, and community support.",
  },
  {
    q: "Can students learn on mobile?",
    a: "Yes. The platform is designed to be responsive, with mobile-friendly lessons, dashboards, and progress tracking.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function GlowOrb({ className }: { className: string }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl"
    >
      <Sparkles className="h-4 w-4 text-cyan-300" />
      {children}
    </motion.div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-cyan-400/[0.05]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Navbar({ theme, setTheme }: { theme: "dark" | "light"; setTheme: (theme: "dark" | "light") => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:px-6"
      >
        <a href="/signup" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-base font-black tracking-tight text-white">Magic Academy</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-200/70">Elite Tech School</p>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
         <a
  href="/login"
  className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
>
  Login
</a>

<a
  href="/signup"
  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20"
>
  Start Learning
  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
</a>
        </div>

        <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 p-4 backdrop-blur-xl lg:hidden"
          >
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-black text-white">Magic Academy</p>
                </div>
                <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 grid gap-2">
                {navItems.map((item) => (
                  <a key={item} onClick={() => setOpen(false)} href={`#${item.toLowerCase()}`} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-semibold text-white">
                    {item}
                  </a>
                ))}
               <div className="mt-3 grid grid-cols-2 gap-3">
  <a
    onClick={() => setOpen(false)}
    href="/login"
    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-bold text-white"
  >
    Login
  </a>

  <a
    onClick={() => setOpen(false)}
    href="/signup"
    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-slate-950"
  >
    Start Learning <ArrowRight className="h-4 w-4" />
  </a>
</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-36 lg:pb-28 lg:pt-44">
      <GlowOrb className="left-[-10%] top-20 h-80 w-80 bg-cyan-500/20" />
      <GlowOrb className="right-[-5%] top-28 h-96 w-96 bg-purple-600/25" />
      <GlowOrb className="bottom-0 left-1/3 h-80 w-80 bg-blue-500/10" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_50px_rgba(34,211,238,0.16)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </span>
            New cohort enrolling now
          </div>

          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Learn High-Income Tech Skills with a Premium Digital Academy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Build apps, websites, AI automations, marketing systems, and fullstack products through a structured project-based learning experience built for serious beginners.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
  href="/login"
  className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
>
  Login
</a>

<a
  href="/signup"
  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20"
>
  Start Learning
  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
</a>
            <a href="#courses" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
              <PlayCircle className="h-5 w-5 text-cyan-300" />
              Explore Courses
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
            {[
              ["10k+", "Learning hours"],
              ["92%", "Completion focus"],
              ["40+", "Project tasks"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                <p className="text-2xl font-black text-white sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-2">
            {techLogos.map((logo) => (
              <span key={logo} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-cyan-400/20 via-purple-600/20 to-transparent blur-3xl" />
          <PremiumCard className="p-4 sm:p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">Live Builder</span>
              </div>

              <div className="grid gap-4 pt-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-4 font-mono text-sm text-slate-300">
                  <p className="text-purple-300">const academy = &#123;</p>
                  <p className="pl-4"><span className="text-cyan-300">track</span>: <span className="text-emerald-300">"Fullstack"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">skills</span>: ["React", "Node", "AI"],</p>
                  <p className="pl-4"><span className="text-cyan-300">project</span>: <span className="text-emerald-300">"SaaS Dashboard"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">status</span>: <span className="text-emerald-300">"Portfolio Ready"</span></p>
                  <p className="text-purple-300">&#125;</p>
                  <div className="mt-5 rounded-2xl bg-slate-900 p-3 text-xs text-slate-400">
                    <p className="text-cyan-300">$ npm run build</p>
                    <p className="mt-2">Compiled successfully in 1.8s</p>
                    <p>Deployment preview generated</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-purple-600/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-white">Course Progress</p>
                      <p className="text-sm font-black text-cyan-200">76%</p>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div initial={{ width: 0 }} animate={{ width: "76%" }} transition={{ delay: 0.5, duration: 1.2 }} className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-purple-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      [Trophy, "XP", "8,420"],
                      [CheckCircle2, "Done", "64"],
                      [BookOpen, "Lessons", "118"],
                      [Star, "Rank", "Top 5%"],
                    ].map(([Icon, label, value]: any) => (
                      <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                        <Icon className="h-5 w-5 text-cyan-300" />
                        <p className="mt-3 text-lg font-black text-white">{value}</p>
                        <p className="text-xs text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PremiumCard>

          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-4 top-10 hidden rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:block">
            <p className="text-xs text-slate-300">Next lesson</p>
            <p className="mt-1 font-bold text-white">Build Auth API</p>
          </motion.div>
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-4 right-4 rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
            <p className="text-xs text-slate-300">Project unlocked</p>
            <p className="mt-1 font-bold text-white">Fintech Dashboard</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PremiumCard className="p-5 sm:p-7">
          <div className="grid items-center gap-7 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">Trusted learning ecosystem</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Built for students who want real results, not random tutorials.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [Users, "2,500+", "Community learners"],
                [ShieldCheck, "100%", "Project-led roadmap"],
                [Zap, "24/7", "Self-paced access"],
                [Trophy, "40+", "Portfolio tasks"],
              ].map(([Icon, value, label]: any) => (
                <motion.div key={label} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <p className="mt-4 text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function CourseCategories() {
  return (
    <section id="courses" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Premium course catalog</SectionBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">Everything needed to build, launch, and sell digital skills.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">A complete learning ecosystem covering fullstack development, mobile apps, AI automation, UI/UX, digital marketing, and freelancing.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.article
                key={course.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.04, duration: 0.55 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${course.gradient}`} />
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${course.gradient} opacity-20 blur-3xl transition group-hover:opacity-35`} />
                <div className="relative">
                  <div className={`grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br ${course.gradient} shadow-lg shadow-cyan-500/10`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-white">{course.title}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">{course.description}</p>
                  <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-sm">
                    <div className="flex justify-between gap-3"><span className="text-slate-400">Level</span><span className="font-bold text-white">{course.level}</span></div>
                    <div className="flex justify-between gap-3"><span className="text-slate-400">Duration</span><span className="font-bold text-white">{course.duration}</span></div>
                    <div className="flex justify-between gap-3"><span className="text-slate-400">Instructor</span><span className="font-bold text-white">{course.instructor}</span></div>
                  </div>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 font-bold text-white transition group-hover:bg-white group-hover:text-slate-950">
                    View Track <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LearningExperience() {
  return (
    <section id="experience" className="relative px-4 py-24">
      <GlowOrb className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionBadge>Learning experience</SectionBadge>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">A bootcamp-style experience inside a polished SaaS platform.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">Magic Academy combines video lessons, structured assignments, coding practice, progress tracking, mentorship, and career-focused projects in one premium dashboard.</p>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-white">Project-first roadmap</p>
                  <p className="text-sm text-slate-400">Every module ends with a task, review checklist, and portfolio artifact.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {experience.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.035 }} whileHover={{ y: -5 }} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Student SaaS dashboard</SectionBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">Track progress like a serious digital operator.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">A futuristic student dashboard for lessons, analytics, assignments, XP, certificates, notifications, and leaderboard progress.</p>
        </div>

        <PremiumCard className="mt-14 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center gap-3 rounded-3xl bg-white/[0.05] p-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-purple-600 font-black text-white">MA</div>
                <div>
                  <p className="font-black text-white">Student Portal</p>
                  <p className="text-xs text-slate-400">Pro Plan Active</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {["Overview", "Courses", "Assignments", "Leaderboard", "Certificates"].map((item, index) => (
                  <div key={item} className={`rounded-2xl px-4 py-3 text-sm font-bold ${index === 0 ? "bg-cyan-300/10 text-cyan-200" : "text-slate-400"}`}>{item}</div>
                ))}
              </div>
            </aside>

            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Progress", "76%", "from 62% last week"],
                  ["XP Points", "8,420", "+920 this month"],
                  ["Completed", "64", "lessons finished"],
                  ["Rank", "#12", "community board"],
                ].map(([label, value, sub]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-3 text-3xl font-black text-white">{value}</p>
                    <p className="mt-1 text-xs text-cyan-200">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-white">Learning Analytics</p>
                      <p className="text-sm text-slate-400">Weekly study activity and task completion</p>
                    </div>
                    <BarChart3 className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div className="mt-7 flex h-52 items-end gap-3">
                    {[42, 64, 48, 78, 58, 86, 92, 72, 88].map((height, index) => (
                      <motion.div key={index} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.04 }} className="flex-1 rounded-t-2xl bg-gradient-to-t from-cyan-500 to-purple-500" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    ["Next assignment", "Build REST API with auth"],
                    ["Live class", "React dashboard review"],
                    ["Certificate", "Fullstack Module 01 ready"],
                  ].map(([title, sub]) => (
                    <div key={title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                      <p className="text-sm text-slate-400">{title}</p>
                      <p className="mt-2 font-black text-white">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function CodingPlayground() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionBadge>Coding playground</SectionBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Practice inside a premium developer workspace.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Give students a VSCode-inspired coding flow with lesson notes, terminal output, browser preview, syntax highlighting, and guided project missions.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Live preview", "Terminal tasks", "Project briefs", "Submission checklist"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                <span className="font-bold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <PremiumCard className="p-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#060913]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <p className="text-xs font-bold text-slate-400">magic-academy/app/page.tsx</p>
            </div>
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-white/10 p-5 font-mono text-sm leading-7 text-slate-300 lg:border-b-0 lg:border-r">
                <p><span className="text-purple-300">export default</span> <span className="text-cyan-300">function</span> <span className="text-emerald-300">Dashboard</span>() &#123;</p>
                <p className="pl-4"><span className="text-purple-300">return</span> (</p>
                <p className="pl-8">&lt;<span className="text-cyan-300">main</span> className=<span className="text-emerald-300">"grid"</span>&gt;</p>
                <p className="pl-12">&lt;<span className="text-cyan-300">CourseCard</span> /&gt;</p>
                <p className="pl-12">&lt;<span className="text-cyan-300">ProgressChart</span> /&gt;</p>
                <p className="pl-8">&lt;/<span className="text-cyan-300">main</span>&gt;</p>
                <p className="pl-4">)</p>
                <p>&#125;</p>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs">
                  <p className="text-cyan-300">$ magic submit assignment</p>
                  <p className="mt-2 text-slate-400">Checking UI responsiveness...</p>
                  <p className="text-emerald-300">✓ Project passed review checklist</p>
                </div>
              </div>
              <div className="p-5">
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-sm text-slate-400">Preview</p>
                    <p className="mt-2 text-2xl font-black text-white">Student Dashboard</p>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-300 to-purple-500" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-cyan-300/10 p-4 text-cyan-200">8 modules</div>
                      <div className="rounded-2xl bg-purple-300/10 p-4 text-purple-200">12 tasks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function MobileAndMarketing() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <PremiumCard className="p-6 lg:p-8">
          <SectionBadge>Mobile app development</SectionBadge>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">Design and build beautiful apps from idea to interface.</h2>
          <p className="mt-4 leading-7 text-slate-300">Train students to create mobile UI previews, onboarding flows, dashboards, forms, and app-ready product screens.</p>
          <div className="mt-8 flex justify-center gap-4">
            {["iOS", "Android"].map((label, index) => (
              <motion.div key={label} animate={{ y: index === 0 ? [0, -12, 0] : [0, 12, 0] }} transition={{ duration: 5 + index, repeat: Infinity }} className="h-[430px] w-[205px] rounded-[2.5rem] border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/40">
                <div className="h-full rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-black p-4">
                  <div className="mx-auto h-6 w-20 rounded-full bg-black" />
                  <p className="mt-7 text-xs font-bold text-cyan-200">{label} Track</p>
                  <p className="mt-2 text-2xl font-black text-white">App Studio</p>
                  <div className="mt-5 space-y-3">
                    {[78, 52, 86].map((w, i) => <div key={i} className="h-3 rounded-full bg-white/10" style={{ width: `${w}%` }} />)}
                  </div>
                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">Flutter UI Kit</div>
                    <div className="rounded-2xl bg-purple-300/10 p-4 text-sm font-bold text-purple-100">React Native Flow</div>
                    <div className="rounded-2xl bg-white/10 p-4 text-sm font-bold text-white">Publish Checklist</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        <PremiumCard className="p-6 lg:p-8">
          <SectionBadge>Ads and digital marketing</SectionBadge>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">Learn campaign strategy with real analytics-style dashboards.</h2>
          <p className="mt-4 leading-7 text-slate-300">Teach ad creation, campaign planning, creative testing, landing page funnels, performance metrics, and automation workflows.</p>
          <div className="mt-8 grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">Campaign Performance</p>
                  <p className="text-sm text-slate-400">Facebook, TikTok, Instagram, Google</p>
                </div>
                <Megaphone className="h-7 w-7 text-cyan-300" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[["CTR", "4.8%"], ["Leads", "1,284"], ["ROAS", "3.2x"]].map(([a, b]) => (
                  <div key={a} className="rounded-2xl bg-white/[0.055] p-4">
                    <p className="text-xs text-slate-400">{a}</p>
                    <p className="mt-1 text-xl font-black text-white">{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5">
              <p className="font-black text-white">Growth Automation Flow</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {["Creative", "Landing", "Lead", "Follow-up"].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/10 to-purple-600/10 p-4 text-center text-sm font-bold text-white">
                    {item}
                    {index < 3 && <ArrowRight className="mx-auto mt-2 h-4 w-4 text-cyan-300" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Simple pricing</SectionBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">Choose the learning plan that matches your ambition.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Start with the basics or go premium with mentorship, live classes, reviews, and career-focused support.</p>
          <div className="mx-auto mt-8 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
            <button onClick={() => setYearly(false)} className={`rounded-xl px-5 py-3 text-sm font-black transition ${!yearly ? "bg-white text-slate-950" : "text-slate-300"}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`rounded-xl px-5 py-3 text-sm font-black transition ${yearly ? "bg-white text-slate-950" : "text-slate-300"}`}>Yearly</button>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <motion.div key={plan.name} whileHover={{ y: -8 }} className={`relative rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl ${plan.popular ? "border-cyan-300/40 bg-cyan-300/[0.08] shadow-cyan-500/10" : "border-white/10 bg-white/[0.045] shadow-black/20"}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-purple-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-cyan-500/20">Most Popular</div>}
              <p className="text-sm font-bold text-cyan-200">{plan.badge}</p>
              <h3 className="mt-3 text-3xl font-black text-white">{plan.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">{plan.description}</p>
              <div className="mt-7 flex items-end gap-2">
                <span className="text-5xl font-black tracking-tight text-white">${yearly ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="pb-2 text-slate-400">/{yearly ? "year" : "month"}</span>
              </div>
              <a href="/signup" className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition ${plan.popular ? "bg-gradient-to-r from-cyan-300 to-purple-500 text-white shadow-xl shadow-cyan-500/20" : "bg-white text-slate-950"}`}>
                Choose {plan.name} <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionBadge>Student stories</SectionBadge>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Students learn by building visible proof of skill.</h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-slate-300">Use testimonials to show project outcomes, confidence, portfolio wins, and real learning progress without making unrealistic promises.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div key={item.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -8 }} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-purple-600 text-lg font-black text-white">{item.name.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-white">{item.name}</p>
                    <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  </div>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
              <div className="mt-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-bold text-cyan-200">{item.result}</div>
              <p className="mt-5 text-base leading-7 text-slate-300">“{item.quote}”</p>
              <div className="mt-5 flex gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Questions before students enroll.</h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl">
              <button onClick={() => setActive(active === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                <span className="text-lg font-black text-white">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-cyan-300 transition ${active === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="px-6 pb-6 leading-7 text-slate-300">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <GlowOrb className="left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-purple-600/25" />
      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 via-purple-600/10 to-white/[0.04] p-8 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl sm:p-14 lg:p-20">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-[1.5rem] bg-gradient-to-br from-cyan-300 to-purple-600 shadow-2xl shadow-cyan-500/20">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">Start Your Tech Journey Today.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Give students a world-class place to learn, build, submit, track progress, and become confident digital builders.</p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/login" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20">
              Enroll Now <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#courses" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
              Explore Tracks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-black text-white">Magic Academy</p>
            <p className="text-sm text-slate-400">Premium tech learning platform</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">{item}</a>)}
        </div>
        <p className="text-sm text-slate-500">© 2026 Magic Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function MagicAcademyLandingPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const shellClass = useMemo(() => {
    return theme === "dark"
      ? "min-h-screen overflow-hidden bg-[#030712] text-white [font-family:Inter,ui-sans-serif,system-ui]"
      : "min-h-screen overflow-hidden bg-[#07111f] text-white [font-family:Inter,ui-sans-serif,system-ui]";
  }, [theme]);

  return (
    <main className={shellClass}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <SocialProof />
      <CourseCategories />
      <LearningExperience />
      <DashboardPreview />
      <CodingPlayground />
      <MobileAndMarketing />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
