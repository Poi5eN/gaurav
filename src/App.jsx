import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative z-0 bg-primary dark:bg-dark-primary transition-colors duration-300">
          {/* Global Stars Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <StarsCanvas />
          </div>

          <div className="bg-hero-pattern dark:bg-hero-pattern-dark bg-cover bg-no-repeat bg-center relative z-10">
            <Navbar />
            <Hero />
          </div>
          <div className="relative z-10">
            <About />
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
            <Contact />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
