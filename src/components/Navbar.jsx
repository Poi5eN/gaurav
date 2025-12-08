import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
      className={`w-full flex items-center fixed top-4 z-50 px-4 transition-all duration-300 pointer-events-none`}
    >
      <div
        className={`w-full max-w-7xl mx-auto flex justify-between items-center glass-panel p-4 pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-opacity-80 shadow-neon border-neon-blue/30"
            : "bg-opacity-30"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Gaurav &nbsp;
            <span className="sm:block hidden text-slate-300">| Poi5eN</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-row gap-10 items-center">
          <ul className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-neon-blue" : "text-slate-300"
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle (Styled for Glass) */}
          <button
            onClick={toggleTheme}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-0 rounded-full blur-md bg-neon-purple/20 opacity-0 hover:opacity-100 transition-opacity" />
            <span className="text-xl">{theme === "light" ? "🌙" : "☀️"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glass-panel absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl sidebar animate-fade-in-down`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-neon-blue" : "text-white"
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
      </div>
    </nav>
  );
};

export default Navbar;
