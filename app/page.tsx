import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import { Showcase } from './components/showcase';
import AnimatedWrapper from './components/animatedwrapper';

export default function Page() {
  return (
    <AnimatedWrapper>
      <Preheader />
      <Hero />
      <Showcase />
      <Experience />
      <About />
    </AnimatedWrapper>
  );
}
