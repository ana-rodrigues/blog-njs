import Hero from './components/hero';
import About from './components/about';
import Footer from './components/footer';
import ExperienceCard from './components/experiencecard';

export default function Page () {
  return (
    <>
      <Hero />
    <div>
      <ExperienceCard index={0} />
      <ExperienceCard index={1} />
      <ExperienceCard index={2} />
    </div>
      <About />
      <Footer />
    </>
  );
}
