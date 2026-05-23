"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  LayoutDashboard,
  Code2,
  Smartphone,
  Megaphone,
  Bot,
  CheckCircle2,
  Circle,
  PlayCircle,
  Clock,
  Trophy,
  BookOpen,
  TerminalSquare,
  Eye,
  ListChecks,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Star,
  FileCode2,
  MonitorPlay,
  Zap,
  Award,
  BarChart3,
  Keyboard,
  Maximize2,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Task = {
  title: string;
  description: string;
};

type Lesson = {
  id: string;
  title: string;
  time: string;
  videoSrc?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tasks: Task[];
};

type Track = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  videoSrc?: string;
  lessons: Lesson[];
};

const touchTypingLessons: Lesson[] = [
  {
    id: "typing-home-row",
    title: "Touch Typing Foundation: Home Row",
    time: "00:00:00",
    videoSrc: "/videos/touch-typing.mkv",
    category: "Typing Basics",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Learn the home row keys",
        description: "Place your fingers on A S D F and J K L ;, then practice without looking at the keyboard.",
      },
      {
        title: "Complete a 60-second typing test",
        description: "Type the home-row practice words and aim for accuracy before speed.",
      },
    ],
  },
  {
    id: "typing-top-row",
    title: "Top Row Practice",
    time: "00:00:00",
    videoSrc: "/videos/touch-typing.mkv",
    category: "Typing Practice",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Practice top row reach",
        description: "Use Q W E R T and Y U I O P while returning your fingers to the home row.",
      },
      {
        title: "Improve typing rhythm",
        description: "Type slowly and evenly, focusing on clean finger movement and fewer mistakes.",
      },
    ],
  },
  {
    id: "typing-bottom-row",
    title: "Bottom Row Practice",
    time: "00:00:00",
    videoSrc: "/videos/touch-typing.mkv",
    category: "Typing Practice",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Practice bottom row keys",
        description: "Use Z X C V B and N M with controlled finger movement.",
      },
      {
        title: "Build full keyboard confidence",
        description: "Complete the mixed-key typing drill and maintain at least 90% accuracy.",
      },
    ],
  },
  {
    id: "typing-sentences",
    title: "Real Sentences and Speed Building",
    time: "00:00:00",
    videoSrc: "/videos/touch-typing.mkv",
    category: "Typing Speed",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Type real coding sentences",
        description: "Practice sentences that include words developers use daily.",
      },
      {
        title: "Reach your first WPM target",
        description: "Complete the countdown test and aim for 25+ WPM with strong accuracy.",
      },
    ],
  },
];

const typingPracticeSets: Record<string, string> = {
  "typing-home-row":
    "asdf jkl; asdf jkl; dad sad flask salad ask fall all add lad jakal; asdf jkl; safe ask dad fall salad flask",
  "typing-top-row":
    "qwer tyui op qw er ty ui op power query write route type your quote quiet worry retry power query route",
  "typing-bottom-row":
    "zxcv bnm zx cv bn vm mix zoom move code box commit branch version main node matrix vector zone",
  "typing-sentences":
    "The quick developer builds clean apps with focus and patience. Every project becomes easier when your typing is fast accurate and calm. Practice daily and your keyboard will feel natural.",
};

const fullstackLessons: Lesson[] = [
  {
    id: "intro",
    title: "Introduction",
    time: "00:00:00",
    category: "Orientation",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Set up your learning workspace",
        description: "Create your project folder, install VS Code, and prepare your browser/dev tools.",
      },
      {
        title: "Write your learning goal",
        description: "Write a short goal explaining why you want to become a fullstack developer.",
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML and CSS",
    time: "00:01:27",
    category: "Frontend",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Create your first webpage",
        description: "Build an index.html file with headings, paragraphs, buttons, links, and images.",
      },
      {
        title: "Style the webpage",
        description: "Add CSS for background, typography, spacing, colors, and buttons.",
      },
    ],
  },
  {
    id: "intro-css",
    title: "Intro to CSS",
    time: "01:04:19",
    category: "Frontend",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Practice selectors",
        description: "Use class, id, element, and descendant selectors to style different parts of a page.",
      },
      {
        title: "Build a clean layout",
        description: "Create a simple card layout using padding, margin, border-radius, and shadows.",
      },
    ],
  },
  {
    id: "business-card",
    title: "Building a Business Card",
    time: "02:21:01",
    category: "Project",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Build a digital business card",
        description: "Create a profile card with image, name, role, social links, and contact button.",
      },
      {
        title: "Make it responsive",
        description: "Ensure the business card looks good on mobile and desktop.",
      },
    ],
  },
  {
    id: "space-exploration",
    title: "Space Exploration",
    time: "03:32:02",
    category: "Project",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Create a hero section",
        description: "Build a space-themed landing page hero with background image and CTA.",
      },
      {
        title: "Add visual hierarchy",
        description: "Use typography, contrast, and spacing to make the hero section premium.",
      },
    ],
  },
  {
    id: "birthday-website",
    title: "Birthday Website",
    time: "04:17:21",
    category: "Project",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Build a birthday page",
        description: "Create a fun birthday page with image cards, headings, and hover effects.",
      },
      {
        title: "Add interactions",
        description: "Use CSS hover states to reveal hidden messages or animations.",
      },
    ],
  },
  {
    id: "hometown",
    title: "Solo Project: Hometown Homepage",
    time: "05:22:25",
    category: "Solo Project",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Design your hometown homepage",
        description: "Create a landing page that introduces your city with sections and images.",
      },
      {
        title: "Submit project review",
        description: "Add screenshot, GitHub link, and a short explanation of your design choices.",
      },
    ],
  },
  {
    id: "counter-app",
    title: "Build a Counter App",
    time: "05:30:38",
    category: "JavaScript",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Build increment/decrement buttons",
        description: "Use JavaScript to update a number when buttons are clicked.",
      },
      {
        title: "Add reset and save",
        description: "Add a reset button and save previous count history on the screen.",
      },
    ],
  },
  {
    id: "js-challenges-1",
    title: "JavaScript Challenges Part 1",
    time: "06:46:17",
    category: "JavaScript",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Solve variable challenges",
        description: "Practice variables, strings, numbers, booleans, and conditionals.",
      },
      {
        title: "Manipulate the DOM",
        description: "Use querySelector, textContent, and event listeners to update UI.",
      },
    ],
  },
  {
    id: "git-basics",
    title: "Git and GitHub Basics",
    time: "07:07:22",
    category: "Tools",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Initialize a Git repository",
        description: "Create a repo, make your first commit, and connect it to GitHub.",
      },
      {
        title: "Push your first project",
        description: "Upload your business card or counter app to GitHub.",
      },
    ],
  },
  {
    id: "blackjack",
    title: "Build a Blackjack Game",
    time: "07:19:59",
    category: "JavaScript Project",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create game logic",
        description: "Build card values, sum calculation, start game, and new card functions.",
      },
      {
        title: "Improve game UI",
        description: "Add polished styling, messages, and game state feedback.",
      },
    ],
  },
  {
    id: "js-challenges-2",
    title: "JavaScript Challenges Part 2",
    time: "10:15:19",
    category: "JavaScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Practice arrays and objects",
        description: "Create arrays of objects and render them dynamically into the DOM.",
      },
      {
        title: "Build reusable functions",
        description: "Create functions that receive parameters and return clean output.",
      },
    ],
  },
  {
    id: "chrome-extension",
    title: "Build a Chrome Extension",
    time: "10:41:09",
    category: "Browser APIs",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create extension files",
        description: "Create manifest.json, popup HTML, CSS, and JavaScript files.",
      },
      {
        title: "Save leads locally",
        description: "Use localStorage to save and render links inside the extension.",
      },
    ],
  },
  {
    id: "js-challenges-3",
    title: "JavaScript Challenges Part 3",
    time: "13:34:25",
    category: "JavaScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Practice loops and methods",
        description: "Use map, filter, reduce, for loops, and array methods.",
      },
      {
        title: "Build a mini utility app",
        description: "Create a small app that transforms or filters user input.",
      },
    ],
  },
  {
    id: "command-line",
    title: "Command Line Basics",
    time: "14:00:48",
    category: "Tools",
    difficulty: "Beginner",
    tasks: [
      {
        title: "Practice terminal commands",
        description: "Use cd, ls, mkdir, touch, rm, clear, and code from your terminal.",
      },
      {
        title: "Create a project with terminal",
        description: "Create a project folder and starter files using only command line.",
      },
    ],
  },
  {
    id: "essential-git",
    title: "Essential Git and GitHub Skills",
    time: "14:46:27",
    category: "Tools",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create branches",
        description: "Practice creating, switching, merging, and deleting Git branches.",
      },
      {
        title: "Open a pull request",
        description: "Push a branch and create a pull request on GitHub.",
      },
    ],
  },
  {
    id: "advanced-foundations",
    title: "Advanced Foundations",
    time: "15:12:55",
    category: "JavaScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Refactor old projects",
        description: "Improve one earlier project using cleaner variables and reusable functions.",
      },
      {
        title: "Write cleaner code",
        description: "Break large logic into smaller readable functions.",
      },
    ],
  },
  {
    id: "methods-loops",
    title: "Methods and Loops",
    time: "16:27:18",
    category: "JavaScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Render list data",
        description: "Use loops or map to render a list of cards from an array.",
      },
      {
        title: "Filter project data",
        description: "Create a filter system for courses, products, or users.",
      },
    ],
  },
  {
    id: "functions",
    title: "Function Expressions and Parameters",
    time: "17:41:43",
    category: "JavaScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create reusable functions",
        description: "Write functions with parameters for formatting, calculation, and rendering.",
      },
      {
        title: "Convert functions",
        description: "Convert regular functions to arrow functions and function expressions.",
      },
    ],
  },
  {
    id: "async-apis",
    title: "Asynchronous JavaScript and APIs",
    time: "18:26:57",
    category: "APIs",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Fetch API data",
        description: "Use fetch and async/await to get data from a public API.",
      },
      {
        title: "Build an API-powered app",
        description: "Create a weather, quote, crypto price, or user search app.",
      },
    ],
  },
  {
    id: "ai-fundamentals",
    title: "AI Engineering Fundamentals",
    time: "19:42:29",
    category: "AI",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create AI prompt templates",
        description: "Write prompt templates for code explanation, summarization, and content generation.",
      },
      {
        title: "Design an AI tool UI",
        description: "Build a frontend screen for an AI assistant or automation tool.",
      },
    ],
  },
  {
    id: "node-api",
    title: "Build a Node API",
    time: "21:19:42",
    category: "Backend",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Create Express routes",
        description: "Build GET, POST, PUT, and DELETE endpoints for a resource.",
      },
      {
        title: "Test API endpoints",
        description: "Use Postman, Thunder Client, or browser requests to test your API.",
      },
    ],
  },
  {
    id: "fullstack-node-app",
    title: "Build a Fullstack Node App",
    time: "22:42:51",
    category: "Fullstack",
    difficulty: "Advanced",
    tasks: [
      {
        title: "Connect frontend to backend",
        description: "Use fetch to send and receive data from your Node/Express API.",
      },
      {
        title: "Build CRUD functionality",
        description: "Create, read, update, and delete records from the frontend.",
      },
    ],
  },
  {
    id: "databases",
    title: "Introduction to Databases",
    time: "24:52:41",
    category: "Database",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Design a database schema",
        description: "Create tables for users, courses, lessons, tasks, and progress.",
      },
      {
        title: "Explain relationships",
        description: "Write how users connect to courses, assignments, and certificates.",
      },
    ],
  },
  {
    id: "sql",
    title: "Writing SQL Queries",
    time: "25:13:25",
    category: "Database",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Write basic SQL",
        description: "Practice SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, and LIMIT.",
      },
      {
        title: "Query student progress",
        description: "Write SQL to get completed tasks for a specific student.",
      },
    ],
  },
  {
    id: "static-pages",
    title: "Static Pages",
    time: "26:30:04",
    category: "Frontend",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Build static course pages",
        description: "Create static pages for course overview, pricing, and dashboard preview.",
      },
      {
        title: "Improve SEO structure",
        description: "Use clear headings, metadata planning, and semantic HTML.",
      },
    ],
  },
  {
    id: "data-driven",
    title: "Data Driven",
    time: "28:48:33",
    category: "Frontend",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Render UI from data",
        description: "Move repeated UI into arrays and map over the data.",
      },
      {
        title: "Create course JSON",
        description: "Turn all lessons and tasks into structured data for your dashboard.",
      },
    ],
  },
  {
    id: "react-state",
    title: "React State",
    time: "31:03:00",
    category: "React",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Build stateful components",
        description: "Use useState for tabs, modals, counters, forms, and active lessons.",
      },
      {
        title: "Create progress logic",
        description: "Update a progress bar when a student completes tasks.",
      },
    ],
  },
  {
    id: "side-effects",
    title: "Side Effects",
    time: "36:17:02",
    category: "React",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Use useEffect",
        description: "Persist progress to localStorage and load it on page refresh.",
      },
      {
        title: "Fetch remote data",
        description: "Fetch course data from an API or Supabase table.",
      },
    ],
  },
  {
    id: "capstone",
    title: "Capstone Project",
    time: "38:05:49",
    category: "Final Project",
    difficulty: "Advanced",
    tasks: [
      {
        title: "Build a fullstack learning platform",
        description: "Create auth, dashboard, courses, tasks, progress, and admin review.",
      },
      {
        title: "Deploy and document",
        description: "Deploy the app and write a README with screenshots and features.",
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript Fundamentals",
    time: "40:12:26",
    category: "TypeScript",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Type your data models",
        description: "Create TypeScript types for Course, Lesson, Task, User, and Progress.",
      },
      {
        title: "Fix type errors",
        description: "Refactor a JavaScript component into a typed TypeScript component.",
      },
    ],
  },
  {
    id: "typescript-react",
    title: "TypeScript in React",
    time: "42:15:21",
    category: "React",
    difficulty: "Intermediate",
    tasks: [
      {
        title: "Type component props",
        description: "Create reusable typed props for cards, buttons, and dashboard widgets.",
      },
      {
        title: "Type state correctly",
        description: "Use proper types for arrays, objects, unions, and form state.",
      },
    ],
  },
  {
    id: "next-app",
    title: "Build a Next.js App",
    time: "43:06:47",
    category: "Next.js",
    difficulty: "Advanced",
    tasks: [
      {
        title: "Create app routes",
        description: "Build routes for landing page, login, signup, dashboard, and course detail.",
      },
      {
        title: "Connect auth flow",
        description: "Use Supabase auth to protect dashboard routes.",
      },
    ],
  },
  {
    id: "rendering",
    title: "Rendering Strategies and More",
    time: "45:08:21",
    category: "Next.js",
    difficulty: "Advanced",
    tasks: [
      {
        title: "Compare rendering strategies",
        description: "Write when to use server components, client components, SSR, and static rendering.",
      },
      {
        title: "Optimize production app",
        description: "Improve loading, component splitting, and dashboard performance.",
      },
    ],
  },
];

const tracks: Track[] = [
  {
    id: "touch-typing",
    title: "Touch Typing with 10 Fingers",
    subtitle: "Keyboard mastery, accuracy, WPM, speed drills",
    icon: Keyboard,
    accent: "from-emerald-300 via-cyan-400 to-blue-500",
    videoSrc: "/videos/touch-typing.mkv",
    lessons: touchTypingLessons,
  },
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    subtitle: "HTML, CSS, JavaScript, React, Node, SQL, Next.js",
    icon: Code2,
    accent: "from-cyan-300 via-blue-500 to-purple-600",
    videoSrc: "/videos/fullstack-course.webm",
    lessons: fullstackLessons,
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle: "Flutter, React Native, mobile UI, app flows",
    icon: Smartphone,
    accent: "from-purple-400 via-fuchsia-500 to-pink-500",
    lessons: [
      {
        id: "mobile-intro",
        title: "Mobile App Foundations",
        time: "00:00:00",
        category: "Mobile",
        difficulty: "Beginner",
        tasks: [
          { title: "Design app onboarding", description: "Create a 3-screen mobile onboarding flow." },
          { title: "Build screen structure", description: "Create header, content, CTA, and bottom navigation layout." },
        ],
      },
      {
        id: "mobile-ui",
        title: "Mobile UI Components",
        time: "01:20:00",
        category: "Mobile UI",
        difficulty: "Beginner",
        tasks: [
          { title: "Create reusable cards", description: "Build mobile cards for lessons, wallet, products, or profiles." },
          { title: "Create form screens", description: "Design login, signup, and profile mobile screens." },
        ],
      },
      {
        id: "flutter",
        title: "Flutter Development",
        time: "03:00:00",
        category: "Flutter",
        difficulty: "Intermediate",
        tasks: [
          { title: "Build Flutter layout", description: "Create a dashboard screen using columns, rows, cards, and buttons." },
          { title: "Add navigation", description: "Create navigation between Home, Courses, Profile, and Settings." },
        ],
      },
    ],
  },
  {
    id: "ads",
    title: "Ads & Digital Marketing",
    subtitle: "Creative strategy, funnels, analytics, campaign systems",
    icon: Megaphone,
    accent: "from-orange-300 via-pink-500 to-purple-600",
    lessons: [
      {
        id: "ads-foundation",
        title: "Ads Creation Foundations",
        time: "00:00:00",
        category: "Marketing",
        difficulty: "Beginner",
        tasks: [
          { title: "Define target audience", description: "Write an audience profile for a tech course campaign." },
          { title: "Create ad angles", description: "Write 5 ad angles for beginner developers." },
        ],
      },
      {
        id: "ads-creative",
        title: "Ad Creative System",
        time: "01:15:00",
        category: "Creative",
        difficulty: "Intermediate",
        tasks: [
          { title: "Design ad creative", description: "Create one image ad and one short video ad concept." },
          { title: "Write ad copy", description: "Write primary text, headline, and CTA for each creative." },
        ],
      },
      {
        id: "ads-analytics",
        title: "Campaign Analytics",
        time: "03:10:00",
        category: "Analytics",
        difficulty: "Intermediate",
        tasks: [
          { title: "Build analytics dashboard", description: "Create a UI showing impressions, CTR, CPC, leads, and ROAS." },
          { title: "Optimize campaign", description: "Write what you would change if CTR is low and CPC is high." },
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "AI Development & Automation",
    subtitle: "Prompt systems, AI tools, agents, workflow automation",
    icon: Bot,
    accent: "from-cyan-300 via-violet-500 to-fuchsia-500",
    lessons: [
      {
        id: "ai-prompts",
        title: "Prompt Engineering Basics",
        time: "00:00:00",
        category: "AI",
        difficulty: "Beginner",
        tasks: [
          { title: "Create prompt templates", description: "Write prompts for summarizing, coding, planning, and debugging." },
          { title: "Build AI UI mockup", description: "Design a chat assistant screen with input, output, and history." },
        ],
      },
      {
        id: "ai-tools",
        title: "AI Tools for Developers",
        time: "01:30:00",
        category: "AI Tools",
        difficulty: "Intermediate",
        tasks: [
          { title: "Create AI workflow", description: "Map a workflow that turns a lesson transcript into tasks." },
          { title: "Design automation dashboard", description: "Create a dashboard showing automations, status, logs, and results." },
        ],
      },
      {
        id: "ai-app",
        title: "Build an AI-Powered App",
        time: "03:30:00",
        category: "AI App",
        difficulty: "Advanced",
        tasks: [
          { title: "Create app structure", description: "Plan frontend, backend, API routes, and database tables." },
          { title: "Build MVP screen", description: "Create a frontend for an AI lesson analyzer or task generator." },
        ],
      },
    ],
  },
];

const starterCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Magic Academy Preview</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #020617, #172554);
        color: white;
        font-family: Inter, Arial, sans-serif;
      }

      .card {
        width: min(90%, 520px);
        padding: 32px;
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 30px 100px rgba(34, 211, 238, 0.18);
      }

      h1 {
        font-size: 42px;
        line-height: 1;
        margin: 0 0 14px;
      }

      p {
        color: #cbd5e1;
        line-height: 1.7;
      }

      button {
        margin-top: 18px;
        border: 0;
        border-radius: 16px;
        padding: 14px 20px;
        font-weight: 800;
        background: linear-gradient(90deg, #22d3ee, #6366f1, #a855f7);
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Hello Magic Student</h1>
      <p>Edit this code, click Run Preview, and see your result here.</p>
      <button onclick="alert('Great job!')">Test JavaScript</button>
    </div>
  </body>
</html>`;

function timeToSeconds(time: string) {
  const parts = time.split(":").map(Number);

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  return 0;
}

function getVideoMimeType(src: string) {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mkv")) return "video/x-matroska";
  if (src.endsWith(".ogg") || src.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}


const TOUCH_TYPING_TRACK_ID = "touch-typing";

const touchTypingLevels = [
  {
    name: "Starter",
    targetWpm: 12,
    targetAccuracy: 85,
    durationSeconds: 60,
    text:
      "The wise student types 10 clean words before 8:00 AM. Good typing starts with calm hands, steady focus, and 100% daily practice.",
  },
  {
    name: "Foundation",
    targetWpm: 18,
    targetAccuracy: 88,
    durationSeconds: 60,
    text:
      "A focused developer writes 25 lines of code, fixes 3 bugs, and sends 1 clear update before 5:30 PM. Accuracy is better than speed while keeping keystrokes clean and steady.",
  },
  {
    name: "Builder",
    targetWpm: 25,
    targetAccuracy: 90,
    durationSeconds: 60,
    text:
      "When a user clicks the button, the app should show: Success! Your task #204 was saved. The total score is 98%, and the status is active. This helps students practice numbers, symbols, alerts, percentages, and punctuation.",
  },
  {
    name: "Professional",
    targetWpm: 35,
    targetAccuracy: 92,
    durationSeconds: 60,
    text:
      "In JavaScript, a clean function may look like this: function add(a, b) { return a + b; } Use commas, brackets, braces, quotes, and semicolons correctly. This level trains parentheses, braces, operators, commas, semicolons, and clean code rhythm under pressure daily.",
  },
  {
    name: "Advanced",
    targetWpm: 45,
    targetAccuracy: 94,
    durationSeconds: 60,
    text:
      "A full stack developer may write: const user = { name: 'Ada', age: 24, active: true }; if (user.active) { console.log('Welcome, ' + user.name); } This drill strengthens quotes, dots, brackets, booleans, object keys, method calls, string joining, and real developer typing accuracy every day.",
  },
  {
    name: "Code Master",
    targetWpm: 55,
    targetAccuracy: 95,
    durationSeconds: 60,
    text:
      "Build secure forms with email@example.com, password rules like Min@12345, prices such as $49.99, and routes like /api/users?page=1&limit=20. This final practice improves typing confidence with emails, passwords, dollar signs, decimals, slashes, question marks, equals signs, ampersands, numbers, and API routes.",  },
];

export default function DashboardClient({
  userId,
  userEmail,
  userName,
}: {
  userId: string;
  userEmail: string;
  userName: string;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [activeTrackId, setActiveTrackId] = useState("touch-typing");
  const [activeLessonId, setActiveLessonId] = useState(touchTypingLessons[0].id);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [code, setCode] = useState(starterCode);
  const [previewCode, setPreviewCode] = useState(starterCode);
  const [mobileOpen, setMobileOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastProgressSaveAtRef = useRef(0);
  const [typingInput, setTypingInput] = useState("");
  const [typingTimeLeft, setTypingTimeLeft] = useState(60);
  const [typingActive, setTypingActive] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [typingLevelIndex, setTypingLevelIndex] = useState(0);
  const [typingBestWpm, setTypingBestWpm] = useState(0);
  const [typingBestAccuracy, setTypingBestAccuracy] = useState(0);
  const [typingTotalSessions, setTypingTotalSessions] = useState(0);
  const [typingCompletedLevels, setTypingCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("magic-academy-progress");
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("magic-academy-progress", JSON.stringify(completed));
  }, [completed]);

  const activeTrack = useMemo(() => {
    return tracks.find((track) => track.id === activeTrackId) || tracks[0];
  }, [activeTrackId]);

  const activeLesson = useMemo(() => {
    return activeTrack.lessons.find((lesson) => lesson.id === activeLessonId) || activeTrack.lessons[0];
  }, [activeLessonId, activeTrack]);

  const currentVideoSrc = activeLesson.videoSrc || activeTrack.videoSrc;
  const currentVideoFileName = currentVideoSrc?.split("/").pop() || "No video selected";
  const isTouchTypingTrack = activeTrack.id === TOUCH_TYPING_TRACK_ID;
  const activeTypingLevel = touchTypingLevels[typingLevelIndex] || touchTypingLevels[0];
  const currentTypingText = activeTypingLevel.text;
  const typingTypedCharacters = typingInput.length;
  const typingCorrectCharacters = typingInput
    .split("")
    .filter((character, index) => character === currentTypingText[index]).length;
  const typingAccuracy =
    typingTypedCharacters === 0
      ? 100
      : Math.round((typingCorrectCharacters / typingTypedCharacters) * 100);
  const typingElapsedSeconds = Math.max(
    1,
    activeTypingLevel.durationSeconds - typingTimeLeft
  );
  const typingWpm =
    typingElapsedSeconds > 0
      ? Math.round((typingCorrectCharacters / 5 / (typingElapsedSeconds / 60)) || 0)
      : 0;
  const typingMistakes = Math.max(0, typingTypedCharacters - typingCorrectCharacters);
  const typingProgress = Math.min(
    100,
    Math.round((typingTypedCharacters / currentTypingText.length) * 100)
  );
  const typingPassed =
    typingInput.length >= currentTypingText.length &&
    typingWpm >= activeTypingLevel.targetWpm &&
    typingAccuracy >= activeTypingLevel.targetAccuracy;

  useEffect(() => {
    async function loadTouchTypingProgress() {
      const { data, error } = await supabase
        .from("touch_typing_progress")
        .select("current_level,best_wpm,best_accuracy,total_sessions,completed_levels")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Failed to load touch typing progress:", error.message);
        return;
      }

      if (!data) return;

      const savedLevel = Number(data.current_level || 0);

      setTypingLevelIndex(
        savedLevel >= 0 && savedLevel < touchTypingLevels.length ? savedLevel : 0
      );
      setTypingBestWpm(Number(data.best_wpm || 0));
      setTypingBestAccuracy(Number(data.best_accuracy || 0));
      setTypingTotalSessions(Number(data.total_sessions || 0));
      setTypingCompletedLevels(data.completed_levels || []);
    }

    loadTouchTypingProgress();
  }, [userId, supabase]);

  useEffect(() => {
    if (!isTouchTypingTrack) return;

    setTypingInput("");
    setTypingTimeLeft(activeTypingLevel.durationSeconds);
    setTypingActive(false);
    setTypingFinished(false);
  }, [activeLesson.id, activeTypingLevel.durationSeconds, typingLevelIndex, isTouchTypingTrack]);

  useEffect(() => {
    if (!typingActive || typingFinished || typingTimeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTypingTimeLeft((previous) => {
        if (previous <= 1) {
          setTypingActive(false);
          setTypingFinished(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [typingActive, typingFinished, typingTimeLeft]);

  useEffect(() => {
    if (!isTouchTypingTrack) return;

    if ((typingTimeLeft === 0 || typingInput.length >= currentTypingText.length) && typingInput.length > 0 && !typingFinished) {
      void finishTypingTest();
    }
  }, [typingInput, typingTimeLeft, currentTypingText.length, typingFinished, isTouchTypingTrack]);

useEffect(() => {
  if (!currentVideoSrc) return;

  let cancelled = false;

  async function loadVideoProgress() {
    const lessonStartTime = timeToSeconds(activeLesson.time);

    const { data, error } = await supabase
      .from("video_progress")
      .select("position_seconds")
      .eq("user_id", userId)
      .eq("track_id", activeTrack.id)
      .eq("lesson_id", activeLesson.id)
      .eq("video_src", currentVideoSrc)
      .maybeSingle();

    if (cancelled) return;

    if (error) {
      console.error("Failed to load video progress:", error.message);
    }

    const savedTime = data?.position_seconds
      ? Number(data.position_seconds)
      : 0;

    const resumeTime = savedTime > 0 ? savedTime : lessonStartTime;

    const seekToSavedTime = () => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = resumeTime;
    };

    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 1) {
      seekToSavedTime();
    } else {
      video.addEventListener("loadedmetadata", seekToSavedTime, { once: true });
    }
  }

  loadVideoProgress();

  return () => {
    cancelled = true;
  };
}, [
  userId,
  activeTrack.id,
  activeLesson.id,
  activeLesson.time,
  currentVideoSrc,
  supabase,
]);



 const activeTrackTasks = activeTrack.lessons.flatMap((lesson) =>
  lesson.tasks.map((task, index) => `${activeTrack.id}-${lesson.id}-${index}`)
);

const normalCompletedCount = activeTrackTasks.filter((id) => completed[id]).length;

const touchTypingCompletedLevelCount = typingCompletedLevels.length;
const touchTypingTotalLevels = touchTypingLevels.length;

const completedCount = isTouchTypingTrack
  ? touchTypingCompletedLevelCount
  : normalCompletedCount;

const totalProgressItems = isTouchTypingTrack
  ? touchTypingTotalLevels
  : activeTrackTasks.length;

const progress = isTouchTypingTrack
  ? Math.min(
      100,
      Math.round((touchTypingCompletedLevelCount / touchTypingTotalLevels) * 100)
    )
  : Math.round((normalCompletedCount / activeTrackTasks.length) * 100);

const lessonCompletedCount = activeLesson.tasks.filter((_, index) => {
  return completed[`${activeTrack.id}-${activeLesson.id}-${index}`];
}).length;



function handleTypingInput(value: string) {
  if (typingFinished || typingTimeLeft === 0) return;

  const limitedValue = value.slice(0, currentTypingText.length);

  if (!typingActive && limitedValue.length > 0) {
    setTypingActive(true);
  }

  setTypingInput(limitedValue);
}

function resetTypingPractice(levelIndex = typingLevelIndex) {
  const level = touchTypingLevels[levelIndex] || touchTypingLevels[0];

  setTypingInput("");
  setTypingTimeLeft(level.durationSeconds);
  setTypingActive(false);
  setTypingFinished(false);
}

async function saveTouchTypingProgress({
  nextLevel,
  bestWpm,
  bestAccuracy,
  lastWpm,
  lastAccuracy,
  completedLevels,
}: {
  nextLevel: number;
  bestWpm: number;
  bestAccuracy: number;
  lastWpm: number;
  lastAccuracy: number;
  completedLevels: number[];
}) {
  const { error } = await supabase.from("touch_typing_progress").upsert(
    {
      user_id: userId,
      current_level: nextLevel,
      best_wpm: bestWpm,
      best_accuracy: bestAccuracy,
      last_wpm: lastWpm,
      last_accuracy: lastAccuracy,
      total_sessions: typingTotalSessions + 1,
      completed_levels: completedLevels,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    console.error("Failed to save touch typing progress:", error.message);
  }
}

async function finishTypingTest() {
  if (typingFinished) return;

  setTypingActive(false);
  setTypingFinished(true);

  const nextCompletedLevels = typingPassed
    ? Array.from(new Set([...typingCompletedLevels, typingLevelIndex]))
    : typingCompletedLevels;

  const shouldMoveNext =
    typingPassed && typingLevelIndex < touchTypingLevels.length - 1;

  const nextLevel = shouldMoveNext ? typingLevelIndex + 1 : typingLevelIndex;
  const nextBestWpm = Math.max(typingBestWpm, typingWpm);
  const nextBestAccuracy = Math.max(typingBestAccuracy, typingAccuracy);

  setTypingBestWpm(nextBestWpm);
  setTypingBestAccuracy(nextBestAccuracy);
  setTypingTotalSessions((previous) => previous + 1);
  setTypingCompletedLevels(nextCompletedLevels);

  await saveTouchTypingProgress({
    nextLevel,
    bestWpm: nextBestWpm,
    bestAccuracy: nextBestAccuracy,
    lastWpm: typingWpm,
    lastAccuracy: typingAccuracy,
    completedLevels: nextCompletedLevels,
  });

  if (shouldMoveNext) {
    window.setTimeout(() => {
      setTypingLevelIndex(nextLevel);
      resetTypingPractice(nextLevel);
    }, 900);
  }
}

async function saveVideoProgress(force = false) {
  const video = videoRef.current;

  if (!video || !currentVideoSrc) return;
  if (!Number.isFinite(video.currentTime)) return;

  const now = Date.now();

  // Save every 5 seconds while watching, unless force=true
  if (!force && now - lastProgressSaveAtRef.current < 5000) {
    return;
  }

  lastProgressSaveAtRef.current = now;

  const currentTime = Math.floor(video.currentTime);
  const duration = Number.isFinite(video.duration)
    ? Math.floor(video.duration)
    : null;

  const isCompleted = duration ? currentTime >= duration - 10 : false;

  const { error } = await supabase.from("video_progress").upsert(
    {
      user_id: userId,
      track_id: activeTrack.id,
      lesson_id: activeLesson.id,
      video_src: currentVideoSrc,
      position_seconds: currentTime,
      duration_seconds: duration,
      completed: isCompleted,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,track_id,lesson_id,video_src",
    }
  );

  if (error) {
    console.error("Failed to save video progress:", error.message);
  }
}

function handleLessonChange(lessonId: string) {
  void saveVideoProgress(true);
  setActiveLessonId(lessonId);
}


  function switchTrack(trackId: string) {
  const selected = tracks.find((track) => track.id === trackId);
  if (!selected) return;

  void saveVideoProgress(true);

  setActiveTrackId(trackId);
  setActiveLessonId(selected.lessons[0].id);
  setMobileOpen(false);
}

  function toggleTask(index: number) {
    const key = `${activeTrack.id}-${activeLesson.id}-${index}`;

    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleFullscreen() {
    const video = videoRef.current;

    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_75%)]" />
      <div className="fixed left-[-10%] top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="fixed right-[-10%] bottom-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative flex min-h-screen">
        <aside className="hidden w-[330px] shrink-0 border-r border-white/10 bg-slate-950/70 backdrop-blur-2xl xl:block">
          <Sidebar
            userName={userName}
            userEmail={userEmail}
            activeTrackId={activeTrackId}
            activeLessonId={activeLessonId}
            progress={progress}
            completedCount={completedCount}
            totalTasks={totalProgressItems}
            onTrackChange={switchTrack}
            onLessonChange={handleLessonChange}
          />
        </aside>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 h-dvh overflow-hidden bg-black/70 backdrop-blur-xl xl:hidden"
            >
              <motion.aside
                initial={{ x: -360 }}
                animate={{ x: 0 }}
                exit={{ x: -360 }}
                transition={{ type: "spring", damping: 24 }}
                className="flex h-[100dvh] max-h-[100dvh] w-[88vw] max-w-[360px] flex-col overflow-hidden border-r border-white/10 bg-slate-950"
              >
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="font-black">Magic Academy</p>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

               <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <Sidebar
              mobileMode
              userName={userName}
              userEmail={userEmail}
              activeTrackId={activeTrackId}
              activeLessonId={activeLessonId}
              progress={progress}
              completedCount={completedCount}
              totalTasks={totalProgressItems}
              onTrackChange={switchTrack}
            onLessonChange={(id) => {
            handleLessonChange(id);
            setMobileOpen(false);
          }}
            />
          </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#030712]/80 px-4 py-4 backdrop-blur-2xl lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] xl:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div>
                  <p className="text-sm font-bold text-cyan-200">Learning Dashboard</p>
                  <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                    {activeTrack.title}
                  </h1>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          <div className="p-4 lg:p-8">
            <div
                className={
                  isTouchTypingTrack
                    ? "grid gap-5"
                    : "grid gap-5 xl:grid-cols-[1fr_380px]"
                }
              >
              <div className="space-y-5">
                <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
                        <Clock className="h-3.5 w-3.5" />
                        Starts at {activeLesson.time}
                      </div>

                      <h2 className="mt-4 text-3xl font-black tracking-tight lg:text-4xl">
                        {activeLesson.title}
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        Complete the video lesson, finish the practical tasks, then use the coding playground to practice the concept.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                      <p className="text-sm text-slate-400">Track Progress</p>
                      <p className="mt-1 text-4xl font-black">{progress}%</p>
                      <div className="mt-4 h-3 w-48 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.45 }}
                          className={`h-full rounded-full bg-gradient-to-r ${activeTrack.accent}`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-black/30">
                    <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <MonitorPlay className="h-5 w-5 text-cyan-300" />
                        <div>
                          <p className="font-black">Video Lesson</p>
                          <p className="text-xs text-slate-400">
                            {activeLesson.title} • Starts at {activeLesson.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
                          {activeLesson.category}
                        </span>

                        {currentVideoSrc && (
                          <button
                            type="button"
                            onClick={handleFullscreen}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/10"
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                            Fullscreen
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="relative bg-black">
                      {currentVideoSrc ? (
                       <video
                          ref={videoRef}
                          key={currentVideoSrc}
                          className="aspect-video w-full bg-black"
                          controls
                          playsInline
                          preload="metadata"
                          controlsList="nodownload"
                          onTimeUpdate={() => saveVideoProgress(false)}
                          onPause={() => saveVideoProgress(true)}
                          onEnded={() => saveVideoProgress(true)}
                         >
                          <source src={currentVideoSrc} type={getVideoMimeType(currentVideoSrc)} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_45%),linear-gradient(135deg,#020617,#0f172a)]">
                          <div className="px-5 text-center">
                            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl">
                              <PlayCircle className="h-10 w-10 text-cyan-300" />
                            </div>
                            <p className="mt-5 text-xl font-black">{activeLesson.title}</p>
                            <p className="mt-2 text-sm text-slate-400">
                              Add a videoSrc to this track or lesson to show a video here.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-3 border-t border-white/10 bg-slate-950/70 p-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-2 text-cyan-200">
                          <Video className="h-4 w-4" />
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Video File</p>
                        </div>
                        <p className="mt-2 truncate text-sm font-black text-white">
                          {currentVideoFileName}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-2 text-cyan-200">
                          <Clock className="h-4 w-4" />
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Timestamp</p>
                        </div>
                        <p className="mt-2 text-sm font-black text-white">
                          {activeLesson.time}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-2 text-cyan-200">
                          <PlayCircle className="h-4 w-4" />
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Controls</p>
                        </div>
                        <p className="mt-2 text-sm font-black text-white">
                          Play, pause, seek, volume, fullscreen
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-cyan-200">Lesson Tasks</p>
                        <h3 className="mt-1 text-2xl font-black">
                          {lessonCompletedCount}/{activeLesson.tasks.length} completed
                        </h3>
                      </div>
                      <ListChecks className="h-7 w-7 text-cyan-300" />
                    </div>

                    <div className="mt-5 space-y-3">
                      {activeLesson.tasks.map((task, index) => {
                        const key = `${activeTrack.id}-${activeLesson.id}-${index}`;
                        const isDone = completed[key];

                        return (
                          <button
                            key={task.title}
                            onClick={() => toggleTask(index)}
                            className={`w-full rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
                              isDone
                                ? "border-emerald-400/30 bg-emerald-400/10"
                                : "border-white/10 bg-slate-950/50 hover:bg-white/[0.07]"
                            }`}
                          >
                            <div className="flex gap-3">
                              {isDone ? (
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                              ) : (
                                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                              )}

                              <div>
                                <p className="font-black text-white">{task.title}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-400">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-4">
                  {[
                    [BookOpen, "Lessons", activeTrack.lessons.length],
                    [CheckCircle2, "Tasks Done", completedCount],
                    [Trophy, "XP Points", completedCount * 50],
                    [Award, "Level", progress >= 80 ? "Advanced" : progress >= 40 ? "Growing" : "Starter"],
                  ].map(([Icon, label, value]: any) => (
                    <div
                      key={label}
                      className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl"
                    >
                      <Icon className="h-6 w-6 text-cyan-300" />
                      <p className="mt-4 text-3xl font-black">{value}</p>
                      <p className="mt-1 text-sm text-slate-400">{label}</p>
                    </div>
                  ))}
                </section>

                {isTouchTypingTrack && (
                  <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/20 backdrop-blur-2xl">
                    <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Keyboard className="h-5 w-5 text-cyan-300" />
                          <p className="font-black">Touch Typing Practice Lab</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">
                          Type the meaningful practice text below. Pass the target WPM and accuracy to unlock the next level.
                        </p>
                      </div>

                      <button
                        onClick={() => resetTypingPractice()}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                      >
                        Restart Level
                      </button>
                    </div>

                    <div className="grid gap-5 p-5 xl:grid-cols-[1fr_320px]">
                      <div className="space-y-5">
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
                                Current Level
                              </p>
                              <h3 className="mt-2 text-3xl font-black text-white">
                                {activeTypingLevel.name}
                              </h3>
                              <p className="mt-2 text-sm text-slate-400">
                                Target: {activeTypingLevel.targetWpm} WPM / {activeTypingLevel.targetAccuracy}% accuracy
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {touchTypingLevels.map((level, index) => {
                                const unlocked =
                                  index <= typingLevelIndex ||
                                  typingCompletedLevels.includes(index - 1);

                                return (
                                  <button
                                    key={level.name}
                                    type="button"
                                    disabled={!unlocked}
                                    onClick={() => {
                                      setTypingLevelIndex(index);
                                      resetTypingPractice(index);
                                    }}
                                    className={`h-10 w-10 rounded-2xl text-sm font-black transition ${
                                      index === typingLevelIndex
                                        ? "bg-cyan-300 text-slate-950"
                                        : unlocked
                                          ? "bg-white/10 text-white hover:bg-white/15"
                                          : "cursor-not-allowed bg-white/[0.03] text-slate-600"
                                    }`}
                                  >
                                    {index + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              animate={{ width: `${typingProgress}%` }}
                              transition={{ duration: 0.35 }}
                              className={`h-full rounded-full bg-gradient-to-r ${activeTrack.accent}`}
                            />
                          </div>

                          <div className="mt-5 rounded-3xl border border-white/10 bg-black/30 p-5 text-lg leading-9 text-slate-300">
                            {currentTypingText.split("").map((character, index) => {
                              const typedCharacter = typingInput[index];
                              const isTyped = typedCharacter !== undefined;
                              const isCorrect = typedCharacter === character;

                              return (
                                <span
                                  key={`${character}-${index}`}
                                  className={
                                    !isTyped
                                      ? index === typingInput.length
                                        ? "rounded bg-cyan-300/20 text-cyan-100"
                                        : "text-slate-300"
                                      : isCorrect
                                        ? "text-emerald-300"
                                        : "rounded bg-red-500/30 text-red-200"
                                  }
                                >
                                  {character}
                                </span>
                              );
                            })}
                          </div>

                          <textarea
                            value={typingInput}
                            onChange={(event) => handleTypingInput(event.target.value)}
                            disabled={typingFinished || typingTimeLeft === 0}
                            placeholder="Start typing here..."
                            className="mt-5 min-h-[160px] w-full resize-none rounded-[1.5rem] border border-white/10 bg-[#050816] p-5 text-base leading-8 text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                          />
                        </div>

                        {typingFinished && (
                          <div
                            className={`rounded-[2rem] border p-5 ${
                              typingPassed
                                ? "border-emerald-400/30 bg-emerald-400/10"
                                : "border-amber-400/30 bg-amber-400/10"
                            }`}
                          >
                            <h3 className="text-xl font-black text-white">
                              {typingPassed ? "Level Passed" : "Keep Practicing"}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                              {typingPassed
                                ? "Excellent work. Your progress has been saved and the next level is unlocked."
                                : "Your progress has been saved. Improve your speed and accuracy, then try again."}
                            </p>
                          </div>
                        )}
                      </div>

                      <aside className="space-y-3">
                        {[
                          ["Time Left", `${typingTimeLeft}s`],
                          ["WPM", typingWpm],
                          ["Accuracy", `${typingAccuracy}%`],
                          ["Mistakes", typingMistakes],
                          ["Best WPM", typingBestWpm],
                          ["Best Accuracy", `${typingBestAccuracy}%`],
                          ["Sessions", typingTotalSessions],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5"
                          >
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                              {label}
                            </p>
                            <p className="mt-2 text-3xl font-black text-white">
                              {value}
                            </p>
                          </div>
                        ))}
                      </aside>
                    </div>
                  </section>
                )}

                {!isTouchTypingTrack && (
                <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/20 backdrop-blur-2xl">
                  <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <TerminalSquare className="h-5 w-5 text-cyan-300" />
                        <p className="font-black">Code Playground</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">
                        Write HTML, CSS, and JavaScript, then run it in the preview.
                      </p>
                    </div>

                    <button
                      onClick={() => setPreviewCode(code)}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${activeTrack.accent} px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/10`}
                    >
                      <Zap className="h-4 w-4" />
                      Run Preview
                    </button>
                  </div>

                  <div className="grid min-h-[560px] lg:grid-cols-2">
                    <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
                      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950/70 px-4 py-3">
                        <FileCode2 className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm font-bold text-slate-300">index.html</span>
                      </div>

                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        className="h-[520px] w-full resize-none bg-[#050816] p-5 font-mono text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950/70 px-4 py-3">
                        <Eye className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm font-bold text-slate-300">Live Preview</span>
                      </div>

                      <iframe
                        title="Magic Academy Code Preview"
                        srcDoc={previewCode}
                        className="h-[520px] w-full bg-white"
                        sandbox="allow-scripts"
                      />
                    </div>
                  </div>
                </section>
                )}
              </div>

              <aside className={isTouchTypingTrack ? "hidden" : "space-y-5"}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Current Lesson</p>
                      <h3 className="mt-1 text-xl font-black">{activeLesson.title}</h3>
                    </div>
                    <Star className="h-6 w-6 fill-amber-300 text-amber-300" />
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between rounded-2xl bg-slate-950/55 p-4">
                      <span className="text-slate-400">Start Time</span>
                      <span className="font-bold">{activeLesson.time}</span>
                    </div>
                    <div className="flex justify-between rounded-2xl bg-slate-950/55 p-4">
                      <span className="text-slate-400">Difficulty</span>
                      <span className="font-bold">{activeLesson.difficulty}</span>
                    </div>
                    <div className="flex justify-between rounded-2xl bg-slate-950/55 p-4">
                      <span className="text-slate-400">Category</span>
                      <span className="font-bold">{activeLesson.category}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cyan-300" />
                    <p className="font-black">Progress Analytics</p>
                  </div>

                  <div className="mt-6 flex h-44 items-end gap-2">
                    {[32, 46, 28, 62, 74, progress || 10, 88].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.6, delay: index * 0.04 }}
                        className={`flex-1 rounded-t-2xl bg-gradient-to-t ${activeTrack.accent}`}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    Progress increases automatically as the learner completes lesson tasks.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
                  <p className="font-black">Next Lessons</p>

                  <div className="mt-4 space-y-3">
                    {activeTrack.lessons
                      .slice(
                        Math.max(activeTrack.lessons.findIndex((lesson) => lesson.id === activeLesson.id) + 1, 0),
                        Math.max(activeTrack.lessons.findIndex((lesson) => lesson.id === activeLesson.id) + 4, 3)
                      )
                      .map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonChange(lesson.id)}
                          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-left transition hover:bg-white/[0.07]"
                        >
                          <div>
                            <p className="text-sm font-bold">{lesson.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{lesson.time}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-500" />
                        </button>
                      ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar({
  userName,
  userEmail,
  activeTrackId,
  activeLessonId,
  progress,
  completedCount,
  totalTasks,
  onTrackChange,
  onLessonChange,
  mobileMode = false,
}: {
  userName: string;
  userEmail: string;
  activeTrackId: string;
  activeLessonId: string;
  progress: number;
  completedCount: number;
  totalTasks: number;
  onTrackChange: (trackId: string) => void;
  onLessonChange: (lessonId: string) => void;
  mobileMode?: boolean;
}) {
  const activeTrack = tracks.find((track) => track.id === activeTrackId) || tracks[0];

  return (
  <div className={mobileMode ? "min-h-max pb-8" : "flex h-full min-h-0 flex-col overflow-hidden"}>
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black">Magic Academy</p>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Learning OS</p>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.055] p-4">
          <p className="font-black">{userName}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{userEmail}</p>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Track progress</span>
            <span className="font-black text-cyan-200">{progress}%</span>
          </div>

          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
              className={`h-full rounded-full bg-gradient-to-r ${activeTrack.accent}`}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {completedCount} of {totalTasks} tasks completed
          </p>
        </div>
      </div>

      <div className="border-b border-white/10 p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
          <LayoutDashboard className="h-4 w-4" />
          Tracks
        </div>

        <div className="space-y-2">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isActive = track.id === activeTrackId;

            return (
              <button
                key={track.id}
                onClick={() => onTrackChange(track.id)}
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  isActive
                    ? "border-cyan-300/30 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.035] hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${track.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">{track.title}</p>
                    <p className="truncate text-xs text-slate-500">{track.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
  className={
    mobileMode
      ? "p-5"
      : "min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 [-webkit-overflow-scrolling:touch]"
  }
>
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
          <BookOpen className="h-4 w-4" />
          Course Content
        </div>

        <div className="space-y-2">
          {activeTrack.lessons.map((lesson, index) => {
            const isActive = lesson.id === activeLessonId;

            return (
              <button
                key={lesson.id}
                onClick={() => onLessonChange(lesson.id)}
                className={`w-full rounded-2xl border p-3 text-left transition ${
                  isActive
                    ? "border-cyan-300/30 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black ${
                      isActive ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{lesson.title}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {lesson.time}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}