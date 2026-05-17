import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Zap, Cpu, Award, Hourglass } from "lucide-react";

const StatsBar = () => {
  const stats = [
    { value: "3+ Years", label: "Production Experience", icon: <Calendar className="w-4 h-4 text-[#00D9FF]" /> },
    { value: "7+", label: "Live Products Shipped", icon: <Briefcase className="w-4 h-4 text-[#7B2FFF]" /> },
    { value: "10K+", label: "Daily Requests", icon: <Zap className="w-4 h-4 text-[#FF6B35]" /> },
    { value: "4", label: "Domains Audited", icon: <Cpu className="w-4 h-4 text-[#00FF9D]" /> },
    { value: "↓40%", label: "Claim Assessment Time", icon: <Award className="w-4 h-4 text-[#00D9FF]" /> },
    { value: "10m → 3s", label: "API Response Cuts", icon: <Hourglass className="w-4 h-4 text-[#7B2FFF]" /> },
  ];

  return (
    <div className="w-full bg-[#0A0F14]/65 backdrop-blur-md border-y border-[#1A2332] py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-[#1A2332]/40 bg-[#020608]/30 group hover:border-[#00D9FF]/20 transition-all duration-300"
            >
              <div className="mb-2 p-1.5 bg-[#020608] border border-[#1A2332] rounded-lg group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="font-display font-extrabold text-lg sm:text-xl text-[#F0F4F8] tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#8BA3B8] mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
