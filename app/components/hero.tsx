import Clock from './clock';
import Video from './video';

const Hero = () => (
    <section id="hero">

    <div className="preheader">
      <h1 className="visually-hidden">The digital bureau of Ana F. Rodrigues, Product Experience Designer</h1>
      <div className="preheader-left">
        <p className='mono-md'>The digital bureau</p>
        <p className='heading-sm'><span className="italics">of </span>Ana F. Rodrigues</p>
      </div>
      <div className="preheader-right">
        <p className='mono-md'>Lisbon UTC+0</p>
        <Clock/>
      </div>
    </div>

    <div className="intro">
      <p className='heading-xl'>{'Product Experience Designer based in Lisbon, working worldwide.'}</p>
      <p></p>
      <p className='paragraph-sm'>{`I am a Product Experience Designer with over 8 years of expertise in crafting digital solutions for the e-commerce and fintech industries. My background spans roles as individual contributor, Lead Product Designer, and Product Manager, allowing me to bring a user-centric mindset to all my contributions.`}</p>
      <p className='paragraph-sm'>{`A builder at heart, I combine strong UX foundations and visual culture with technical and business savvy. With hands-on familiarity with the complexities of B2B and API-first products, I thrive in collaborative, high-impact roles where thoughtful, well-crafted product experiences drive real business value.`}</p>
    </div>

    <div className="video">
      <Video />
    </div>

      </section>
  )

export default Hero