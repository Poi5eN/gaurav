import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.3, 0.75)}
    className="bg-[#0A0F14] border border-[#1A2332] p-8 rounded-2xl xs:w-[340px] w-full flex flex-col justify-between hover:border-[#7B2FFF]/30 transition-colors duration-300 relative overflow-hidden"
  >
    {/* Subtle Background Glow */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#7B2FFF]/5 rounded-full blur-2xl pointer-events-none" />

    <Quote className="text-[#00D9FF] w-8 h-8 opacity-40 mb-4" />

    <div className="flex-1 flex flex-col justify-between">
      <p className="text-[#8BA3B8] leading-relaxed text-[14px] font-sans italic">
        "{testimonial}"
      </p>

      <div className="mt-8 flex items-center gap-4 border-t border-[#1A2332]/50 pt-4">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-[#1A2332]"
        />
        
        <div className="flex flex-col">
          <span className="text-[#F0F4F8] font-display font-bold text-[14px]">
            {name}
          </span>
          <span className="text-[#8BA3B8] font-mono text-[10px] uppercase mt-0.5">
            {designation}, {company}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Industry Validation
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Client Endorsements
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Grid */}
      <div className="flex flex-wrap gap-8 justify-center max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "endorsements");
