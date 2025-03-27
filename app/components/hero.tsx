import React from 'react';
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <h1 className={`headingXxl ${styles.introHeading}`}>{'Design with purpose. Build with vision.'}</h1>
      </div>

      <div className={styles.introBottom}>
        <p className='paragraphMd'>{`I am a full-stack experience designer with 8+ years of experience in crafting intuitive digital experiences, through roles in Product Design, Design Leadership and Product Management. A builder at heart, I excel at crafting products from 0 → 1, while establishing high-performing design teams.`}</p>
      </div>
    </section>
  );
};

export default Hero; 