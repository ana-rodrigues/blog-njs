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
      <main className={styles.main}>
        <div>
          <h3 className={`${styles.headingMd} headingMd`}>{experience.company}</h3>
          <p className={`${styles.paragraphMd} paragraphMd`}>{experience.description}</p>
          <div className={`${styles.link} link`}>
            <a href={experience.website}>{experience.websiteLabel}</a>
            <img className={`${styles.inline} inline`} src='/media/url.png' alt='External link pixel icon' />
          </div>
        </div>

        <div className={`${styles.description} description`}>
          <p className={`${styles.paragraphMd} paragraphMd`}>{experience.roleDescription}</p>
        </div>

      </main>
      <aside className={styles.aside}>
        <p className={`${styles.monoSm} monoSm`}>{experience.role}</p>
        <p className={`${styles.monoSm} monoSm`}>{experience.date}</p>
      </aside>
    </article>
  );
};

export default ExperienceCard;
