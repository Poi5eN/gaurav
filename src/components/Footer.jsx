import React from "react";
import { styles } from "../styles";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#020608] border-t border-[#1A2332]">
      <div className={`${styles.paddingX} max-w-7xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
        
        {/* Logo / Brand */}
        <div className="flex flex-col items-center md:items-start font-mono">
          <p className="text-[#F0F4F8] text-[16px] font-bold cursor-pointer">
            Gourav <span className="text-[#00D9FF]">| Poi5eN</span>
          </p>
          <p className="text-[#8BA3B8] text-[11px] mt-1">
            Taking AI ideas from model &rarr; product &rarr; production.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-[#8BA3B8] font-mono text-[11px] text-center">
          &copy; {new Date().getFullYear()} Gourav. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <SocialIcon href="https://www.linkedin.com/in/gourav-kumar-upadhyay-0731b41b4" icon={<FaLinkedin />} />
          <SocialIcon href="https://github.com/Poi5eN" icon={<FaGithub />} />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-xl bg-[#0A0F14] border border-[#1A2332] flex justify-center items-center text-[#8BA3B8] text-[18px] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/5 hover:scale-105 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
