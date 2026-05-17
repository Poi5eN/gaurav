import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#0A0F14",
        color: "#F0F4F8",
        border: "1px solid #1A2332",
        boxShadow: "none",
        borderRadius: "16px"
      }}
      contentArrowStyle={{ borderRight: "7px solid #1A2332" }}
      date={experience.date}
      dateClassName="text-[#8BA3B8] font-mono text-sm"
      iconStyle={{ background: experience.iconBg, border: "2px solid #1A2332", boxShadow: "none" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[#F0F4F8] font-display text-[20px] font-bold">{experience.title}</h3>
          
          {/* Pulsing Currently Here badge */}
          {experience.current && (
            <span className="flex items-center gap-1.5 bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
              Currently Here
            </span>
          )}
        </div>

        <p
          className="text-[#00D9FF] font-mono text-[13px] flex items-center flex-wrap"
          style={{ margin: 0 }}
        >
          <span>{experience.company_name}</span>
          {experience.location && (
            <span className="text-gray-500 text-xs ml-2 font-normal">
              &bull; {experience.location}
            </span>
          )}
        </p>

        {/* Impact Badge */}
        {experience.impact && (
          <div className="mt-2">
            <span className="inline-block bg-[#7B2FFF]/10 text-[#7B2FFF] border border-[#7B2FFF]/30 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold">
              Impact: {experience.impact}
            </span>
          </div>
        )}
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-[#8BA3B8] text-[13px] pl-1 leading-relaxed font-sans"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] text-center mb-2">
          // Career Blueprint
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8] text-center">
          Work History
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="mt-20 flex flex-col px-4">
        {/* Timeline connector line styled */}
        <VerticalTimeline lineColor="#1A2332">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

const ExperienceSection = SectionWrapper(Experience, "experience");
export default ExperienceSection;
