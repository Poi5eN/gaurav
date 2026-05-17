import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { ThemeProvider } from "./ThemeContext";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Skills,
  AILab,
  Works,
  StarsCanvas,
  Terminal,
  Preloader,
  Resume,
  Blog,
  StatsBar
} from "./components";
import Footer from "./components/Footer";

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  
  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Force scroll to top on reload
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Custom cursor event listeners
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isBooting ? (
          <Preloader onComplete={() => setIsBooting(false)} />
        ) : (
          <div className="relative z-0 bg-[#020608] text-[#F0F4F8] transition-colors duration-300">
            {/* Ambient Noise Filter Background */}
            <div className="noise-bg" />

            {/* Custom Mouse Cursor elements */}
            <div
              className="custom-cursor hidden md:block"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: `translate(-50%, -50%) ${cursorHover ? 'scale(1.8)' : 'scale(1)'}`,
                borderColor: cursorHover ? '#7B2FFF' : '#00D9FF',
                backgroundColor: cursorHover ? 'rgba(0, 217, 255, 0.05)' : 'transparent',
              }}
            />
            <div
              className="custom-cursor-dot hidden md:block"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            />

            <div className="bg-transparent bg-cover bg-no-repeat bg-center">
              <Navbar onOpenTerminal={() => setIsFullScreen(true)} />
              <Hero
                onOpenTerminal={() => setIsFullScreen(true)}
                isTerminalOpen={isFullScreen}
              />
            </div>

            <Terminal
              isFullScreen={isFullScreen}
              toggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            />

            <StatsBar />

            <About />
            <Skills />
            <AILab />
            <Works />
            <Experience />
            <Resume />
            <Blog />
            <Feedbacks />
            
            <div className="relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
            
            <Footer />
          </div>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
