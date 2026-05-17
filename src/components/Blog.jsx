import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { BookOpen, Calendar, ArrowUpRight, MessageSquare } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Building Agentic Systems: What No Tutorial Teaches You",
      date: "May 2026",
      readTime: "6 min read",
      summary: "Most tutorials cover simple API wrappers. Here is how you build actual self-planning multi-agent workflows that resolve errors autonomously in production systems.",
      category: "AI/ML Systems"
    },
    {
      title: "Why Most AI Demos Fail in Production",
      date: "April 2026",
      readTime: "8 min read",
      summary: "A critical breakdown of LLM application drift, token pricing limits, latency bottlenecks, and why hard evaluation matrices are required before going public.",
      category: "LLMOps"
    },
    {
      title: "What I Learned Fine-Tuning My First LLM",
      date: "March 2026",
      readTime: "5 min read",
      summary: "My honest post-mortem of fine-tuning a small open-source model. Lessons in dataset formatting, GPU optimization tricks, and matching base model baseline benchmarks.",
      category: "Model Fine-Tuning"
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
        className="text-center mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Thought Leadership
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Writing & Research
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Grid of Preview Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glassmorphism p-6 rounded-2xl border border-[#1A2332] flex flex-col justify-between hover:border-[#00D9FF]/30 transition-all group cursor-pointer"
          >
            <div>
              {/* Meta information */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[#00D9FF] bg-[#00D9FF]/5 border border-[#00D9FF]/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                
                <div className="flex items-center gap-1 font-mono text-[10px] text-[#8BA3B8]">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-display text-[#F0F4F8] mb-3 group-hover:text-[#00D9FF] transition-colors leading-tight">
                {post.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-[#8BA3B8] leading-relaxed mb-6">
                {post.summary}
              </p>
            </div>

            {/* Read Button */}
            <div className="flex items-center justify-between border-t border-[#1A2332]/50 pt-4 mt-2">
              <span className="font-mono text-[10px] text-[#8BA3B8]">{post.readTime}</span>
              <div className="flex items-center gap-1 text-[#00D9FF] text-xs font-mono group-hover:underline">
                <span>READ POST</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Blog, "blog");
