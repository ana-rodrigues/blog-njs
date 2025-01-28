import React from 'react'
import ExperienceCard from './experiencecard';
import experienceData from '../content/experience.json';

const Experience = () => {
    return (
      <section id='Experience'>
        <h2 className="visuallyHidden">{experienceData.title}</h2>
        {experienceData.experiences.map((_, index) => (
          <ExperienceCard key={index} index={index} />
        ))}
      </section>
    );
  };

export default Experience