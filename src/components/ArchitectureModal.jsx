import React, { useEffect } from "react";
import { IconX, IconDatabase, IconServer, IconTerminal, IconCpu, IconBrandGithub } from "@tabler/icons-react";

export function ArchitectureModal({ onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const agents = [
    { name: "Voyage Architect", view: "Map Canvas Planner", tools: "Google Maps API, Bun Sandbox", useCase: "Synthesizes and tests complex travel paths." },
    { name: "Stock Broker", view: "Candlestick Chart Widget", tools: "Yahoo Finance API", useCase: "Analyzes ticker historical data & market trends." },
    { name: "Deep Search", view: "Agent Log Panel", tools: "Tavily Search Engine", useCase: "Executes deep semantic search queries across the web." },
    { name: "Vision Canvas", view: "Canvas Image Board", tools: "HuggingFace FLUX Model", useCase: "Generates high-fidelity visual assets on demand." },
    { name: "Legal Helper", view: "Structured Doc Editor", tools: "Zod Schema Validation", useCase: "Builds legally compliant agreements and leases." },
    { name: "Cinephile Expert", view: "Movie Metadata Grid", tools: "TMDB API Integration", useCase: "Recommends tailored cinematic content & reviews." },
    { name: "Support Desk", view: "Chat Console", tools: "SQLite Session Memory", useCase: "Automates multi-turn customer service tickets." },
    { name: "Academic Tutor", view: "Interactive Code Console", tools: "Python/JS Sandboxes", useCase: "Teaches computing concepts and tests user script blocks." },
    { name: "Medical Assistant", view: "Triage Dashboard", tools: "Symptom Classifier", useCase: "Triages symptoms and recommends specialist care." },
    { name: "Nexus Assistant", view: "Master Orchestrator CLI", tools: "LLM Rotation Controller", useCase: "Routes user prompts to specialized sub-agents." },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#020608]/95 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#0A0F14] border border-[#1A2332] rounded-2xl shadow-[0_24px_80px_rgba(0,217,255,0.15)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2332]">
          <div>
            <h2 className="text-xl font-display font-bold text-[#F0F4F8] flex items-center gap-2">
              <span className="text-[#00D9FF]">🔬</span> NEXUS System Architecture
            </h2>
            <p className="text-xs font-mono text-[#8BA3B8] mt-0.5">
              10 specialized personas. Custom ReAct Reasoning Loop. Deployed live at saarlabs.in.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#1A2332] hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all text-[#8BA3B8]"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Diagnostic SVG Diagram */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase">System Dataflow Engine</h3>
            <div className="bg-[#030608] border border-[#1A2332] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D9FF]/5 blur-2xl rounded-full" />
              
              {/* SPA Client */}
              <div className="flex flex-col items-center p-4 bg-[#0A0F14] border border-[#00D9FF]/30 rounded-lg w-full md:w-1/4 text-center z-10">
                <IconTerminal className="w-8 h-8 text-[#00D9FF] mb-2" />
                <span className="text-sm font-bold text-[#F0F4F8]">React 18 SPA</span>
                <span className="text-[10px] font-mono text-[#4A6580] mt-1">Vite &bull; Tailwind v4</span>
              </div>

              {/* SSE / HTTPS Streams */}
              <div className="flex flex-col items-center justify-center font-mono text-[10px] text-[#00D9FF] gap-1 select-none animate-pulse w-full md:w-auto">
                <span className="hidden md:inline">&mdash;&mdash; HTTPS Payload &mdash;&rarr;</span>
                <span className="hidden md:inline">&larr;&mdash;&mdash; SSE Event Stream &mdash;&mdash;</span>
                <span className="md:hidden">&darr; HTTPS / SSE &uarr;</span>
              </div>

              {/* Server */}
              <div className="flex flex-col items-center p-4 bg-[#0A0F14] border border-[#7B2FFF]/30 rounded-lg w-full md:w-1/3 text-center z-10 shadow-[0_0_15px_rgba(123,47,255,0.1)]">
                <IconServer className="w-8 h-8 text-[#7B2FFF] mb-2" />
                <span className="text-sm font-bold text-[#F0F4F8]">Bun.js + Hono Server</span>
                <span className="text-[10px] font-mono text-[#8BA3B8] mt-1">ReAct Loop Orchestrator</span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center font-mono text-[10px] text-[#7B2FFF] animate-pulse w-full md:w-auto">
                <span className="hidden md:inline">&mdash;&rarr;</span>
                <span className="md:hidden">&darr;</span>
              </div>

              {/* Integrations Pool */}
              <div className="grid grid-cols-2 gap-2 w-full md:w-1/3 z-10">
                <div className="p-2 bg-[#0A0F14] border border-[#1A2332] rounded flex items-center gap-1.5 text-left">
                  <IconDatabase className="w-4 h-4 text-[#28CA41]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#F0F4F8]">pgvector</span>
                    <span className="text-[8px] text-[#4A6580]">Supabase RAG</span>
                  </div>
                </div>
                <div className="p-2 bg-[#0A0F14] border border-[#1A2332] rounded flex items-center gap-1.5 text-left">
                  <IconCpu className="w-4 h-4 text-[#FFBD2E]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#F0F4F8]">Bun Sandbox</span>
                    <span className="text-[8px] text-[#4A6580]">Spawn Process</span>
                  </div>
                </div>
                <div className="p-2 bg-[#0A0F14] border border-[#1A2332] rounded flex items-center gap-1.5 text-left">
                  <IconServer className="w-4 h-4 text-[#00D9FF]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#F0F4F8]">OpenRouter</span>
                    <span className="text-[8px] text-[#4A6580]">LLM Pool</span>
                  </div>
                </div>
                <div className="p-2 bg-[#0A0F14] border border-[#1A2332] rounded flex items-center gap-1.5 text-left">
                  <IconDatabase className="w-4 h-4 text-[#FF5F57]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#F0F4F8]">SQLite</span>
                    <span className="text-[8px] text-[#4A6580]">Session Memory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10 Persona Agents Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-[#00D9FF] tracking-wider uppercase">Persona Core Registry</h3>
            <div className="border border-[#1A2332] rounded-xl overflow-hidden bg-[#030608]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1A2332] bg-[#0A0F14] text-xs font-mono text-[#8BA3B8]">
                      <th className="p-3">Persona</th>
                      <th className="p-3">View Component</th>
                      <th className="p-3">Tool Integrations</th>
                      <th className="p-3">Use Case / Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent, i) => (
                      <tr key={i} className="border-b border-[#1A2332]/50 last:border-b-0 text-xs font-mono text-[#F0F4F8] hover:bg-[#0A0F14]/40 transition-colors">
                        <td className="p-3 font-bold text-[#00D9FF] whitespace-nowrap">{agent.name}</td>
                        <td className="p-3 text-[#F0F4F8]/80 whitespace-nowrap">{agent.view}</td>
                        <td className="p-3 text-[#FFBD2E] whitespace-nowrap">{agent.tools}</td>
                        <td className="p-3 text-[#8BA3B8]">{agent.useCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#1A2332] bg-[#030608] rounded-b-2xl">
          <span className="text-[10px] font-mono text-[#4A6580]">
            SECURITY ENVELOPE: BUN_SPAWN_ISOLATED_SANDBOX // ACTIVE
          </span>
          <a
            href="https://saarlabs.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-[#00D9FF] hover:underline"
          >
            Launch saarlabs.in &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
