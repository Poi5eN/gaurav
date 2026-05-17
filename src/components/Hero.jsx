import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Download, Eye } from "lucide-react";

import { styles } from "../styles";
import { Hero3DScene } from "./canvas";

const Hero = ({ onOpenTerminal, isTerminalOpen }) => {
  const [index, setIndex] = useState(0);

  const texts = [
    "3+ years shipping enterprise platforms.",
    "Integrating OpenAI Vision API & RAG pipelines.",
    "Building intelligent systems from model to UI.",
    "Obsessed with autonomous agentic architectures.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentText = texts[index];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-[#020608]">
      
      {/* Decorative Top Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FFF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile Fallback: Animated CSS Gradient Blob */}
      <div className="absolute inset-0 block md:hidden pointer-events-none z-0">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#7B2FFF]/10 to-[#00D9FF]/10 blur-3xl top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        {/* Neon Indicator Pillar */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-4 h-4 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF]" />
          <div className="w-0.5 sm:h-80 h-48 bg-gradient-to-b from-[#00D9FF] via-[#7B2FFF] to-transparent" />
        </div>

        {/* Text Area */}
        <div className="space-y-6 max-w-2xl pointer-events-auto">
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 bg-[#0A0F14] border border-[#1A2332] rounded-full px-3 py-1 text-[10px] font-mono tracking-wider text-[#8BA3B8]">
            <Sparkles className="text-[#00D9FF] w-3.5 h-3.5 animate-spin-slow" />
            <span>FULL STACK ENGINEER &times; AI/ML SYSTEMS</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#F0F4F8] leading-[1.1]">
            I build <span className="bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] bg-clip-text text-transparent">intelligent</span> systems.
          </h1>

          {/* Dynamic Typist Subtitle */}
          <div className="h-[48px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-[#8BA3B8] font-mono text-sm sm:text-base md:text-lg"
              >
                &gt;_ {currentText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Core Subtitle Description */}
          <p className="text-[#8BA3B8] text-xs sm:text-sm font-sans leading-relaxed max-w-lg">
            3+ years shipping enterprise platforms across legal-tech, insurtech, travel-tech, and coworking. Now building the AI layer on top.
          </p>

          {/* Badges/Info Pills Row */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#00FF9D] text-[10px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,157,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
              India Accelerator &bull; Gurugram
            </span>
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#8BA3B8] text-[10px] font-mono px-3 py-1 rounded-full">
              Open to AI/ML Roles
            </span>
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#8BA3B8] text-[10px] font-mono px-3 py-1 rounded-full">
              Remote OK
            </span>
          </div>

          {/* CTAs Group */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#work"
              className="flex items-center gap-2 bg-[#7B2FFF] hover:bg-[#7B2FFF]/80 text-[#F0F4F8] font-mono text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(123,47,255,0.25)] hover:shadow-[0_0_25px_rgba(123,47,255,0.4)]"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            
            <a
              href="#ailab"
              className="flex items-center gap-2 bg-[#0A0F14] border border-[#1A2332] hover:border-[#00D9FF]/40 text-[#00D9FF] font-mono text-xs uppercase px-5 py-3 rounded-xl transition-all"
            >
              <span>AI Lab Demo</span>
              <Eye className="w-3.5 h-3.5" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#8BA3B8] hover:text-[#F0F4F8] transition-colors pl-2"
            >
              <span>Download Resume</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3D Canvas element wrapper - Hidden on Mobile */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Hero3DScene />
      </div>

      {/* Scroll indicator with growing/fading line */}
      <div className="absolute xs:bottom-6 bottom-16 w-full flex flex-col justify-center items-center z-10 pointer-events-none">
        <a href="#about" className="pointer-events-auto flex flex-col items-center gap-1 group">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8BA3B8] group-hover:text-[#00D9FF] transition-colors select-none">
            scroll
          </span>
          <div className="w-[18px] h-[36px] rounded-full border border-[#1A2332] flex justify-center items-start p-1 hover:border-[#00D9FF]/40 transition-colors duration-300">
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 h-1.5 rounded-full bg-[#00D9FF]"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
