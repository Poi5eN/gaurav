import React, { useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Sparkles, Terminal, Cpu, Database, Server, Layers } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const SERVICE_CONTENT = {
  "Full-Stack Systems": {
    description:
      "Architecting robust and production-grade full-stack solutions. Experienced with scalable backend APIs, database design, and blazing fast Next.js frontends.",
    techStack: ["Next.js 14", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Tailwind CSS"],
    icon: <Server className="text-[#00D9FF] w-8 h-8" />
  },
  "Cognitive Pipelines (AI)": {
    description:
      "Building highly performant intelligence workflows. Specialized in custom Retrieval-Augmented Generation (RAG) indices, hybrid vector search, and custom embedding extraction.",
    techStack: ["Python", "PyTorch", "Pinecone", "Qdrant", "Hugging Face", "LangChain", "LlamaIndex"],
    icon: <Database className="text-[#7B2FFF] w-8 h-8" />
  },
  "Autonomous Agents": {
    description:
      "Developing agentic workflows that plan, reason, and self-correct. Implementing autonomous multi-agent environments that interact dynamically via tool execution.",
    techStack: ["LangChain Agents", "Autogen", "OpenAI Assistants", "Semantic Kernel", "Agentic Evaluators"],
    icon: <Cpu className="text-[#FF6B35] w-8 h-8" />
  },
  "LLMOps & Infra": {
    description:
      "Ensuring models transition from local prototypes to production deployment. Monitoring cost parameters, input-output token drift, and evaluation metrics.",
    techStack: ["Vercel AI SDK", "Prometheus", "Grafana", "Docker", "AWS ECS", "Model Eval Frameworks"],
    icon: <Layers className="text-[#00FF9D] w-8 h-8" />
  },
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const { description, techStack } = SERVICE_CONTENT[service.title] || {
    description: "No description available.",
    techStack: [],
  };

  return createPortal(
    <motion.div
      key="overlay"
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key="modal"
        className="relative w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] max-w-2xl rounded-2xl overflow-hidden glassmorphism shadow-2xl p-6 sm:p-10 border border-[#1A2332]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8BA3B8] hover:text-[#F0F4F8] z-20 font-mono"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#0A0F14] border border-[#1A2332] rounded-xl">
              {service.customIcon}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F0F4F8]">
              {service.title}
            </h2>
          </div>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mb-6" />
          <p className="text-[#8BA3B8] text-sm sm:text-base leading-relaxed mb-8">
            {description}
          </p>
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#F0F4F8] mb-4">
            // Core Stack Integration:
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-[#0A0F14] border border-[#1A2332] text-[#8BA3B8] text-xs font-mono px-3 py-1.5 rounded-full shadow-sm hover:border-[#00D9FF]/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const ServiceCard = ({ index, title, customIcon, onClick }) => (
  <Tilt className="xs:w-[260px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full bg-[#0A0F14] border border-[#1A2332] p-[1px] rounded-2xl cursor-pointer group hover:border-[#00D9FF]/40 transition-colors duration-300"
      onClick={onClick}
    >
      <div className="relative bg-[#0A0F14] rounded-2xl p-6 min-h-[220px] flex justify-evenly items-center flex-col overflow-hidden">
        <div className="p-4 bg-[#020608] rounded-xl border border-[#1A2332] group-hover:scale-110 transition-transform duration-300">
          {customIcon}
        </div>
        <h3 className="text-[#F0F4F8] font-display text-[18px] font-bold text-center mt-4">
          {title}
        </h3>
        <span className="text-[10px] font-mono text-[#8BA3B8] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          EXPLORE STACK &rarr;
        </span>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { title: "Full-Stack Systems", customIcon: SERVICE_CONTENT["Full-Stack Systems"].icon },
    { title: "Cognitive Pipelines (AI)", customIcon: SERVICE_CONTENT["Cognitive Pipelines (AI)"].icon },
    { title: "Autonomous Agents", customIcon: SERVICE_CONTENT["Autonomous Agents"].icon },
    { title: "LLMOps & Infra", customIcon: SERVICE_CONTENT["LLMOps & Infra"].icon },
  ];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* Left Side: Story & Narrative */}
        <motion.div variants={fadeIn("right", "tween", 0.2, 1)}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
            // My Evolution
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8] mb-6">
            The Pivot to Intelligence
          </h2>
          
          <div className="space-y-4 text-[#8BA3B8] text-sm md:text-base leading-relaxed font-sans">
            <p>
              I've spent years engineering robust full-stack software architectures designed to solve real-world problems.
            </p>
            <p className="border-l-2 border-[#00D9FF] pl-4 italic text-[#F0F4F8]/90 bg-[#00D9FF]/5 py-2 pr-2 rounded-r-lg">
              "But something shifted. I realized the most impactful systems aren't just well-engineered — they are intelligent."
            </p>
            <p>
              So, I went deep. Not tutorial-deep. Production-deep.
            </p>
            <p>
              I transitioned to AI engineering to build system intelligence at scale: custom RAG pipelines, fine-tuned domain models, and autonomous multi-agent environments. 
            </p>
            <p className="font-semibold text-[#00D9FF]">
              I bridge both sides: the architectural rails to ship, and the intelligent agents to differentiate.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Visual Graphic representation */}
        <motion.div
          variants={fadeIn("left", "tween", 0.3, 1)}
          className="relative glassmorphism p-8 rounded-2xl border border-[#1A2332] flex flex-col justify-center min-h-[350px]"
        >
          {/* Visual Constellation Mock */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2FFF]/10 to-[#00D9FF]/10 rounded-2xl -z-10" />
          
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#8BA3B8] border-b border-[#1A2332] pb-4">
            <Sparkles className="text-[#00D9FF] w-4 h-4 animate-spin-slow" />
            <span>NEURAL_ALIGNMENT_MATRIX</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#020608] p-3 rounded-lg border border-[#1A2332]">
              <span className="font-mono text-xs text-[#00D9FF]">STAGE_01 // FULL_STACK_ENGINEERING</span>
              <span className="text-[10px] bg-[#00D9FF]/10 text-[#00D9FF] px-2 py-0.5 rounded">STABLE</span>
            </div>
            
            <div className="flex justify-center my-2 text-[#8BA3B8] font-bold">&darr;</div>

            <div className="flex justify-between items-center bg-[#020608] p-3 rounded-lg border border-[#1A2332] relative overflow-hidden">
              <span className="font-mono text-xs text-[#7B2FFF]">STAGE_02 // MACHINE_LEARNING_INTEGRATION</span>
              <span className="text-[10px] bg-[#7B2FFF]/20 text-[#7B2FFF] px-2 py-0.5 rounded animate-pulse">OPTIMIZING</span>
              <div className="absolute top-0 bottom-0 left-0 bg-[#7B2FFF]/10 w-2/3" />
            </div>

            <div className="flex justify-center my-2 text-[#8BA3B8] font-bold">&darr;</div>

            <div className="flex justify-between items-center bg-[#020608] p-3 rounded-lg border border-[#7B2FFF]/30 shadow-[0_0_15px_rgba(123,47,255,0.1)]">
              <span className="font-mono text-xs text-[#00FF9D]">STAGE_03 // COGNITIVE_AGENTIC_SYSTEMS</span>
              <span className="text-[10px] bg-[#00FF9D]/10 text-[#00FF9D] px-2 py-0.5 rounded">ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cards Showcase */}
      <div className="mt-12 flex flex-wrap gap-8 justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            title={service.title}
            customIcon={service.customIcon}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={{
              ...selectedService,
              customIcon: SERVICE_CONTENT[selectedService.title].icon
            }}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(About, "about");
