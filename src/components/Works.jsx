import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink, IconTrophy, IconLayersIntersect } from "@tabler/icons-react";

import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { ProjectMedia } from "./ProjectMedia";
import { ArchitectureModal } from "./ArchitectureModal";

const ProjectCard = ({
  index,
  id,
  flagship,
  tag,
  tagColor,
  category,
  icon,
  name,
  pitch,
  description,
  problem,
  approach,
  impact,
  videoUrl,
  imageUrl,
  metrics,
  tags,
  source_code_link,
  live_url,
  architectureModal,
  onOpenArchitecture,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className={`${flagship ? "w-full" : "w-full sm:w-[370px]"}`}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#00D9FF"
        glarePosition="all"
        glareBorderRadius="16px"
        tiltMaxAngleX={flagship ? 5 : 12}
        tiltMaxAngleY={flagship ? 5 : 12}
        scale={1.01}
        transitionSpeed={400}
        className={`relative flex flex-col justify-between h-full bg-[#0A0F14] border ${
          flagship ? "border-[#00D9FF]/40 bg-gradient-to-br from-[#0A0F14] via-[#0A0F14] to-[#0D1520]/80 shadow-[0_15px_40px_rgba(0,217,255,0.06)]" : "border-[#1A2332]"
        } p-6 rounded-2xl hover:border-[#00D9FF]/40 transition-all duration-300 group`}
      >
        {/* Glow Top Border for Flagship */}
        {flagship && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent" />
        )}

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${tagColor}30`,
                color: tagColor,
                backgroundColor: `${tagColor}10`,
              }}
            >
              {flagship && <span className="mr-1">🏆</span>}
              {tag}
            </span>
            <span className="text-lg" title={category}>
              {icon}
            </span>
          </div>

          {/* Media Player */}
          <div className="mb-5 rounded-xl overflow-hidden border border-[#1A2332]">
            <ProjectMedia
              videoUrl={videoUrl}
              imageUrl={imageUrl}
              projectTitle={name}
            />
          </div>

          {/* Title and Pitch */}
          <div className="space-y-1.5">
            <h3 className="text-[#F0F4F8] font-display font-bold text-xl md:text-2xl flex items-center gap-2">
              {name}
            </h3>
            <p className="text-[#00D9FF] font-mono text-[11px] font-semibold">
              {pitch}
            </p>
            <p className="text-[#8BA3B8] text-[13px] leading-relaxed mt-2">
              {description}
            </p>
          </div>

          {/* Key Metrics Badges */}
          {metrics && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {metrics.map((metric, i) => (
                <span
                  key={i}
                  className="text-[9px] font-mono text-[#F0F4F8] bg-[#020608] border border-[#1A2332] px-2 py-0.5 rounded"
                >
                  {metric}
                </span>
              ))}
            </div>
          )}

          {/* Detailed Case Study */}
          <div className="bg-[#020608]/60 p-4 rounded-xl border border-[#1A2332]/60 space-y-2 font-mono text-[10px] text-[#8BA3B8] mt-5">
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

        {/* Stack and Action Footer */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[10px] font-mono text-[#8BA3B8] bg-[#0A0F14] px-2 py-0.5 rounded border border-[#1A2332]`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#1A2332] gap-3">
            <div className="flex items-center gap-2">
              {live_url && (
                <a
                  href={live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 border border-[#00D9FF]/30 hover:border-[#00D9FF] text-[#00D9FF] text-xs font-mono rounded-lg transition-all"
                >
                  <IconExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0F14] hover:bg-[#1A2332] border border-[#1A2332] hover:border-[#8BA3B8] text-[#8BA3B8] hover:text-[#F0F4F8] text-xs font-mono rounded-lg transition-all"
                >
                  <IconBrandGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {architectureModal && (
              <button
                onClick={onOpenArchitecture}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7B2FFF]/10 hover:bg-[#7B2FFF]/20 border border-[#7B2FFF]/30 hover:border-[#7B2FFF] text-[#7B2FFF] text-xs font-mono rounded-lg transition-all"
              >
                <IconLayersIntersect className="w-3.5 h-3.5" />
                <span>Deep-Dive</span>
              </button>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

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
          <ProjectCard
            key={`project-${index}`}
            index={index}
            onOpenArchitecture={() => setIsArchitectureOpen(true)}
            {...project}
          />
        ))}
      </div>

      {isArchitectureOpen && (
        <ArchitectureModal onClose={() => setIsArchitectureOpen(false)} />
      )}
    </div>
  );
};

export default SectionWrapper(Works, "work");
