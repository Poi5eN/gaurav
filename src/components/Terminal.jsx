import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SnakeGame from "./SnakeGame";

const Terminal = ({ isFullScreen, toggleFullScreen }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { type: "info", content: "Welcome to Gourav's System Terminal v3.0.0" },
    { type: "info", content: "Active System: Bun + React SPA + SQLite Memory" },
    { type: "info", content: "Type 'help' to see available commands." },
  ]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [textColor, setTextColor] = useState("#00D9FF"); // Default premium cyan

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Focus input on mount/click
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [output, isGameActive]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  const TANJIRO_ASCII = `      _..--""\`\`\`""--.._
    .'                  '.
   /   _..---""\""---.._   \\
  |  .'   __      __   '.  |   GOURAV
  | /    /  \\    /  \\    \\ |   KUMAR
  | |   | () |  | () |   | |   UPADHYAY
  | \\    \\__/    \\__/    / |
  |  '.       __       .'  |   FULL STACK ×
   \\   \`--..__  __..--\`   /    AI SYSTEMS
    '.        \`\`        .'
      \`--..__    __..--\`
             \`\`\`
`;

  const COMMANDS = {
    help: () => `
Available commands:
  about          — Who is Gourav?
  skills         — Tech stack overview
  experience     — Work history & timeline
  projects       — List all 8 production projects
  nexus          — Detailed report on flagship project
  contact        — Fetch contact details & socials
  resume         — Download LaTeX compiled PDF
  github         — Open GitHub profile in a new tab
  linkedin       — Open LinkedIn profile in a new tab
  whoami         — Current role & active status
  sudo hire      — 🎯 Initiate hiring sequence
  easter         — 🥚 Show easter egg
  snake          — 🐍 Play the terminal Snake Game!
  clear          — Clear the terminal console
    `,

    about: () => `
Gourav Kumar Upadhyay
─────────────────────
Full Stack Engineer × AI/ML Systems Builder
3+ years experience | New Delhi, India | Remote OK

"I build systems that think — not just apps that ship."
Currently: Full Stack Developer @ India Accelerator, Gurugram
    `,

    whoami: () => `
> Gourav Kumar Upadhyay
> Role: Full Stack Developer @ India Accelerator
> Focus: AI/ML Engineering (LangChain, RAG, Agents)
> Status: 🟢 Available for AI/ML and Senior Engineering roles
> Stack: Next.js &middot; NestJS &middot; Python &middot; LangChain &middot; OpenAI
    `,

    skills: () => `
ENGINEERING FOUNDATION
  Next.js / React.js    ████████████ 92%
  TypeScript / JS       ████████████ 90%
  NestJS / Node.js      ███████████  88%
  PostgreSQL / Prisma   ██████████   82%
  Redis / BullMQ        █████████    78%
  Docker / Kubernetes   ████████     72%
  AWS / GCP Cloud       ████████     72%

AI / ML ARSENAL
  OpenAI API / Vision   ████████████ 88%
  LangChain Framework   ████████████ 85%
  RAG Pipelines         ███████████  82%
  Vector DBs            ██████████   78%
  Prompt Engineering    ██████████   80%
  Hugging Face          ████████     70%
  Python (AI/ML)        ████████     72%
    `,

    experience: () => `
WORK HISTORY
────────────
[2025–Now]  Full Stack Developer — India Accelerator, Gurugram
            AI claim platform &middot; OpenAI Vision API &middot; NestJS &middot; GCP
            Impact: ↓40% manual claim assessment time

[2024–2025] Full Stack Developer — DoubleKlick Designs, New Delhi
            Challan API gateway &middot; Redis &middot; AWS &middot; CI/CD
            Impact: 10min → 3sec response time

[2023–2024] Software Engineer — Corplyx Technologies, Noida
            React &middot; Redux &middot; Node.js &middot; MongoDB
            Impact: ↓30% page load time

[2022–2023] Software Developer — Infotech Software Solutions, Noida
            Microservices &middot; Backend optimization
            Impact: ↑15% system response time
    `,

    projects: () => `
PROJECTS
────────
1. NEXUS (SAAR AI)       — saarlabs.in          [FLAGSHIP]
2. Paramount             — AI Claim Platform      [Live]
3. ChallanPay (Lawyered) — API Gateway            [Live]
4. Bhraman Together      — Travel Platform        [Live]
5. RAG Knowledge Base    — Document Intelligence  [Live Demo]
6. IA Spaces             — Coworking Platform     [Live]
7. RukiyeZara            — Property Booking       [Live]
8. Digital Vidya Saarthi — EdTech Platform        [Live]

Type: open [project-name] to open in browser
Example: open nexus
    `,

    nexus: () => `
NEXUS — SAAR AI Agent Platform
───────────────────────────────
URL: https://saarlabs.in
Stack: React &middot; Bun.js &middot; Hono &middot; TypeScript &middot; OpenRouter
       SQLite &middot; Supabase pgvector &middot; HuggingFace &middot; Tavily

Architecture: Custom ReAct Agent Loop
  → Parallel tool execution
  → LLM rotation pool (Gemini → DeepSeek → Llama)
  → SSE streaming (tool_start/result/thinking/done)
  → Sandboxed Bun.spawn code execution
  → Hybrid SQLite + pgvector memory

10 Agents: Voyage &middot; Broker &middot; Research &middot; Vision &middot; Legal
           Cinema &middot; Support &middot; Tutor &middot; Medical &middot; Nexus

Metrics:
  ↑35% task accuracy  |  ↓40% perceived latency
  0% rate-limit fails |  10 personas on one viewport
    `,

    contact: () => `
GET IN TOUCH
────────────
Email:    gaurav.upadhyay.vasudeva@gmail.com
GitHub:   github.com/Poi5eN
LinkedIn: linkedin.com/in/gourav-kumar-upadhyay-0731b41b4

Status:   🟢 Available | Response within 24h
Location: New Delhi, India | Remote OK
    `,

    resume: () => {
      window.open("/resume.pdf", "_blank");
      return "↓ Requesting resume.pdf... Opened in a new window.";
    },

    github: () => {
      window.open("https://github.com/Poi5eN", "_blank");
      return "↗ Opening GitHub profile...";
    },

    linkedin: () => {
      window.open("https://www.linkedin.com/in/gourav-kumar-upadhyay-0731b41b4", "_blank");
      return "↗ Opening LinkedIn profile...";
    },

    'sudo hire': () => `
🎯 Initiating Gourav hiring sequence...
────────────────────────────────────────
Offer template dispatched to: gaurav.upadhyay.vasudeva@gmail.com

Just kidding — but let's make it a reality.
Gourav is actively seeking advanced Full Stack & AI Engineering roles.
Type 'contact' to get all operational details instantly.
    `,

    easter: () => `
🥚 Easter Egg Unlocked!
────────────────────────
Did you know?
The ReAct loop in NEXUS can orchestrate up to 9 parallel tool
calls and rotate fallback LLMs before hitting context rate limits.

Gemini 2.0 Flash is utilized for split-second tool reasoning.
DeepSeek v3 is invoked for dense legal and system code reviews.

Now type: sudo hire
    `,
  };

  const handleOpenCommand = (arg) => {
    const urls = {
      nexus: "https://saarlabs.in",
      paramount: "https://sage.paramountservices.co.in/",
      lawyered: "https://lawyered.in/",
      bhraman: "https://www.bhramantogether.com/",
      rag: "https://rag-knowledge-basev2.streamlit.app/",
      iaspaces: "https://iaspaces.co/",
      rukiyezara: "https://www.rukiyezara.com/",
      saarthi: "https://www.digitalvidyasaarthi.in/",
    };
    const url = urls[arg.toLowerCase()];
    if (url) {
      window.open(url, "_blank");
      return `↗ Opening ${arg}...`;
    }
    return `Project "${arg}" not found. Type 'projects' to see all projects.`;
  };

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    // Record history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add command echo to output
    setOutput((prev) => [...prev, { type: "command", content: trimmed }]);

    // Handle 'clear'
    if (command === "clear") {
      setOutput([]);
      return;
    }

    // Handle 'snake'
    if (command === "snake") {
      setIsGameActive(true);
      return;
    }

    // Handle 'open [project]'
    if (command === "open") {
      if (!args) {
        setOutput((prev) => [
          ...prev,
          { type: "error", content: "Usage: open [project-name]. Example: open nexus" },
        ]);
        return;
      }
      const res = handleOpenCommand(args);
      setOutput((prev) => [...prev, { type: "info", content: res }]);
      return;
    }

    // Standard commands
    if (COMMANDS[command]) {
      const outputText = COMMANDS[command]();
      setOutput((prev) => [...prev, { type: "info", content: outputText }]);
      return;
    }

    // Multi-word exact matches (like 'sudo hire')
    if (COMMANDS[trimmed.toLowerCase()]) {
      const outputText = COMMANDS[trimmed.toLowerCase()]();
      setOutput((prev) => [...prev, { type: "info", content: outputText }]);
      return;
    }

    // Unsupported command
    setOutput((prev) => [
      ...prev,
      {
        type: "error",
        content: `bash: command not found: ${command}. Type 'help' to check available commands.`,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    } else if (e.key === "Escape") {
      setInput("");
    }
  };

  const closeGame = () => {
    setIsGameActive(false);
    setOutput((prev) => [
      ...prev,
      { type: "info", content: "Snake game exited. Type 'snake' to play again." },
    ]);
  };

  if (!isFullScreen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#020608]/90 backdrop-blur-md"
    >
      <div className="w-full max-w-3xl h-[80vh] flex flex-col bg-[#0A0F14] border border-[#1A2332] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,217,255,0.12)] font-mono text-sm">
        
        {/* Title bar */}
        <div className="bg-[#0F1923] px-5 py-3.5 flex items-center gap-2 border-b border-[#1A2332]">
          <div className="flex items-center gap-2">
            {/* Functional dots */}
            <span
              onClick={toggleFullScreen}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 cursor-pointer transition-colors"
              title="Close Terminal"
            />
            <span
              onClick={toggleFullScreen}
              className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 cursor-pointer transition-colors"
              title="Minimize"
            />
            <span
              onClick={toggleFullScreen}
              className="w-3.5 h-3.5 rounded-full bg-[#28CA41] hover:bg-[#28CA41]/80 cursor-pointer transition-colors"
              title="Fullscreen"
            />
          </div>
          <span className="mx-auto text-xs text-[#4A6580] tracking-wider select-none">
            gourav@nexus: ~
          </span>
        </div>

        {/* Console logs */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[#030608]/80 text-[#8BA3B8] leading-relaxed">
          {/* Tanjiro Block Header */}
          {!isGameActive && (
            <div className="mb-6 text-left select-none">
              <pre className="text-[#00D9FF] font-mono text-[9px] sm:text-[10px] leading-tight whitespace-pre">
                {TANJIRO_ASCII}
              </pre>
            </div>
          )}

          {isGameActive ? (
            <SnakeGame onExit={closeGame} />
          ) : (
            <>
              {output.map((line, i) => (
                <div key={i} className="mb-2.5 break-words">
                  {line.type === "command" ? (
                    <div className="mt-4 font-bold flex items-center text-white">
                      <span className="mr-2 text-[#00D9FF]">
                        gourav@nexus:~$
                      </span>
                      <span>{line.content}</span>
                    </div>
                  ) : line.type === "error" ? (
                    <div className="text-[#FF6B6B] font-bold">
                      {line.content}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-[#F0F4F8]/90">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 mt-5">
                <span className="font-bold text-[#00D9FF] select-none">
                  gourav@nexus:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white font-bold caret-gray-400"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Type a command..."
                />
              </div>
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="bg-[#0F1923] px-5 py-2.5 flex items-center gap-4 text-[10px] text-[#4A6580] font-mono border-t border-[#1A2332] select-none">
          <span>[Esc] Clear</span>
          <span>[↑][↓] History</span>
          <span>[Close via red dot]</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
