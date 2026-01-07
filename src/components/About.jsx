import React, { useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const SERVICE_CONTENT = {
  "Software Developer": {
    description:
      "As a Software Developer, I build end-to-end applications using the MERN stack. I architect databases in MongoDB, write scalable backends in Express & Node.js, and craft polished frontends in React.",
    techStack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  "Frontend Developer": {
    description:
      "Specializing in pixel-perfect, responsive UIs. Elevation through animations and 3D effects.",
    techStack: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
  },
  "Backend Developer": {
    description:
      "Designing RESTful APIs, secure authentication, and managing data models in MongoDB.",
    techStack: ["Node.js", "Express", "MongoDB", "Auth0", "Docker"],
  },
  "Artificial Intelligence": {
    description:
      "Leveraging ML libraries to build smart features like chatbots and recommendation engines.",
    techStack: ["Python", "TensorFlow.js", "OpenAI API", "HuggingFace"],
  },
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;
  const { description, techStack } = SERVICE_CONTENT[service.title] || {
    description: "Details coming soon.",
    techStack: [],
  };

  return createPortal(
    <motion.div
      key="overlay"
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        key="modal"
        className="relative w-full max-w-2xl bg-[#0f1014] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas>
            <Stars radius={100} depth={50} count={2000} factor={4} fade />
          </Canvas>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white z-20 text-xl"
        >
          ✕
        </button>

        <div className="relative z-10 p-8">
          <h2 className="text-3xl font-space-grotesk font-bold text-white mb-4">
            {service.title}
          </h2>
          <p className="text-secondary text-lg leading-relaxed mb-6 font-inter">
            {description}
          </p>

          <h3 className="text-sm font-mono text-accent mb-3 uppercase tracking-wider">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const BentoItem = ({ index, title, icon, onClick, className, children }) => {
  if (children) {
    // For non-clickable content blocks (Overview)
    return (
      <motion.div
        variants={fadeIn("right", "spring", index * 0.2, 0.75)}
        className={`bg-tertiary/40 border border-white/5 p-8 rounded-3xl backdrop-blur-sm shadow-sm ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Tilt
      className={`w-full h-full ${className}`}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.02}
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        className="w-full h-full p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent cursor-pointer group"
        onClick={onClick}
      >
        <div className="bg-tertiary/80 h-full w-full rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl border border-white/5 group-hover:border-accent/30 transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <img
              src={icon}
              alt={title}
              className="w-1/2 h-1/2 object-contain"
            />
          </div>

          <div>
            <h3 className="text-white text-xl font-space-grotesk font-bold group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-xs text-secondary mt-2 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; VIEW_DETAILS
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Bento Layout Configuration
  // Desktop: 3 columns.
  // Item 0 (Overview): col-span-2 row-span-1
  // Item 1 (Service 0): col-span-1
  // Item 2-4 (Services 1-3): col-span-1 each... wait, we have 4 services.
  // Totals: Overview (2 slots) + 4 Services = 6 slots.
  // 3 cols x 2 rows = 6 slots. Perfect.

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        {/* Overview Block (Spans 2 cols) */}
        <BentoItem
          index={0}
          className="md:col-span-2 md:row-span-1 flex flex-col justify-center"
        >
          <p className={`${styles.sectionSubText} text-accent`}>Introduction</p>
          <h2 className={`${styles.sectionHeadText} mb-4`}>Overview.</h2>
          <p className="text-secondary text-[16px] leading-[28px] max-w-3xl font-inter">
            I'm a software developer skilled in{" "}
            <span className="text-white">TypeScript</span> and{" "}
            <span className="text-white">JavaScript</span>, with expertise in{" "}
            <span className="text-white">React, Node.js, and Three.js</span>. I
            collaborate closely with clients to create efficient, scalable, and
            user-friendly solutions. Let's work together to bring your ideas to
            life!
          </p>
        </BentoItem>

        {/* Services */}
        {services.map((service, index) => (
          <BentoItem
            key={service.title}
            index={index + 1}
            title={service.title}
            icon={service.icon}
            onClick={() => setSelectedService(service)}
            className="md:col-span-1"
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(About, "about");
