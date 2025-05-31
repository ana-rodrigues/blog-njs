import React from 'react';
import ExperienceCard from './experiencecard';
import experienceData from '../content/experience.json';
import styles from './experience.module.css';

const Experience = () => {
  return (
    <section id="experience" className={`container ${styles.experience}`}>
      <h2 className="sectionHeader monoMd">{experienceData.title}</h2>
      <div className={`${styles.experienceList}`}>
        {experienceData.experiences.map((_, index) => (
          <ExperienceCard key={index} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;