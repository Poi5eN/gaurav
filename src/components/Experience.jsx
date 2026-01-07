import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <div
      className={`flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center justify-between w-full mb-10`}
    >
      {/* Card Content */}
      <motion.div
        variants={fadeIn(
          index % 2 === 0 ? "right" : "left",
          "spring",
          0.5 * index,
          0.75
        )}
        className="w-full lg:w-[45%] bg-[#1d1836]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-accent/50 transition-all duration-300 shadow-xl z-10"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-[24px] font-bold font-outfit">
            {experience.title}
          </h3>
          <p
            className="text-accent text-[16px] font-semibold font-mono"
            style={{ margin: 0 }}
          >
            {experience.company_name}
          </p>
          <p className="text-gray-400 text-[12px] font-mono mt-1">
            {experience.date}
          </p>
        </div>

        <ul className="mt-5 list-none ml-5 space-y-2 border-l border-white/10 pl-4">
          {experience.points.map((point, i) => (
            <li
              key={`experience-point-${i}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider relative before:content-['>'] before:absolute before:-left-6 before:text-accent font-light"
            >
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Timeline Node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-accent/30 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(145,94,255,0.3)]">
          <div className="w-full h-full rounded-full overflow-hidden p-1">
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Placeholder for layout balance on other side */}
      <div className="w-full lg:w-[45%] hidden lg:block"></div>
    </div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`${styles.sectionSubText} text-center font-mono text-accent`}
        >
          // CAREER_LOG
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="relative mt-20 flex flex-col items-center">
        {/* Central Data Stream Line */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30 transform lg:-translate-x-1/2 h-full z-0"></div>

        <div className="flex flex-col w-full">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
