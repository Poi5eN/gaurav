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
        <h3 className="text-[#F0F4F8] font-display text-[22px] font-bold">{experience.title}</h3>
        <p
          className="text-[#00D9FF] font-mono text-[14px]"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2.5">
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

      <div className="mt-20 flex flex-col">
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

export default SectionWrapper(Experience, "experience");
