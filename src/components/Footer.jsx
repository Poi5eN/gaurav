import React from "react";
import { styles } from "../styles";
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconBrandReddit } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#020608] border-t border-[#1A2332]">
      <div className={`${styles.paddingX} max-w-7xl mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-6`}>
        
        {/* Logo / Brand */}
        <div className="flex flex-col items-center md:items-start font-mono">
          <p className="text-[#F0F4F8] text-[16px] font-bold">
            Gourav <span className="text-[#00D9FF]">| Poi5eN</span>
          </p>
          <p className="text-[#8BA3B8] text-[11px] mt-1">
            Taking AI ideas from model &rarr; product &rarr; production.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-[#8BA3B8] font-mono text-[11px] text-center flex flex-col gap-1">
          <span>&copy; {new Date().getFullYear()} Gourav. All rights reserved.</span>
          <span className="text-[#00FF9D]/60 text-[9px] animate-pulse">// secure terminal active // SSL connected</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          <SocialIcon 
            href="https://www.linkedin.com/in/gourav-kumar-upadhyay-0731b41b4" 
            icon={<IconBrandLinkedin className="w-5 h-5" />} 
            hoverColor="#0077B5"
          />
          <SocialIcon 
            href="https://github.com/Poi5eN" 
            icon={<IconBrandGithub className="w-5 h-5" />} 
            hoverColor="#F0F4F8"
          />
          <SocialIcon 
            href="https://x.com" // Placeholder
            icon={<IconBrandTwitter className="w-5 h-5" />} 
            hoverColor="#1DA1F2"
          />
          <SocialIcon 
            href="https://reddit.com" // Placeholder
            icon={<IconBrandReddit className="w-5 h-5" />} 
            hoverColor="#FF4500"
          />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, hoverColor }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? hoverColor : "#1A2332",
        color: isHovered ? hoverColor : "#8BA3B8",
        backgroundColor: isHovered ? `${hoverColor}10` : "#0A0F14"
      }}
      className="w-10 h-10 rounded-xl border flex justify-center items-center hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {icon}
    </a>
  );
};

export default Footer;
