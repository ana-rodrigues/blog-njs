import Clock from './clock';
import Video from './video';

const Hero = () => (
    <section id="hero">

    <div className="preheader">
      <h1 className="visuallyHidden">The digital bureau of Ana F. Rodrigues, Product Experience Designer</h1>
      <div className="preheaderLeft">
        <p className='monoMd'>The digital bureau</p>
        <p className='headingSm'><span className="italics">of </span>Ana F. Rodrigues</p>
      </div>
      <div className="preheaderRight">
        <p className='monoMd'>Lisbon UTC+0</p>
        <img className='inline' src='/media/world.png' alt='Globe pixel art icon'></img>
        <Clock/>
      </div>
    </div>

    <div className="intro">
      <p className='headingXl'>{'Product Experience Designer based in Lisbon, working worldwide.'}</p>
      <p></p>
      <p className='paragraphMd'>{`I'm a Product Experience Designer with over 8 years of experience in crafting digital solutions for the e-commerce and fintech industries. My experience spans roles as Product Designer, Team Lead, and Product Manager, putting me in a unique position to help businesses shape products zero to one.`}</p>
      <p className='paragraphMd'>{`I am a builder at heart, combining usability expertise, visual culture, strategic and technical skills. With hands-on familiarity with the complexities of B2B and API-first products, I thrive in collaborative, high-impact roles where thoughtful, well-crafted product experiences drive real business value.`}</p>
    </div>


    <div className="video">
      <Video />
    </div> 

      </section>
  )

export default Hero