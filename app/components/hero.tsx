import React from 'react';
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <p className={styles.introHeading}>{'Full-stack product experience designer for fintech, e-commerce, and everything in between.'}</p>
      </div>

      <div className={styles.introBottom}>
        <p className={`paragraphMd ${styles.introDescription}`}>{`I'm a Product Experience Designer with over 8 years of experience in crafting digital solutions for the e-commerce and fintech industries. My experience spans roles as Product Designer, Team Lead, and Product Manager, putting me in a unique position to help businesses shape products zero to one.`}</p>

        <p className={`paragraphMd ${styles.introDescription}`}>{`I have guided multiple early-stage companies in shaping their product experiences to find market-fit in dynamic, highly competitive markets. This required exceptional craft, rapid execution, strong collaboration and navigating highly ambiguous contexts to deliver impactful results.`}</p>
      </div>
    </section>
  );
};

export default Hero;