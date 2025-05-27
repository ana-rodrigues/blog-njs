import React from 'react';
import styles from './experiencecard.module.css'
import experienceData from '../content/experience.json'
import Image from 'next/image'
import Link from 'next/link';

type ExperienceCardProps = {
  index: number;
}

type CaseStudy = {
  title: string;
  slug: string;
  summary: string;
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
            width={80}
            height={80}
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
          {experience.caseStudies && experience.caseStudies.length > 0 && (
            <div className={styles.caseStudies}>
              <h4 className={`${styles.caseStudiesHeading} monoSm`}>Case Studies</h4>
              <ul className={styles.caseStudyList}>
                {experience.caseStudies.map((caseStudy: CaseStudy) => {
                  // Convert company name to slug format
                  const companySlug = experience.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  return (
                    <li key={caseStudy.slug} className={styles.caseStudyItem}>
                      <Link 
                        href={`/case-studies/${companySlug}/${caseStudy.slug}`} 
                        className={styles.caseStudyLink}
                      >
                        <span className={styles.caseStudyTitle}>{caseStudy.title}</span>
                        <p className={styles.caseStudySummary}>{caseStudy.summary}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

      </div>

    </article>
  );
};

export default ExperienceCard;
