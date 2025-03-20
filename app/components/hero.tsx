import React from 'react';
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.introTop}>
        <h1 className={`headingXl ${styles.introHeading}`}>{'Full-stack product experience designer for fintech, e-commerce, and everything in between.'}</h1>
      </div>

      <div className={styles.introBottom}>
        <p className={`paragraphMd ${styles.introDescription}`}>{`I'm a Product Experience Designer with over 8 years of experience in crafting digital solutions for the e-commerce and fintech industries. My experience spans roles as Product Designer, Team Lead, and Product Manager, putting me in a unique position to help early-stage businesses shape products zero to one - pairing exceptional craft, swift execution, and navigating ambiguity to deliver impactful results.`}</p>
      </div>
    </section>
  );
};

export default Hero; 