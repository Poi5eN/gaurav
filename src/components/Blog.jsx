import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar, IconArrowUpRight, IconBook, IconX } from "@tabler/icons-react";
import { SectionWrapper } from "../hoc";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  const posts = [
    {
      id: "agentic",
      title: "Building Agentic Systems: What No Tutorial Teaches You",
      date: "May 2026",
      readTime: "6 min read",
      summary: "Most tutorials cover simple API wrappers. Here is how you build actual self-planning multi-agent workflows that resolve errors autonomously in production systems.",
      category: "AI/ML Systems",
      content: `
### The API Wrapper Illusion
If you read standard tutorials, building an AI agent seems trivial: you import a library, instantiate an LLM class, write a three-line prompt, and let it run. But in real-world production systems, this setup collapses instantly. It fails because of rate limits, context length, structural drift, and the fundamental fact that LLMs are not built to be deterministic execution blocks.

### Core Architecture: The ReAct Reasoning Loop
To make an agent stable, you must design a structured plan-execute-observe loop. Rather than asking the LLM to complete a large task in one shot:
1. **Thought**: The model reasons about its target and formulates a micro-plan.
2. **Action**: The agent selects a specific, single tool (e.g. executing an SQLite query, loading a search query).
3. **Observation**: The engine returns the raw output of the tool, feeding it directly back into the context.

In NEXUS, we built this loop using a native TypeScript engine running under Bun.js.

### Dynamic LLM Rotation
No single model is optimal for all tasks. For low-latency planning and basic tool actions, we dispatch the query to **Gemini 2.0 Flash**. If we require deep code verification, we transition the context to **DeepSeek v3**. If a rate-limit boundary is breached, we seamlessly roll back to a **Llama 3.3 70B** fallback endpoint. This dynamic rotation keeps rate-limit exceptions at 0% while lowering token consumption overhead.

### Sandboxed Code Execution
When an agent writes code to solve a problem, you cannot run it in your host environment. In NEXUS, we utilize **Bun.spawn** to spin up sandboxed, memory-bounded, and ephemeral processes. The agent writes a script, the sandbox executes it, and returns stdout or stderr. If an error is caught, the agent reads the traceback, updates its script, and re-executes automatically.
      `
    },
    {
      id: "demos-fail",
      title: "Why Most AI Demos Fail in Production",
      date: "April 2026",
      readTime: "8 min read",
      summary: "A critical breakdown of LLM application drift, token pricing limits, latency bottlenecks, and why hard evaluation matrices are required before going public.",
      category: "LLMOps",
      content: `
### The Chasm Between Prototype and Production
Building an AI demo takes 30 minutes. Scaling it to serve thousands of active users with sub-second response times, structural stability, and a balanced budget is an entirely different engineering challenge. Most products fail because developers treat LLMs as static black boxes.

### The Semantic Vector Trap
RAG (Retrieval-Augmented Generation) is highly popular, but basic implementation yields massive operational failures:
* **Drift**: As your vector store grows, semantic similarity search matches out-of-context chunks.
* **Loss of Context**: Feeding random paragraphs into an LLM breaks core document coherence.

**Our Fix**: We implemented a hybrid search pipeline. We combine pgvector semantic searches with traditional BM25 keyword matching, reranked via a Cohere CohereRerank endpoint. This ensures that the context fed to the agent is extremely accurate and highly compressed, lowering token overhead.

### Hard Token Budgets and Latency
LLM inference is slow. To achieve sub-second perceived response times, you must:
1. **Stream Tokens**: Utilize Server-Sent Events (SSE) to send characters to the client as they are generated.
2. **Cache Dense Contexts**: Use Redis caching for static grounding layers (like system data sheets).
3. **Budget Contexts**: Clip conversation histories tightly. Keeping massive histories causes exponential cost increases and slows response rates significantly.
      `
    },
    {
      id: "fine-tuning",
      title: "What I Learned Fine-Tuning My First LLM",
      date: "March 2026",
      readTime: "5 min read",
      summary: "My honest post-mortem of fine-tuning a small open-source model. Lessons in dataset formatting, GPU optimization tricks, and matching base model baseline benchmarks.",
      category: "Model Fine-Tuning",
      content: `
### Why Fine-Tune?
When building specialized products, standard models are often too large, expensive, or lack domain-specific style matching. Fine-tuning a smaller, open-source model (like Llama 3.1 8B) lets you build an extremely fast, secure, and cost-effective engine that executes specialized JSON formatting perfectly.

### The Dataset Quality Trap
"Garbage in, garbage out" has never been truer than in LLM fine-tuning. If your dataset contains even a few poorly formatted examples, the model will learn structural habits (like repeating tokens or omitting closing braces).
* We built an active synthetic generation pipeline using a teacher model (Claude 3.5 Sonnet) to write 2,000 highly targeted examples.
* We filtered these using a strict Python validator script to guarantee syntax validity.

### GPU Memory Optimizations
Fine-tuning consumes immense VRAM. To train an 8B model on consumer hardware or low-cost cloud rigs:
* **LoRA/QLoRA**: Rather than updating all 8 billion parameters, we frozen the base model weights and trained a tiny, low-rank adapter (LoRA), lowering GPU memory footprint.
* **FlashAttention-2**: Slays VRAM overhead by optimizing GPU attention matrix calculations.
* **Gradient Accumulation**: Allowed us to simulate a large batch size while keeping hardware memory usage low.
      `
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
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="glassmorphism p-6 rounded-2xl border border-[#1A2332] flex flex-col justify-between hover:border-[#00D9FF]/30 hover:shadow-[0_4px_20px_rgba(0,217,255,0.05)] transition-all group cursor-pointer text-left"
          >
            <div>
              {/* Meta information */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[#00D9FF] bg-[#00D9FF]/5 border border-[#00D9FF]/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>

                <div className="flex items-center gap-1 font-mono text-[10px] text-[#8BA3B8]">
                  <IconCalendar className="w-3.5 h-3.5" />
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
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Post Full View Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedPost(null);
            }}
            className="fixed inset-0 z-[9999] bg-[#020608]/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0A0F14] border border-[#1A2332] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#1A2332] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/30">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#8BA3B8] mt-2">
                    <IconCalendar className="w-3.5 h-3.5" />
                    <span>Published: {selectedPost.date} &bull; {selectedPost.readTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg border border-[#1A2332] hover:border-[#FF5F57] hover:text-[#FF5F57] transition-all text-[#8BA3B8] cursor-pointer"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-left">
                <h2 className="text-xl md:text-2xl font-display font-bold text-[#F0F4F8] mb-6 leading-tight">
                  {selectedPost.title}
                </h2>

                {/* Markdown-style content block */}
                <div className="text-sm text-[#8BA3B8] leading-relaxed space-y-4 font-sans prose prose-invert max-w-none">
                  {selectedPost.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return (
                        <h3 key={i} className="text-md font-bold font-display text-[#F0F4F8] mt-6 mb-2 border-b border-[#1A2332]/50 pb-1 flex items-center gap-2">
                          <span className="text-[#00D9FF]">&bull;</span>
                          {para.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    if (para.startsWith("*")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-2 mt-2 font-mono text-xs text-[#00D9FF]/95">
                          {para.split("\n").map((li, idxLi) => (
                            <li key={idxLi}>{li.replace("*", "").trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i} className="whitespace-pre-line">{para.trim()}</p>;
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-[#1A2332] bg-[#030608] flex items-center justify-between rounded-b-2xl">
                <span className="text-[10px] font-mono text-[#4A6580]">
                  Gourav Kumar Upadhyay &middot; Thoughts
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-1.5 border border-[#1A2332] hover:border-[#00D9FF] hover:text-[#00D9FF] text-[#8BA3B8] text-xs font-mono rounded-lg transition-all cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BlogSection = SectionWrapper(Blog, "blog");
export default BlogSection;
