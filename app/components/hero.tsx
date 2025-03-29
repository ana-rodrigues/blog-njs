import React from 'react';
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <h1 className={`headingXxl ${styles.introHeading}`}>{'Design with purpose, build with vision.'}</h1>
      </div>

      <div className={styles.introBottom}>
        <p className='paragraphMd'>{`I’m a full-stack experience designer specialising in e-commerce and fintech, with a track record of roles in Product Design, Product Management, and Team Leadership. A builder at heart, I thrive when I'm crafting complex products from 0→1, while establishing and driving high-performing design teams.`}</p>
      </div>
    </section>
  );
};

export default Hero; 