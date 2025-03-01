import React from 'react';
import styles from './experiencecard.module.css';
import experienceData from '../content/experience.json';

interface ExperienceCardProps {
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ index }) => {
  const experience = experienceData.experiences[index];

  return (
    <article className={styles.experienceCard}>

      <div className={styles.header}>

        <div className={styles.company}>
          <img className={`${styles.logo} inline`} src={experience.logo} alt='Square company logotype ' />

          <div className={styles.detail}>
            <h3 className={`${styles.headingMd} headingMd`}>{experience.company}</h3>
                <div className={`${styles.link} link`}>
                  <a href={experience.website}>{experience.websiteLabel}</a>
                  <img className={`inline`} src='/media/url.png' alt='Square company logotype ' />
                </div>
          </div>
        </div>

        <div className={styles.info}>
         <p className={`${styles.monoSm} monoSm`}>{experience.role}</p>
         <p className={`${styles.monoSm} monoSm`}>{experience.date}</p>
        </div>

      </div>

      <div className={styles.main}>

          <div className={styles.description}>
            <p className={`${styles.paragraphMd} paragraphMd`}>{experience.description}</p>
            <p className={`${styles.paragraphMd} paragraphMd`}>{experience.roleDescription}</p>
          </div>

      </div>

    </article>
  );
};

export default ExperienceCard;
