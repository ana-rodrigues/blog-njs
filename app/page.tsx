"use client"

import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Carousel from './components/carousel';
import AnimatedWrapper from './components/animatedwrapper';

export default function Page() {
  return (
    <AnimatedWrapper>
      <Preheader />
      <Hero />
      <Carousel />
      <Experience />
      <About />
    </AnimatedWrapper>
  );
}
