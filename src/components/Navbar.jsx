import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = ({ onOpenTerminal }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
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
      className={`${styles.paddingX} w-full flex items-center justify-center py-4 fixed top-0 z-20`}
    >
      {/* Dynamic Island Container */}
      <div className="flex items-center justify-between bg-[#050816]/90 backdrop-blur-xl rounded-full px-6 py-2 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] min-w-[300px] sm:min-w-[500px] max-w-7xl transition-all duration-300">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 mr-8"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <p className="text-white text-[16px] font-bold cursor-pointer font-outfit tracking-wide">
            Gaurav<span className="text-accent">.ai</span>
          </p>
        </Link>

        {/* Links Section (Centered) */}
        <ul className="list-none hidden sm:flex flex-row gap-8 flex-1 justify-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-accent" : "text-gray-400"
              } hover:text-white text-[14px] font-medium cursor-pointer transition-all duration-300 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span
                className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 ${
                  active === nav.title ? "w-full" : "group-hover:w-full"
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-6 h-6 object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-[#050816] backdrop-blur-xl absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-2xl border border-white/10 shadow-2xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {/* Mobile Terminal Button */}
              <li className="w-full">
                <button
                  onClick={() => {
                    setToggle(!toggle);
                    onOpenTerminal();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 text-accent font-mono text-sm border border-accent/20"
                >
                  <span>&gt;_</span> TERMINAL
                </button>
              </li>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-accent" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Terminal Toggle (Desktop) */}
        <div className="hidden sm:flex items-center pl-6">
          <button
            onClick={onOpenTerminal}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-accent/20 border border-white/5 hover:border-accent/50 transition-all duration-300"
            title="Launch Terminal"
          >
            <span className="text-accent font-mono text-[14px] font-bold group-hover:scale-110 transition-transform">
              &gt;_
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
