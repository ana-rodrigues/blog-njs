"use client";

import { motion } from 'framer-motion';
import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Carousel from './components/carousel';
import Footer from './components/footer';
import Nav from './components/nav';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      style={{ overflow: 'hidden' }}
    >
      <Nav />
      <Preheader />
      <Hero />
      <Carousel />
      <Experience />
      <About />
      <Footer />
    </motion.div>
  );
}
