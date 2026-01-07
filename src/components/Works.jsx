import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 450,
          glare: true,
          "max-glare": 0.5,
        }}
        className="bg-[#100d25] p-5 rounded-2xl sm:w-[360px] w-full border border-white/10 hover:border-accent/50 transition-all duration-300 shadow-2xl relative group overflow-hidden"
      >
        {/* Holographic Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

        <div className="relative w-full h-[230px] z-10">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-white/10 hover:border-accent hover:bg-black transition-all"
              title="View Source Code"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 relative z-10">
          <h3 className="text-white font-bold text-[24px] font-outfit tracking-wide">
            {name}
          </h3>
          <p className="mt-2 text-gray-400 text-[14px] leading-relaxed font-mono">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 relative z-10">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/5 ${tag.color}`}
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
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-mono text-accent`}>
          // DEPLOYED_SYSTEMS
        </p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A selection of technical implementations demonstrating Full-Stack and
          AI capabilities. Each project represents a specific problem space and
          solution architecture.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
