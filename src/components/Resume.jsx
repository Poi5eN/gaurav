import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { FileText, Download, Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const Resume = () => {
  const experiences = [
    {
      role: "AI / Full-Stack Engineer (Transition)",
      company: "Freelance & R&D",
      period: "2024 - Present",
      bullets: [
        "Architected self-planning AI agent frameworks capable of running autonomous testing loops with a 98% goal success rate.",
        "Engineered robust Retrieval-Augmented Generation (RAG) pipelines that reduced query hallucination rates by 40%.",
        "Configured MLOps metric collectors tracking cost, token latency, and evaluation drift for multi-model configurations.",
      ],
    },
    {
      role: "Full-Stack Software Developer",
      company: "Poi5eN Labs / Various Clients",
      period: "2022 - 2024",
      bullets: [
        "Built and maintained responsive MERN stack applications with interactive Three.js 3D landing elements.",
        "Optimized backend database schemas, improving API payload delivery speeds by 30% using MongoDB indexing.",
        "Implemented JWT authentication and state validation layers, securing client portals for over 10K+ monthly active users.",
      ],
    },
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
          // Professional Credentials
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Resume & Timeline
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        {/* Buttons Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-[#0A0F14] border border-[#1A2332] p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <FileText className="text-[#00D9FF] w-5 h-5" />
            <span className="font-mono text-sm text-[#8BA3B8]">FORMAT: INTERACTIVE_HTML_RESUME</span>
          </div>
          
          <a
            href="/resume.pdf"
            download="Gaurav_Resume.pdf"
            className="flex items-center gap-2 bg-[#7B2FFF] hover:bg-[#7B2FFF]/80 text-[#F0F4F8] font-mono text-xs px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(123,47,255,0.2)]"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF RESUME</span>
          </a>
        </div>

        {/* The Paper Sheet Mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0A0F14] border border-[#1A2332] rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glowing lines on mock sheet */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D9FF] via-[#7B2FFF] to-[#FF6B35]" />

          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-[#1A2332] pb-8 mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-display font-bold text-[#F0F4F8]">Gaurav</h3>
              <p className="font-mono text-sm text-[#00D9FF] mt-1">Full-Stack Engineer &bull; AI/ML Innovator</p>
            </div>
            <div className="font-mono text-xs text-[#8BA3B8] space-y-1 text-left sm:text-right">
              <div>📍 Based in India &bull; Remote OK</div>
              <div>✉️ contact@gaurav.dev</div>
              <div>🔗 github.com/Poi5eN</div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
              <Briefcase className="text-[#7B2FFF] w-4 h-4" />
              <span>EXPERIENCE SPECTRUM</span>
            </h4>
            
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row justify-between font-mono text-sm mb-2">
                    <span className="text-[#F0F4F8] font-bold">{exp.role}</span>
                    <span className="text-[#8BA3B8]">{exp.company} | {exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-[#8BA3B8] leading-relaxed">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="pl-2">
                        <span className="relative -left-2 text-[#8BA3B8]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
                <GraduationCap className="text-[#FF6B35] w-4 h-4" />
                <span>EDUCATION</span>
              </h4>
              <div className="font-mono text-xs text-[#8BA3B8] space-y-2">
                <div className="font-bold text-[#F0F4F8]">B.S. in Computer Science / Engineering</div>
                <div>Technical Focus: Intelligent Systems & Full Stack Software</div>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
                <Award className="text-[#00FF9D] w-4 h-4" />
                <span>EXPERTISE TOKENS</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "AI Agents", "Python", "RAG", "TypeScript", "Docker", "Node.js"].map((tok) => (
                  <span
                    key={tok}
                    className="bg-[#020608] border border-[#1A2332] text-[#8BA3B8] text-[9px] font-mono px-2 py-0.5 rounded"
                  >
                    {tok}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Resume, "resume");
