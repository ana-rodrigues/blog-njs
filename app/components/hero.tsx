import Clock from './clock';
import Video from './video';

const Hero = () => (
    <section id="hero">

    <div className="preheader">
      <div className="preheader-left">
        <label>The digital bureau</label>
        <h4><span className="italics">of </span>Ana F. Rodrigues</h4>
      </div>
      <div className="preheader-right">
        <label>Lisbon</label>
        <Clock/>
      </div>
    </div>

    <div className="intro">
      <h1>Digital Experience Designer based in Lisbon, working worldwide.</h1>
      <p></p>
      <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>
      <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>
    </div>

    <div className="video">
      <Video />
    </div>

      </section>
  )

export default Hero