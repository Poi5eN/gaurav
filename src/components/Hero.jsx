import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";

import { styles } from "../styles";
import { ArchitectCanvas, ArchitectUI } from "./canvas";
import { ThemeContext } from "../ThemeContext";

const Hero = ({ onOpenTerminal, isTerminalOpen }) => {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("chaos"); // State for The Architect

  // Inverted Logic: theme='dark' => .dark class => Light UI Mode
  const colors =
    theme === "dark"
      ? ["#9d29b0", "#4a1a9e", "#265c9e", "#a83a42", "#8a8435", "#1f7a2b"]
      : ["#eb4cde", "#6826e5", "#a2cbff", "#d9757e", "#c6bf7e", "#54bf62"];

  const texts = [
    "Engineer. Founder. Polyglot. Always learning.",
    "I build intelligent systems—and the companies around them.",
    "Code, data, languages, startups—this is my playground.",
    "Full-stack thinker. Machine-learning builder. Startup driver.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      {/* Background: Unified Architect Canvas (Background + Right Model) */}
      <div className="absolute inset-0 z-0">
        <ArchitectCanvas mode={mode} />
      </div>

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} z-10 pointer-events-none`}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center h-full pointer-events-auto pb-40">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className={`${styles.heroHeadText} font-black text-white lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[90px] mt-2`}
            >
              ARCHITECTING <br className="sm:block hidden" />
              <span className="text-accent">INTELLIGENCE</span>
            </h1>
            <p className={`${styles.heroSubText} mt-4 text-white-100 max-w-lg`}>
              Specialized in Neural Networks, Deep Learning,{" "}
              <br className="sm:block hidden" />
              and Full-Stack AI Solutions.
            </p>

            {/* CTA Button or Status */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-mono text-gray-300">
                  SYSTEM ONLINE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction UI (Canvas content is handled by ArchitectCanvas) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block w-full h-full max-h-[400px]"
          >
            <div className="relative w-full h-full flex flex-col justify-end">
              <ArchitectUI mode={mode} setMode={setMode} />

              {/* Caption */}
              <p className="text-right text-[10px] text-gray-500 font-mono mt-2 uppercase tracking-widest">
                Sentient_Core_v3 // AWAITING_DIRECTIVES
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20 pointer-events-none">
        <a href="#about" className="pointer-events-auto">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/20 dark:border-black/10 flex justify-center items-start p-2 backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-accent mb-1 shadow-[0_0_10px_#00ff88]"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
