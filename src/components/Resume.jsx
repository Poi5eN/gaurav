import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import {
  IconFileText,
  IconDownload,
  IconBriefcase,
  IconSchool,
  IconAward,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Resume = () => {
  const experiences = [
    {
      role: "Full Stack Developer",
      company: "India Accelerator",
      period: "Jul 2025 - Present",
      bullets: [
        "Architected enterprise platforms including vehicle claim management, legal-tech APIs, and coworking automation using NestJS, Next.js, PostgreSQL, Redis, GCP, TurboRepo monorepo, and AI integrations.",
        "Integrated OpenAI Vision API into real-time image verification pipelines for AI-powered damage detection, reducing manual claim assessment time by ~40%.",
        "Built and deployed approval engines, operational automations, and WiFi access provisioning systems, improving platform workflow efficiency across enterprise clients.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "DoubleKlick Designs",
      period: "Dec 2024 - Jul 2025",
      bullets: [
        "Developed scalable full-stack applications using Next.js, NestJS, Prisma ORM, MongoDB, and AWS, delivering production-grade REST APIs with authentication flows.",
        "Unified 5+ challan provider APIs into a single optimized gateway using Redis caching, slashing response time from 10+ minutes to under 3 seconds serving 10K+ monthly requests.",
        "Implemented CI/CD pipelines and AWS deployments (EC2, S3, Lambda), reducing production deployment errors by 25%.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Corplyx Technologies Pvt. Ltd.",
      period: "Jun 2023 - Nov 2024",
      bullets: [
        "Led scalable web application development, streamlining backend query performance and frontend bundle sizes to achieve 30% reduction in page load times.",
        "Built React.js interfaces with Redux state management and Node.js/Express.js backends with MongoDB for high-throughput data workflows.",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8BA3B8] mb-2">
          // Professional Credentials
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F0F4F8]">
          Resume & Timeline
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Buttons Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-[#0A0F14] border border-[#1A2332] p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <IconFileText className="text-[#00D9FF] w-5 h-5" />
            <span className="font-mono text-xs sm:text-sm text-[#8BA3B8]">FORMAT: INTERACTIVE_HTML_RESUME</span>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#7B2FFF] hover:bg-[#7B2FFF]/80 text-[#F0F4F8] font-mono text-xs px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(123,47,255,0.2)] cursor-pointer"
          >
            <IconDownload className="w-4 h-4" />
            <span>VIEW / DOWNLOAD PDF RESUME</span>
          </a>
        </div>

        {/* The Paper Sheet Mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0A0F14] border border-[#1A2332] rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-left"
        >
          {/* Subtle glowing lines on mock sheet */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D9FF] via-[#7B2FFF] to-[#00FF9D]" />

          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-[#1A2332] pb-8 mb-8 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F0F4F8]">Gourav Kumar Upadhyay</h3>
              <p className="font-mono text-xs sm:text-sm text-[#00D9FF] mt-1">Full Stack Developer &times; AI Engineer</p>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#8BA3B8] space-y-1.5 text-left sm:text-right w-full sm:w-auto">
              <div className="flex sm:justify-end items-center gap-1.5">
                <IconMapPin className="w-3.5 h-3.5 text-[#00D9FF]" /> New Delhi, India &bull; Remote OK
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <IconMail className="w-3.5 h-3.5 text-[#00D9FF]" /> gaurav.upadhyay.vasudeva@gmail.com
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <IconPhone className="w-3.5 h-3.5 text-[#00D9FF]" /> +91 8920377548
              </div>
              <div className="flex sm:justify-end items-center gap-2 pt-1">
                <a href="https://github.com/Poi5eN" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F4F8]">
                  <IconBrandGithub className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/gourav-kumar-upadhyay-0731b41b4" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F4F8]">
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
              <IconBriefcase className="text-[#7B2FFF] w-4 h-4" />
              <span>EXPERIENCE TIMELINE</span>
            </h4>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row justify-between font-mono text-xs sm:text-sm mb-2 gap-1">
                    <span className="text-[#F0F4F8] font-bold">{exp.role}</span>
                    <span className="text-[#8BA3B8]">{exp.company} | {exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#8BA3B8] leading-relaxed">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="pl-1">
                        <span className="relative -left-1 text-[#8BA3B8]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
                <IconSchool className="text-[#FF6B35] w-4 h-4" />
                <span>EDUCATION</span>
              </h4>
              <div className="font-mono text-xs text-[#8BA3B8] space-y-3">
                <div>
                  <div className="font-bold text-[#F0F4F8]">Master of Computer Applications (MCA)</div>
                  <div className="text-[11px]">Indira Gandhi National Open University (IGNOU)</div>
                </div>
                <div>
                  <div className="font-bold text-[#F0F4F8]">Bachelor of Computer Applications (BCA)</div>
                  <div className="text-[11px]">Indira Gandhi National Open University (IGNOU)</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-md font-mono text-[#F0F4F8] border-b border-[#1A2332]/50 pb-2 mb-4">
                <IconAward className="text-[#00FF9D] w-4 h-4" />
                <span>EXPERTISE SPECTRUM</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "NestJS", "React.js", "Node.js", "PostgreSQL", "Redis", "TypeScript", "Python", "RAG", "LangChain", "OpenAI API", "Docker"].map((tok) => (
                  <span
                    key={tok}
                    className="bg-[#020608] border border-[#1A2332] text-[#8BA3B8] text-[9px] font-mono px-2 py-0.5 rounded hover:border-[#00D9FF]/30 transition-all"
                  >
                    {tok}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ResumeSection = SectionWrapper(Resume, "resume");
export default ResumeSection;
