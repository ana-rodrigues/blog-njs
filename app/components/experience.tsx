import React from 'react'
import ExperienceCard from './experiencecard';
import experienceData from '../content/experience.json';
import styles from './experience.module.css';

const Experience = () => {
    return (
      <section className='container'>
        <aside className={styles.aside}>
        <h2 className="sectionHeader monoSm">{experienceData.title}</h2>
        </aside>
        {experienceData.experiences.map((_, index) => (
          <ExperienceCard key={index} index={index} />
        ))}
      </section>
    );
  };

export default Experience