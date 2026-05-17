import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { Code2, Brain, Cpu, Database, Server, Terminal, Sparkles, Flame } from "lucide-react";

const Skills = () => {
  const engineeringSkills = [
    { name: "React / Next.js 14", level: 95, icon: <Code2 className="text-[#00D9FF] w-5 h-5" /> },
    { name: "TypeScript / JavaScript", level: 95, icon: <Terminal className="text-[#00D9FF] w-5 h-5" /> },
    { name: "Node.js / Express", level: 90, icon: <Server className="text-[#00D9FF] w-5 h-5" /> },
    { name: "PostgreSQL / MongoDB", level: 85, icon: <Database className="text-[#00D9FF] w-5 h-5" /> },
    { name: "Docker / Kubernetes", level: 80, icon: <Cpu className="text-[#00D9FF] w-5 h-5" /> },
    { name: "AWS / Cloud Infrastructure", level: 80, icon: <Server className="text-[#00D9FF] w-5 h-5" /> },
  ];

  const aiSkills = [
    { name: "Python / PyTorch / NumPy", level: 90, icon: <Brain className="text-[#7B2FFF] w-5 h-5" /> },
    { name: "LangChain / LlamaIndex", level: 90, icon: <Sparkles className="text-[#7B2FFF] w-5 h-5" /> },
    { name: "LLM APIs (OpenAI, Claude, etc.)", level: 95, icon: <Flame className="text-[#7B2FFF] w-5 h-5" /> },
    { name: "RAG & Vector DBs (Pinecone, Qdrant)", level: 88, icon: <Database className="text-[#7B2FFF] w-5 h-5" /> },
    { name: "Fine-Tuning & Model Eval", level: 80, icon: <Cpu className="text-[#7B2FFF] w-5 h-5" /> },
    { name: "LLMOps & Prompt Engineering", level: 95, icon: <Terminal className="text-[#7B2FFF] w-5 h-5" /> },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Expertise Spectrum
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Dual-Track Mastery
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Dual Tracks */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
        
        {/* Track A: Engineering Foundation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glassmorphism p-8 rounded-2xl flex flex-col justify-between hover:border-[#00D9FF]/40 transition-colors duration-300"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#00D9FF]/10 rounded-xl border border-[#00D9FF]/20 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
                <Code2 className="text-[#00D9FF] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#F0F4F8]">Engineering Foundation</h3>
                <p className="text-xs text-[#8BA3B8]">Robust, scalable full-stack architectures</p>
              </div>
            </div>

            <div className="space-y-6">
              {engineeringSkills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span className="text-[#F0F4F8]">{skill.name}</span>
                    </div>
                    <span className="text-[#00D9FF]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#020608] h-1.5 rounded-full overflow-hidden border border-[#1A2332]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#00D9FF] h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Track B: AI/ML Arsenal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glassmorphism p-8 rounded-2xl flex flex-col justify-between hover:border-[#7B2FFF]/40 transition-colors duration-300"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#7B2FFF]/10 rounded-xl border border-[#7B2FFF]/20 shadow-[0_0_15px_rgba(123,47,255,0.1)]">
                <Brain className="text-[#7B2FFF] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#F0F4F8]">AI/ML Arsenal</h3>
                <p className="text-xs text-[#8BA3B8]">Cognitive pipelines and intelligence integration</p>
              </div>
            </div>

            <div className="space-y-6">
              {aiSkills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span className="text-[#F0F4F8]">{skill.name}</span>
                    </div>
                    <span className="text-[#7B2FFF]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#020608] h-1.5 rounded-full overflow-hidden border border-[#1A2332]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#7B2FFF] h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Callout Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mt-16 p-6 rounded-2xl border border-dashed border-[#1A2332] bg-surface text-center flex flex-col md:flex-row items-center justify-center gap-4 hover:border-[#00D9FF]/30 transition-all"
      >
        <div className="p-3 bg-[#00D9FF]/10 rounded-xl border border-[#00D9FF]/20 flex items-center justify-center">
          <Sparkles className="text-[#00D9FF] w-6 h-6 animate-pulse" />
        </div>
        <p className="text-[#8BA3B8] font-mono text-sm md:text-base">
          "I am one of the few engineers who can take an AI idea from <span className="text-[#00D9FF]">model</span> &rarr; <span className="text-[#7B2FFF]">product</span> &rarr; <span className="text-[#00FF9D]">production</span>."
        </p>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Skills, "skills");
