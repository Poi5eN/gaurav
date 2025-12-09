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
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary dark:bg-dark-primary" : "bg-transparent"
      } transition-colors duration-300`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white dark:text-dark-text font-bold text-[18px] cursor-pointer flex">
            Gaurav&nbsp;
            <span className="sm:block hidden"> | Poi5eN</span>
          </p>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title
                    ? "text-white dark:text-dark-text"
                    : "text-secondary dark:text-dark-secondary"
                } hover:text-white dark:hover:text-dark-text text-[18px] font-medium cursor-pointer transition-colors duration-300`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            aria-label="Toggle theme"
          >
            <svg
              className="w-6 h-6 text-white dark:text-dark-text"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                className={`${
                  theme === "light" ? "opacity-0" : "opacity-100"
                } transition-opacity duration-500`}
              >
                {/* Moon Icon */}
                <path
                  d="M21 12.79A9 9 0 1 1 12.21 3a7 7 0 0 0 8.79 9.79z"
                  fill="currentColor"
                  className="transform scale-100 group-hover:scale-110 transition-transform duration-300"
                />
              </g>
              <g
                className={`${
                  theme === "light" ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              >
                {/* Sun Icon */}
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <g className="transform group-hover:rotate-45 transition-transform duration-300">
                  <path d="M12 1v2" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 21v2" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M4.22 4.22l1.42 1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M18.36 18.36l1.42 1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M1 12h2" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 12h2" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M4.22 19.78l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M18.36 5.64l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </svg>
          </button>

          {/* Mobile Menu */}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient dark:dark-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl transition-colors duration-300`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title
                        ? "text-white dark:text-dark-text"
                        : "text-secondary dark:text-dark-secondary"
                    } transition-colors duration-300`}
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
      </div>
    </nav>
  );
};

export default Navbar;
