import React, { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  const consoleLogs = [
    { text: "> initializing gaurav.dev...", delay: 100 },
    { text: "> loading neural networks............ [OK]", delay: 400 },
    { text: "> mounting systems.................... [OK]", delay: 700 },
    { text: "> calibrating intelligence............ [OK]", delay: 1000 },
    { text: "> ready.", delay: 1300 },
  ];

  useEffect(() => {
    // Typing lines sequence
    consoleLogs.forEach((log) => {
      setTimeout(() => {
        setLines((prev) => [...prev, log.text]);
      }, log.delay);
    });

    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    // Fade out and finish preloader
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020608] z-[99999] flex flex-col justify-center items-center font-mono p-6">
      <div className="max-w-md w-full">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#1A2332]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[#8BA3B8] text-xs ml-2">neural_terminal_boot.sh</span>
        </div>

        {/* Lines */}
        <div className="space-y-2 text-sm md:text-base min-h-[140px] text-left">
          {lines.map((line, idx) => (
            <div key={idx} className={line.includes("ready") ? "text-[#00FF9D] font-bold" : "text-[#F0F4F8]"}>
              {line}
            </div>
          ))}
        </div>

        {/* Progress Bar Container */}
        <div className="mt-8">
          <div className="flex justify-between text-xs text-[#8BA3B8] mb-1">
            <span>BOOTING SYSTEM</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-[#0A0F14] border border-[#1A2332] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] h-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
