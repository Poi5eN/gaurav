import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

const Navbar = ({ onOpenTerminal }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-[#020608]/85 backdrop-blur-md border-b border-[#1A2332]/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Monospace Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="font-mono text-xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#7B2FFF] bg-clip-text text-transparent tracking-tighter">
            G/
          </span>
          <span className="text-[#F0F4F8] font-mono text-sm tracking-wider hover:text-[#00D9FF] transition-colors">
            Poi5eN
          </span>
        </Link>

        {/* Right Side Links & CTAs */}
        <div className="flex items-center gap-8">
          
          {/* Navigation Links */}
          <ul className="list-none hidden md:flex flex-row gap-8 items-center">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-[#00D9FF]" : "text-[#8BA3B8]"
                } hover:text-[#F0F4F8] font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Terminal & Glow CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Monospace Terminal Icon */}
            <button
              onClick={onOpenTerminal}
              className="p-2 border border-[#1A2332] bg-[#0A0F14] text-[#00FF9D] rounded-xl hover:border-[#00FF9D]/40 hover:shadow-[0_0_15px_rgba(0,255,157,0.15)] transition-all font-mono text-xs flex items-center gap-1.5"
              title="Open Shell Console"
            >
              <TerminalIcon className="w-4 h-4" />
              <span>console.sh</span>
            </button>

            {/* Let's Build CTA */}
            <a
              href="#contact"
              className="bg-[#020608] border border-[#00D9FF]/40 text-[#00D9FF] font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-xl hover:bg-[#00D9FF]/10 hover:border-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
            >
              Let's Build &rarr;
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[24px] h-[24px] object-contain cursor-pointer filter invert brightness-200"
              onClick={() => setToggle(!toggle)}
            />
            
            {/* Mobile Menu Dropdown */}
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-[#0A0F14]/95 backdrop-blur-lg border border-[#1A2332] absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-50 rounded-2xl flex-col gap-4 shadow-2xl animate-fade-in`}
            >
              <ul className="list-none flex flex-col gap-4 items-start">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-mono text-xs uppercase tracking-wider cursor-pointer ${
                      active === nav.title ? "text-[#00D9FF]" : "text-[#8BA3B8]"
                    } hover:text-[#F0F4F8] transition-colors`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>

              {/* Mobile Console Button */}
              <button
                onClick={() => {
                  setToggle(false);
                  onOpenTerminal();
                }}
                className="w-full text-center mt-2 py-2 border border-[#1A2332] bg-[#020608] text-[#00FF9D] font-mono text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>RUN CONSOLE</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
