import React, { useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn } from "react-icons/fi"; // import your icon of choice
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

/**
 * A lookup that maps each service title to its own description + tech‐stack.
 */
const SERVICE_CONTENT = {
  "Software Developer": {
    description:
      "As a Software Developer, I build end-to-end applications using the MERN stack. I architect databases in MongoDB, write scalable backends in Express & Node.js, and craft polished frontends in React.",
    techStack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "Git & GitHub",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
  },
  "Frontend Developer": {
    description:
      "As a Frontend Developer, I specialize in creating pixel-perfect, responsive UIs in React. I elevate user experiences with animations (Framer Motion) and 3D effects (Three.js).",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Parallax Tilt",
      "Webpack / Vite",
      "Responsive Design",
      "Git & GitHub",
    ],
  },
  "Backend Developer": {
    description:
      "As a Backend Developer, I design RESTful APIs in Express.js and Node.js, manage data models in MongoDB, and ensure secure authentication & validation layers. I deploy & monitor on modern cloud platforms.",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "REST APIs",
      "Postman / Insomnia",
      "Docker (basic)",
      "Git & GitHub",
      "Cloud Deployment (Heroku/AWS)",
    ],
  },
  "Artificial Intelligence": {
    description:
      "In the AI realm, I leverage JavaScript/Node.js–based ML libraries and integrate AI models to build smart features—everything from chatbots to recommendation engines. I’m also exploring TensorFlow.js for browser‐based ML.",
    techStack: [
      "TensorFlow.js",
      "Brain.js",
      "Node.js",
      "Python (for prototyping)",
      "RESTful Integration",
      "Data Preprocessing",
      "Model Deployment",
      "Git & GitHub",
      "Docker (AI workflows)",
    ],
  },
};

/**
 * The modal’s inner content. Renders only when `service` is non-null.
 */
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const { description, techStack } = SERVICE_CONTENT[service.title] || {
    description: "No description available.",
    techStack: [],
  };

  return createPortal(
    <motion.div
      key="overlay"
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal Container */}
      <motion.div
        key="modal"
        className="relative w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] max-w-3xl min-h-[50vh] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Galaxy Background Wrapper */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
            />
          </Canvas>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="relative z-10 bg-gray-900/80 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl h-full overflow-y-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient-gold mb-4">
            {service.title}
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-amber-400 to-pink-500 mb-6" />
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            {description}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Tech Stack:
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-gradient-to-tr from-amber-500 to-pink-500 text-black text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shadow-sm"
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

const ServiceCard = ({ index, title, icon, onClick }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer group"
      onClick={onClick}
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="relative bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col overflow-hidden"
      >
        {/* Rotating background */}
        <motion.div
          className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          style={{ transformOrigin: "50% 50%" }}
        />

        <img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain relative z-10"
        />

        <h3 className="text-white text-[20px] font-bold text-center relative z-10">
          {title}
        </h3>

        {/* Hover text */}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-60 transition-opacity duration-300 select-none pointer-events-none">
          Click to learn more →
        </span>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      {/* Intro */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      {/* Cards */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            title={service.title}
            icon={service.icon}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* Modal */}
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
