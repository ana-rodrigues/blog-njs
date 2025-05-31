import React from 'react';
import styles from './experiencecard.module.css'
import experienceData from '../content/experience.json'
import Image from 'next/image'
import CaseStudySection from './casestudysection';

type ExperienceCardProps = {
  index: number;
}

const ExperienceCard = ({ index }: ExperienceCardProps) => {
  const experience = experienceData.experiences[index];

  return (
    <article className={styles.experienceCard}>

      <div className={styles.header}>

        <div className={styles.company}>
        <Image 
            className={`${styles.logo} inline`} 
            src={experience.logo} 
            alt={`${experience.company} logo`}
            width={420}
            height={420}
            quality={100}
          />
          <div className={styles.detail}>
            <h3 className={`${styles.headingMd} headingMd`}>{experience.company}</h3>
                <div className='link'>
                  <a href={experience.website}>{experience.websiteLabel}</a>
                  <Image 
                    className="inline" 
                    src='/media/url.png' 
                    alt="External link icon" 
                    width={16} 
                    height={16} 
                  />
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
            <p className='paragraphMd'>{experience.description}</p>
            <p className='paragraphMd'>{experience.roleDescription}</p>
          </div>

          {/* Case Studies Section */}
          <CaseStudySection 
            caseStudies={experience.caseStudies || []} 
            companyName={experience.company} 
          />

      </div>

    </article>
  );
};

export default ExperienceCard;
