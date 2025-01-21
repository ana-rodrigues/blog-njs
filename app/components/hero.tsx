import Clock from './clock';
import Video from './video';

const Hero = () => (
    <section id="hero">

    <div className="preheader">
      <h1 className="visually-hidden">The digital bureau of Ana F. Rodrigues, Digital Experience Designer</h1>
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
      <p className='heading-xl'>Digital Experience Designer based in Lisbon, working worldwide.</p>
      <p></p>
      <p className='paragraph-md'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>
      <p className='paragraph-md'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>
    </div>

    <div className="video">
      <Video />
    </div>

      </section>
  )

export default Hero