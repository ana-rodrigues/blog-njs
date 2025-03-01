import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Nav from './components/nav';
import Carousel from './components/carousel';

export default function Page () {
  return (
    <>
      <Preheader />
      <Hero />
      <Carousel />
      <Experience />
      <About />
    </>
  );
}
