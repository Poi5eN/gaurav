import React from "react";
import { styles } from "../styles";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='relative z-10 bg-primary dark:bg-dark-primary border-t border-t-[#1f1f3a] dark:border-t-gray-700'>
      <div className={`${styles.paddingX} max-w-7xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
        
        {/* Logo / Brand */}
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-white dark:text-dark-text text-[18px] font-bold cursor-pointer flex'>
            Gaurav &nbsp;
            <span className='sm:block hidden'>| Poi5eN</span>
          </p>
          <p className='text-secondary dark:text-dark-secondary text-[14px] mt-1'>
            Building the future, one pixel at a time.
          </p>
        </div>

        {/* Copyright */}
        <div className='text-secondary dark:text-dark-secondary text-[14px] text-center'>
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>

        {/* Social Icons */}
        <div className='flex gap-4'>
          <SocialIcon href="https://twitter.com" icon={<FaTwitter />} />
          <SocialIcon href="https://linkedin.com" icon={<FaLinkedin />} />
          <SocialIcon href="https://github.com" icon={<FaGithub />} />
          <SocialIcon href="https://instagram.com" icon={<FaInstagram />} />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='w-10 h-10 rounded-full bg-tertiary dark:bg-dark-tertiary flex justify-center items-center text-white dark:text-dark-text text-[20px] hover:text-[#915eff] dark:hover:text-[#915eff] hover:scale-110 transition-all duration-300 shadow-card'
  >
    {icon}
  </a>
);

export default Footer;
