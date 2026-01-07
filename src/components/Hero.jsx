import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { ThemeContext } from "../ThemeContext";

const Hero = ({ onOpenTerminal, isTerminalOpen }) => {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  // Inverted Logic: theme='dark' => .dark class => Light UI Mode
  // So for 'dark' theme (Light UI), we want darker text colors
  const colors =
    theme === "dark"
      ? [
          "#9d29b0", // Darker Pink
          "#4a1a9e", // Darker Purple
          "#265c9e", // Darker Blue
          "#a83a42", // Darker Red
          "#8a8435", // Darker Yellow
          "#1f7a2b", // Darker Green
        ]
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
    }, 5000); // Increased time to ensure reading and animation completion

    return () => clearInterval(interval);
  }, []);

  const currentColor = colors[index % colors.length];
  const currentText = texts[index];

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className="text-[#915EFF]">Gaurav</span>
          </h1>
          <div
            className={`${styles.heroSubText} mt-2 h-[100px] overflow-hidden`}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03, // Speed of typing
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -10,
                    transition: { duration: 0.3 },
                  },
                }}
                style={{ color: currentColor }}
              >
                {currentText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -5 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ComputersCanvas
        onOpenTerminal={onOpenTerminal}
        isTerminalOpen={isTerminalOpen}
      />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
