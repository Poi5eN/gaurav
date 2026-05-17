import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  problem,
  approach,
  impact,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 450,
        }}
        className="bg-[#0A0F14] border border-[#1A2332] p-5 rounded-2xl sm:w-[360px] w-full hover:border-[#00D9FF]/40 transition-colors duration-300"
      >
        <div className="relative w-full h-[200px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-[#020608] hover:bg-[#7B2FFF]/20 border border-[#1A2332] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all"
            >
              <FaGithub className="text-[#F0F4F8] w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <h3 className="text-[#F0F4F8] font-display font-bold text-[22px]">{name}</h3>
          <p className="text-[#8BA3B8] text-[13px] leading-relaxed">{description}</p>
          
          {/* Case Study Grid */}
          <div className="bg-[#020608] p-4 rounded-xl border border-[#1A2332] space-y-2 font-mono text-[10px] text-[#8BA3B8]">
            <div>
              <span className="text-[#FF6B35] font-bold">PROBLEM &rarr;</span> {problem}
            </div>
            <div>
              <span className="text-[#00D9FF] font-bold">APPROACH &rarr;</span> {approach}
            </div>
            <div>
              <span className="text-[#00FF9D] font-bold">IMPACT &rarr;</span> {impact}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[11px] font-mono ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Selected Systems
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Case Studies
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mt-4 rounded-full" />
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 text-[#8BA3B8] text-[15px] max-w-3xl leading-[26px] font-sans"
        >
          Each project below represents a systematic deep-dive case study. I don't just focus on code structure; I detail the exact business problems, architectural approaches, and quantified production impact metrics of each system.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-wrap gap-8 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "work");
