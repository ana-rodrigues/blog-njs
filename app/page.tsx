import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Carousel from './components/carousel';
import Footer from './components/footer';

export default function Page () {
  return (
    <>
      <Preheader />
      <Hero />
      <Carousel />
      <Experience />
      <About />
      <Footer />
    </>
  );
}
