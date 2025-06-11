import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import { Showcase } from './components/showcase';
import Footer from './components/footer';
import AnimatedWrapper from './components/animatedwrapper';
import CaseStudySection from './components/casestudysection';

export default function Page() {
    return (
    <AnimatedWrapper>
      <Preheader />
      <Hero />
      <section id="showcase-heading" aria-labelledby="showcase-heading">
        <Showcase />
      </section>
      <section id="experience-heading" aria-labelledby="experience-heading">
        <Experience />
      </section>
      <section id="casestudies-heading" aria-labelledby="casestudies-heading">
        <CaseStudySection />
      </section>
      <section id="about-heading" aria-labelledby="about-heading">
        <About />
      </section>
      <Footer />
    </AnimatedWrapper>
  );
}
