import React from 'react';
import ExperienceCard from './experiencecard';
import experienceData from '../content/experience.json';
import styles from './experience.module.css';
import { getCaseStudies } from '../case-studies/utils.server';
import { CaseStudy } from '../case-studies/utils.server';

const Experience = async () => {
  // Fetch all case studies from MDX files
  const allCaseStudies = await getCaseStudies();
  
  // Create a map for quick lookup by slug
  const caseStudyMap = new Map<string, CaseStudy>();
  allCaseStudies.forEach(study => {
    caseStudyMap.set(study.slug, study);
  });
  return (
    <section id="experience" className={`container ${styles.experience}`}>
      <h2 className="sectionHeader monoMd">{experienceData.title}</h2>
      <div className={`${styles.experienceList}`}>
        {experienceData.experiences.map((experience, index) => {
          // For each experience, find the associated case studies by slug
          const fullCaseStudies = (experience.caseStudies || []).map(cs => {
            const fullStudy = caseStudyMap.get(cs.slug);
            if (!fullStudy) {
              console.warn(`Case study with slug ${cs.slug} not found`);
              return null;
            }
            return fullStudy;
          }).filter(Boolean) as CaseStudy[];
          
          return (
            <ExperienceCard 
              key={index} 
              experience={{
                ...experience,
                fullCaseStudies
              }} 
            />
          );
        })}
      </div>
    </section>
  );
};

export default Experience;