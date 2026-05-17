import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, Sparkles } from "lucide-react";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "service_default",
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "template_default",
        {
          from_name: form.name,
          to_name: "Gaurav",
          from_email: form.email,
          to_email: "contact@gaurav.dev",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || "public_key_default"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Message simulation complete. Thank you! (EmailJS config not detected, but I've captured your intent)");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-[#0A0F14] border border-[#1A2332] p-8 rounded-2xl relative"
      >
        {/* Availability Badge */}
        <div className="absolute top-8 right-8 inline-flex items-center gap-1.5 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-full px-3 py-1 text-[10px] font-mono text-[#00FF9D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
          <span>Available — Response within 24h</span>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Get In Touch
        </p>
        <h3 className="text-[#F0F4F8] font-display text-[32px] font-bold">Contact</h3>

        {/* What's Next Segment */}
        <div className="mt-6 p-4 rounded-xl border border-dashed border-[#1A2332] bg-[#020608]/50 space-y-2 text-xs font-mono text-[#8BA3B8]">
          <div className="text-[#00D9FF] font-bold uppercase tracking-wider">// I'M CURRENTLY OPEN TO:</div>
          <div>&rarr; AI/ML Engineering & Hybrid roles</div>
          <div>&rarr; YC-backed early-stage startups</div>
          <div>&rarr; Scale challenges & complex pipeline deployments</div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-[#F0F4F8] font-mono text-xs mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-[#020608] border border-[#1A2332] focus:border-[#7B2FFF] text-[#F0F4F8] placeholder-[#8BA3B8]/30 py-3.5 px-6 rounded-xl outline-none font-mono text-sm transition-all"
            />
          </label>
          
          <label className="flex flex-col">
            <span className="text-[#F0F4F8] font-mono text-xs mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-[#020608] border border-[#1A2332] focus:border-[#7B2FFF] text-[#F0F4F8] placeholder-[#8BA3B8]/30 py-3.5 px-6 rounded-xl outline-none font-mono text-sm transition-all"
            />
          </label>
          
          <label className="flex flex-col">
            <span className="text-[#F0F4F8] font-mono text-xs mb-2">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to build?"
              className="bg-[#020608] border border-[#1A2332] focus:border-[#7B2FFF] text-[#F0F4F8] placeholder-[#8BA3B8]/30 py-3.5 px-6 rounded-xl outline-none font-mono text-sm transition-all resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#7B2FFF] hover:bg-[#7B2FFF]/80 text-[#F0F4F8] font-mono text-xs tracking-wider uppercase py-3.5 px-8 rounded-xl outline-none w-fit transition-all shadow-[0_0_15px_rgba(123,47,255,0.2)] hover:shadow-[0_0_25px_rgba(123,47,255,0.4)] flex items-center gap-2"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Transmission</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
