// Making this a server component by removing the React import
import styles from './hero.module.css';

// Server components render faster as they don't require client-side JS
const Hero = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <h1 
          id="hero-heading" 
          className={`headingXxl ${styles.introHeading}`}
        >
          Design with purpose, build with vision.
        </h1>
      </div>

      <div className={styles.introBottom}>
        <p className='paragraphMd'>{`I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership. A builder at heart, I thrive when I'm crafting complex products from 0→1, while establishing and driving high-performing design teams.`}</p>
      </div>
    </section>
  );
};

export default Hero; 