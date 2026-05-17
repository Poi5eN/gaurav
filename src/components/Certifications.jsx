import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { IconExternalLink } from "@tabler/icons-react";
import { fadeIn, textVariant } from "../utils/motion";

// Custom SVG Brand Icons
const FreeCodeCampIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
  </svg>
);

const KaggleIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 21.2h-3.3L9.6 15.3l-2.4 2.4v3.5H3.8V2.7h3.4v10.6l7.9-8h4l-8.5 8.4 8.2 9.5z" />
  </svg>
);

const ScrimbaIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 7.5 22 16.5 12 22 2 16.5 2 7.5" />
    <polygon points="10 8 16 12 10 16" fill="currentColor" />
  </svg>
);

const Certifications = () => {
  const certifications = [
    {
      title: "Software Engineering Certification",
      issuer: "FreeCodeCamp",
      url: "https://freecodecamp.org/certification/poi5en/responsive-web-design",
      icon: <FreeCodeCampIcon />,
      brandColor: "#0A5A30", // Forest Green
      lightColor: "#00FF9D"
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      url: "https://www.kaggle.com/learn/certification/poi5en/intro-to-machine-learning",
      icon: <KaggleIcon />,
      brandColor: "#20BEFF", // Kaggle Blue
      lightColor: "#00D9FF"
    },
    {
      title: "The AI Engineer Path",
      issuer: "Scrimba",
      url: "https://scrimba.com/@Poi5eN:certs;cert24zAwJ77fGRrQpDhLX2CWRiqLcRZxWwi6Jn34",
      icon: <ScrimbaIcon />,
      brandColor: "#2DF3F0", // Scrimba Cyan
      lightColor: "#7B2FFF"
    },
  ];

  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Verified Credentials
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Certifications
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mt-4 rounded-full" />
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {certifications.map((cert, idx) => {
          const [isHovered, setIsHovered] = useState(false);

          return (
            <motion.div
              key={idx}
              variants={fadeIn("up", "spring", idx * 0.2, 0.75)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                borderColor: isHovered ? cert.brandColor : "rgba(26, 35, 50, 0.6)",
                boxShadow: isHovered ? `0 10px 30px ${cert.brandColor}15` : "none"
              }}
              className="glassmorphism p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 group cursor-pointer h-full"
              onClick={() => window.open(cert.url, "_blank")}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div 
                    style={{
                      color: isHovered ? cert.brandColor : "#8BA3B8",
                      borderColor: isHovered ? cert.brandColor : "#1A2332",
                      backgroundColor: isHovered ? `${cert.brandColor}15` : "#0A0F14"
                    }}
                    className="p-3 rounded-xl border group-hover:scale-110 transition-all duration-300"
                  >
                    {cert.icon}
                  </div>
                  <IconExternalLink 
                    style={{
                      color: isHovered ? cert.brandColor : "#8BA3B8"
                    }}
                    className="transition-colors duration-300 w-5 h-5" 
                  />
                </div>
                
                <h3 
                  style={{
                    color: isHovered ? cert.brandColor : "#F0F4F8"
                  }}
                  className="text-xl font-bold font-display mb-2 transition-colors duration-300"
                >
                  {cert.title}
                </h3>
                <p className="text-sm font-mono text-[#8BA3B8]">
                  {cert.issuer}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#1A2332]/50">
                <span 
                  style={{
                    color: isHovered ? cert.brandColor : "#8BA3B8"
                  }}
                  className="text-[10px] font-mono tracking-wider uppercase flex items-center gap-2 transition-colors duration-300"
                >
                  <span 
                    style={{
                      backgroundColor: isHovered ? cert.brandColor : "#00FF9D"
                    }}
                    className="w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-300" 
                  />
                  Verified Credential
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Certifications, "certifications");
