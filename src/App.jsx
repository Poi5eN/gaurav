import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className='relative z-0 bg-primary dark:bg-dark-primary transition-colors duration-300'>
          <div className='bg-hero-pattern dark:bg-hero-pattern-dark bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
          {/* <footer className='relative z-10'>
            <div className='bg-primary dark:bg-dark-primary text-center py-6'>
              <p className='text-secondary dark:text-dark-secondary'>© 2023 Gaurav | Poi5eN</p>
            </div>
          </footer> */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;