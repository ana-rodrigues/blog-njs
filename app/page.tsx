import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import { Showcase } from './components/showcase';
import AnimatedWrapper from './components/animatedwrapper';
import Footer from './components/footer';

export default function Page() {
  return (
    <AnimatedWrapper>
      <Preheader />
      <Hero />
      <section aria-labelledby="showcase-heading">
        <h2 id="showcase-heading" className="visuallyHidden">Project Showcase</h2>
        <Showcase />
      </section>
      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="visuallyHidden">Experience</h2>
        <Experience />
      </section>
      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="visuallyHidden">About Me</h2>
        <About />
      </section>
      <Footer/>
    </AnimatedWrapper>
  );
}
