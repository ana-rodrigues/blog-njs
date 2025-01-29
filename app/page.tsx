import Preheader from './components/preheader';
import Hero from './components/hero';
import Experience from './components/experience';
import About from './components/about';
import Nav from './components/nav';

export default function Page () {
  return (
    <>
      <Preheader />
      <section className='container'>
          <Hero />
          <Experience />
          <About />
      </section>
      <Nav />
    </>
  );
}
