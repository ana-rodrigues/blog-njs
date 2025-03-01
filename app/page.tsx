"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Carousel from './components/carousel';
import Footer from './components/footer';

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default function Page() {
  return (
    <>
      <AnimatedSection>
        <Preheader />
      </AnimatedSection>

      <AnimatedSection>
        <Hero />
      </AnimatedSection>

      <AnimatedSection>
        <Carousel />
      </AnimatedSection>

      <AnimatedSection>
        <Experience />
      </AnimatedSection>

      <AnimatedSection>
        <About />
      </AnimatedSection>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  );
}
