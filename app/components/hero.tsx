import React from 'react';
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <h1 className={`headingXl ${styles.introHeading}`}>{'Product experience designer for fintech, e-commerce, and everything in between.'}</h1>
      </div>

      <div className={styles.introBottom}>
        <p className='paragraphMd'>{`I have 8+ years of experience in crafting intuitive digital experiences, through roles in Product Design, Design Leadership and Product Management. A builder at heart, I excel at crafting products from 0 → 1, while establishing high-performing design teams. I've helped early-stage companies find market-fit through rapid problem-solving, quality craft, and strategic thinking - delivering measurable impact while building the right foundations for long-term success.`}</p>
      </div>
    </section>
  );
};

export default Hero; 