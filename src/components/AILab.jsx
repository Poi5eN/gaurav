import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { Terminal as TerminalIcon, Sparkles, Send, RefreshCw, Layers, Cpu, CheckCircle, ExternalLink, GitBranch } from "lucide-react";

const AILab = () => {
  const [activeTab, setActiveTab] = useState("agent"); // "agent" or "projects"
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System online. Ask me anything about Gourav's skills, experience, or projects." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingSteps, setTypingSteps] = useState([]);
  const [showArchModal, setShowArchModal] = useState(false);
  const [githubActivity, setGithubActivity] = useState(null);

  useEffect(() => {
    // Fetch GitHub events
    fetch("https://api.github.com/users/Poi5eN/events?per_page=5")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const pushEvent = data.find(event => event.type === "PushEvent");
          if (pushEvent) {
            const repoName = pushEvent.repo.name.replace("Poi5eN/", "");
            const commitMessage = pushEvent.payload.commits?.[0]?.message || "Code updates";
            const dateStr = new Date(pushEvent.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            });
            setGithubActivity({ repoName, commitMessage, dateStr });
          }
        }
      })
      .catch(err => console.log("GitHub activity fetch error:", err));
  }, []);

  const suggestions = [
    "What is Gourav's experience with LLMs?",
    "Can Gourav take a model into production?",
    "Tell me about his full-stack expertise."
  ];

  const gauravQA = [
    {
      keywords: ["llm", "large language model", "claude", "gpt"],
      answer: "Gourav has extensive experience building with LLMs. He specializes in setting up orchestrators, prompt engineering, agentic planning, and RAG pipelines using LangChain, OpenAI, and Anthropic APIs. He builds full-fledged applications around models, not just simple API calls."
    },
    {
      keywords: ["production", "deploy", "scale", "infrastructure"],
      answer: "Absolutely. Gourav excels at LLMOps and full-stack deployment. He has built Docker containers, hosted vector database search clusters, and deployed production-ready applications utilizing AWS and Next.js, maintaining strict latency standards."
    },
    {
      keywords: ["full-stack", "react", "next.js", "frontend", "backend"],
      answer: "Gourav has spent years developing robust full-stack software. His stack includes React, Next.js, Node.js, and TypeScript, backed by PostgreSQL or MongoDB. He creates ultra-responsive, beautiful glassmorphic frontends matched with robust background workers."
    },
    {
      keywords: ["resume", "experience", "background"],
      answer: "Gourav is a Full Stack Engineer transitioning to AI/ML. He bridges the gap between raw models and fully operational products. You can download his detailed resume in the section below or view his roles in the experience timeline!"
    }
  ];

  const handleSend = (textToSend) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsTyping(true);
    setTypingSteps([]);

    const steps = [
      { text: "🧠 Analyzing input intent...", delay: 400 },
      { text: "🔍 Searching vector database index...", delay: 1000 },
      { text: "⚡ Reranking context documents...", delay: 1600 },
      { text: "✍️ Generating final synthesis...", delay: 2200 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setTypingSteps((prev) => [...prev, step.text]);
      }, step.delay);
    });

    setTimeout(() => {
      let finalResponse = "I searched gourav.dev indexes but couldn't find an exact match. Try asking about 'LLMs', 'production deployments', or his 'full-stack expertise'!";
      
      const promptLower = prompt.toLowerCase();
      for (const item of gauravQA) {
        if (item.keywords.some(keyword => promptLower.includes(keyword))) {
          finalResponse = item.answer;
          break;
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: finalResponse }]);
      setIsTyping(false);
      setTypingSteps([]);
    }, 2800);
  };

  const aiProjects = [
    {
      title: "RAG Knowledge Base",
      metric: "Semantic search <2s",
      desc: "Upload any PDF. Ask questions. Powered by LangChain, ChromaDB vector search, and OpenAI for grounded document Q&A.",
      tech: ["Python", "LangChain", "ChromaDB", "OpenAI API", "Streamlit"],
      liveUrl: "https://rag-knowledge-basev2.streamlit.app/",
      architecture: [
        "PDF upload → Text extraction",
        "Semantic chunking & vectorizing",
        "ChromaDB local index storage",
        "User Query → OpenAI Context Synthesis"
      ]
    },
    {
      title: "AI Damage Detection Pipeline",
      metric: "↓40% manual claim time",
      desc: "Real-time vehicle image analysis using OpenAI Vision API. Detects damage, classifies severity, auto-fills claim fields.",
      tech: ["OpenAI Vision", "NestJS", "Next.js", "PostgreSQL"],
      action: "view_arch",
      architecture: [
        "Client Uploads Vehicle Damage Photo",
        "Image Process Gateway → Vision API",
        "Severe Damage classification algorithm",
        "Database Field auto-population"
      ]
    },
    {
      title: "5-in-1 API Gateway",
      metric: "10min → <3sec Response",
      desc: "Unified 5+ challan provider APIs with Redis caching. Built for enterprise dashboard operations at Lawyered.",
      tech: ["Node.js", "Redis", "Prisma", "PostgreSQL", "REST"],
      liveUrl: "https://lawyered.in/",
      architecture: [
        "Incoming Multi-provider Request",
        "Redis cache checking (sub-10ms)",
        "API calls distribution layer",
        "Response aggregator & formatting"
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Interactive Sandbox
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          The AI Lab
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Dynamic GitHub Activity Widget */}
      {githubActivity && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-10 bg-[#0A0F14] border border-[#00FF9D]/30 p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(0,255,157,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00FF9D]/10 rounded-lg text-[#00FF9D]">
              <GitBranch className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[#00FF9D] text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
                Currently Building
              </div>
              <div className="text-[#F0F4F8] text-xs font-semibold mt-0.5 truncate max-w-[200px] sm:max-w-[280px]">
                Commit: {githubActivity.commitMessage}
              </div>
              <div className="text-gray-500 text-[10px]">
                Repo: {githubActivity.repoName}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8BA3B8] bg-[#1A2332]/50 px-2 py-1 rounded">
            {githubActivity.dateStr}
          </span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 px-4">
        <button
          onClick={() => setActiveTab("agent")}
          className={`px-6 py-2.5 rounded-full font-mono text-xs sm:text-sm border transition-all ${
            activeTab === "agent"
              ? "bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]"
              : "border-[#1A2332] text-[#8BA3B8] hover:border-[#8BA3B8]/30"
          }`}
        >
          🤖 Chat with My Agent
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-2.5 rounded-full font-mono text-xs sm:text-sm border transition-all ${
            activeTab === "projects"
              ? "bg-[#7B2FFF]/10 border-[#7B2FFF] text-[#7B2FFF] shadow-[0_0_15px_rgba(123,47,255,0.2)]"
              : "border-[#1A2332] text-[#8BA3B8] hover:border-[#8BA3B8]/30"
          }`}
        >
          🔬 AI System Architectures
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {activeTab === "agent" ? (
          /* Option A: AI Chat Sandbox */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glassmorphism rounded-2xl overflow-hidden border border-[#1A2332] flex flex-col h-[500px]"
          >
            {/* Console Header */}
            <div className="bg-[#020608] px-6 py-4 border-b border-[#1A2332] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D] animate-ping" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F0F4F8]">
                  gourav_intelligence_orchestrator v1.2
                </span>
              </div>
              <TerminalIcon className="text-[#8BA3B8] w-4 h-4" />
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-sm">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 border text-left ${
                        msg.role === "user"
                          ? "bg-[#7B2FFF]/10 border-[#7B2FFF]/20 text-[#F0F4F8]"
                          : "bg-[#0A0F14] border-[#1A2332] text-[#8BA3B8]"
                      }`}
                    >
                      <div className="text-[10px] text-gray-500 mb-1">
                        {msg.role === "user" ? "USER" : "AGENT"}
                      </div>
                      <p>{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-left">
                    {/* Execution Pipeline Steps */}
                    <div className="text-xs text-[#00D9FF]/70 space-y-1 pl-2 border-l border-[#00D9FF]/30">
                      {typingSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-[#00FF9D]" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    {/* Pulsing Dots */}
                    <div className="flex gap-1.5 pl-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className="p-4 bg-[#020608]/50 border-t border-[#1A2332] flex flex-wrap gap-2 justify-center">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  disabled={isTyping}
                  className="text-xs text-[#00D9FF] bg-[#00D9FF]/5 hover:bg-[#00D9FF]/10 border border-[#00D9FF]/20 px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-[#020608] border-t border-[#1A2332] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isTyping}
                placeholder="Ask about 'LLM deployments', 'RAG pipelines', etc..."
                className="flex-1 bg-[#0A0F14] border border-[#1A2332] focus:border-[#7B2FFF] outline-none text-[#F0F4F8] rounded-xl px-4 py-2.5 font-mono text-sm placeholder:text-[#8BA3B8]/50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim()}
                className="bg-[#7B2FFF] text-white p-2.5 rounded-xl hover:bg-[#7B2FFF]/80 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Option B: AI Project Architectures */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {aiProjects.map((proj, idx) => (
              <div
                key={idx}
                className="glassmorphism p-6 rounded-2xl border border-[#1A2332] flex flex-col justify-between hover:border-[#00D9FF]/30 transition-all group text-left"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#00FF9D] bg-[#00FF9D]/10 px-2.5 py-1 rounded-md">
                      {proj.metric}
                    </span>
                    <Layers className="text-[#8BA3B8] w-4 h-4 group-hover:text-[#00D9FF] transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#F0F4F8] mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#8BA3B8] mb-4">
                    {proj.desc}
                  </p>

                  {/* Architecture Diagram Steps */}
                  <div className="bg-[#020608] p-3 rounded-lg border border-[#1A2332] space-y-1.5 font-mono text-[10px] text-[#8BA3B8] mb-4">
                    <div className="text-[#7B2FFF] font-bold uppercase text-[9px] mb-1">Architecture Flow:</div>
                    {proj.architecture.map((archStep, idxStep) => (
                      <div key={idxStep} className="flex items-center gap-1">
                        <span className="text-[#00D9FF] font-bold">&rarr;</span>
                        <span>{archStep}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.tech.map((t, idxTech) => (
                      <span
                        key={idxTech}
                        className="text-[9px] font-mono text-[#F0F4F8] bg-[#1A2332]/50 px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 bg-[#0A0F14] border border-[#1A2332] hover:border-[#00D9FF]/40 text-[#00D9FF] text-xs font-mono py-2 rounded-xl transition-all"
                    >
                      <span>Try Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowArchModal(true)}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 hover:border-[#7B2FFF] text-[#F0F4F8] text-xs font-mono py-2 rounded-xl transition-all"
                    >
                      <span>View Architecture</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Interactive Modal for Architecture Diagram */}
      <AnimatePresence>
        {showArchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0A0F14] border border-[#1A2332] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setShowArchModal(false)}
                className="absolute top-4 right-4 text-[#8BA3B8] hover:text-[#F0F4F8] font-mono text-xl"
              >
                &times;
              </button>

              <h3 className="text-xl font-display font-bold text-[#F0F4F8] mb-4">
                AI Damage Detection Pipeline
              </h3>
              <p className="text-xs text-[#8BA3B8] mb-6">
                This schematic represents the end-to-end multi-role auto-classification flow for insurance claims.
              </p>

              {/* Styled Pipeline Diagram */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 bg-[#020608] rounded-xl border border-[#1A2332] flex items-center justify-between">
                  <span className="text-[#00D9FF]">Step 1: Upload Damage Photo</span>
                  <span className="text-[10px] text-gray-500">Client WebApp</span>
                </div>
                <div className="text-center text-gray-500">&darr;</div>
                <div className="p-3 bg-[#020608] rounded-xl border border-[#1A2332] flex items-center justify-between">
                  <span className="text-[#7B2FFF]">Step 2: Buffer Queue & Vision API analysis</span>
                  <span className="text-[10px] text-[#7B2FFF]">NestJS / Redis</span>
                </div>
                <div className="text-center text-gray-500">&darr;</div>
                <div className="p-3 bg-[#020608] rounded-xl border border-[#1A2332] flex items-center justify-between">
                  <span className="text-[#00FF9D]">Step 3: Damage Class & Cost Evaluation</span>
                  <span className="text-[10px] text-[#00FF9D]">Python Core</span>
                </div>
                <div className="text-center text-gray-500">&darr;</div>
                <div className="p-3 bg-[#020608] rounded-xl border border-[#1A2332] flex items-center justify-between">
                  <span className="text-[#F0F4F8]">Step 4: Claims Approval Workflow Dashboard</span>
                  <span className="text-[10px] text-gray-500">Next.js UI</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1A2332] flex justify-end">
                <button
                  onClick={() => setShowArchModal(false)}
                  className="bg-[#020608] border border-[#1A2332] hover:border-[#8BA3B8] text-[#8BA3B8] hover:text-[#F0F4F8] text-xs font-mono px-4 py-2 rounded-xl transition-all"
                >
                  Close Diagram
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AILabSection = SectionWrapper(AILab, "ailab");
export default AILabSection;
