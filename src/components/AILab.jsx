import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { Terminal as TerminalIcon, Sparkles, Send, RefreshCw, Layers, Cpu, CheckCircle } from "lucide-react";

const AILab = () => {
  const [activeTab, setActiveTab] = useState("agent"); // "agent" or "projects"
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System online. Ask me anything about Gaurav's skills, experience, or projects." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingSteps, setTypingSteps] = useState([]);

  const suggestions = [
    "What is Gaurav's experience with LLMs?",
    "Can Gaurav take a model into production?",
    "Tell me about his full-stack expertise."
  ];

  const gauravQA = [
    {
      keywords: ["llm", "large language model", "claude", "gpt"],
      answer: "Gaurav has extensive experience building with LLMs. He specializes in setting up orchestrators, prompt engineering, agentic planning, and RAG pipelines using LangChain, OpenAI, and Anthropic APIs. He builds full-fledged applications around models, not just simple API calls."
    },
    {
      keywords: ["production", "deploy", "scale", "infrastructure"],
      answer: "Absolutely. Gaurav excels at LLMOps and full-stack deployment. He has built Docker containers, hosted vector database search clusters, and deployed production-ready applications utilizing AWS and Next.js, maintaining strict latency standards."
    },
    {
      keywords: ["full-stack", "react", "next.js", "frontend", "backend"],
      answer: "Gaurav has spent years developing robust full-stack software. His stack includes React, Next.js 14, Node.js, and TypeScript, backed by PostgreSQL or MongoDB. He creates ultra-responsive, beautiful glassmorphic frontends matched with robust background workers."
    },
    {
      keywords: ["resume", "experience", "background"],
      answer: "Gaurav is a Full Stack Engineer transitioning to AI/ML. He bridges the gap between raw models and fully operational products. You can download his detailed resume in the section below or view his roles in the experience timeline!"
    }
  ];

  const handleSend = (textToSend) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsTyping(true);
    setTypingSteps([]);

    // AI thinking/execution steps simulation
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
      let finalResponse = "I search gaurav.dev indexes but couldn't find a exact match. Try asking about 'LLMs', 'production deployments', or his 'full-stack expertise'!";
      
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
      title: "RAG Pipeline Engine",
      metric: "↓ 40% Hallucinations",
      desc: "Advanced PDF ingestion and intelligent vector search using Pinecone, PyTorch embeddings, and Claude 3.5 Sonnet.",
      tech: ["Python", "Pinecone", "Claude 3.5", "FastAPI"],
      architecture: [
        "Injest PDF → Extract Chunks",
        "Generate PyTorch Embeddings",
        "Upsert into Vector DB",
        "Semantic Search → LLM Context Synthesis"
      ]
    },
    {
      title: "Self-Planning AI Agent",
      metric: "98% Goal Completion",
      desc: "Autonomous workflow system using LangChain that plans complex code tasks, executes tests, and fixes compilation bugs.",
      tech: ["LangChain", "Autogen", "React", "Node.js"],
      architecture: [
        "User Goal → AI Planner",
        "Decompose into Sub-goals",
        "Tool Execution loop",
        "Verification & Auto-debug"
      ]
    },
    {
      title: "LLM Eval Dashboard",
      metric: "1M+ Tokens/Day monitored",
      desc: "MLOps monitoring utility that records latency, prompt Drift, cost metrics, and quality scores for multi-model configurations.",
      tech: ["Next.js", "Docker", "PostgreSQL", "Tailwind"],
      architecture: [
        "API Proxy → Log requests",
        "Async Eval Metrics calculation",
        "Data Store in PG Database",
        "Real-time Grafana dashboard UI"
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

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("agent")}
          className={`px-6 py-2.5 rounded-full font-mono text-sm border transition-all ${
            activeTab === "agent"
              ? "bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]"
              : "border-[#1A2332] text-[#8BA3B8] hover:border-[#8BA3B8]/30"
          }`}
        >
          🤖 Chat with My Agent
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-2.5 rounded-full font-mono text-sm border transition-all ${
            activeTab === "projects"
              ? "bg-[#7B2FFF]/10 border-[#7B2FFF] text-[#7B2FFF] shadow-[0_0_15px_rgba(123,47,255,0.2)]"
              : "border-[#1A2332] text-[#8BA3B8] hover:border-[#8BA3B8]/30"
          }`}
        >
          🔬 AI System Architectures
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
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
                  gaurav_intelligence_orchestrator v1.2
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
                      className={`max-w-[80%] rounded-xl px-4 py-3 border ${
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
                className="glassmorphism p-6 rounded-2xl border border-[#1A2332] flex flex-col justify-between hover:border-[#00D9FF]/30 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-[#00FF9D] bg-[#00FF9D]/10 px-2 py-1 rounded-md">
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
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(AILab, "ailab");
