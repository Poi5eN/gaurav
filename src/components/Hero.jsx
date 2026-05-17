import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Compass, ShieldAlert } from "lucide-react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = ({ onOpenTerminal, isTerminalOpen }) => {
  const [index, setIndex] = useState(0);

  const texts = [
    "From production React apps to LLM pipelines.",
    "Currently obsessed with agentic AI systems.",
    "Building things that think, adapt, and scale.",
    "Taking AI ideas from model → product → production.",
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
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FFF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/3 rounded-full blur-[120px] pointer-events-none" />

      <div
        className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        {/* Neon Indicator Pillar */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-4 h-4 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF]" />
          <div className="w-0.5 sm:h-80 h-40 bg-gradient-to-b from-[#00D9FF] via-[#7B2FFF] to-transparent" />
        </div>

        {/* Text Area */}
        <div className="space-y-4 max-w-2xl">
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 bg-[#0A0F14] border border-[#1A2332] rounded-full px-3 py-1 text-[10px] font-mono tracking-wider text-[#8BA3B8]">
            <Sparkles className="text-[#00D9FF] w-3.5 h-3.5 animate-spin-slow" />
            <span>FULL STACK &bull; AI/ML SYSTEMS ENGINEER</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#F0F4F8] leading-[1.1]">
            I build <span className="bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] bg-clip-text text-transparent">intelligent</span> systems.
          </h1>

          {/* Dynamic Typist Subtitle */}
          <div className="h-[60px] overflow-hidden">
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

          {/* Badges/Info Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#00FF9D] text-[10px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,157,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
              Available for Opportunities
            </span>
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#8BA3B8] text-[10px] font-mono px-3 py-1 rounded-full">
              📍 Based in India
            </span>
            <span className="bg-[#0A0F14] border border-[#1A2332] text-[#8BA3B8] text-[10px] font-mono px-3 py-1 rounded-full">
              ✈️ Remote OK
            </span>
          </div>
        </div>
      </div>

      {/* 3D Canvas element wrapper */}
      <div className="absolute inset-0 z-0">
        <ComputersCanvas
          onOpenTerminal={onOpenTerminal}
          isTerminalOpen={isTerminalOpen}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-6 bottom-16 w-full flex justify-center items-center z-10 pointer-events-none">
        <a href="#about" className="pointer-events-auto">
          <div className="w-[30px] h-[55px] rounded-3xl border-2 border-[#1A2332] flex justify-center items-start p-1.5 hover:border-[#00D9FF]/50 transition-colors duration-300">
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
