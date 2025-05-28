import React from 'react';
import Link from 'next/link';
import styles from './casestudysection.module.css';
import Image from 'next/image';

export type CaseStudy = {
  title: string;
  slug: string;
  client?: string;
  image?: string;
  alt?: string;
}

type CaseStudySectionProps = {
  caseStudies: CaseStudy[];
  companyName: string;
}

const CaseStudySection = ({ caseStudies, companyName }: CaseStudySectionProps) => {

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const companySlug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className={styles.caseStudies}>
      <h4 className='visuallyHidden'>Case studies from {companyName}</h4>
      <ul className={styles.caseStudyList}>
        {caseStudies.map((caseStudy: CaseStudy) => (
          <li key={caseStudy.slug}>
            <Link 
              href={`/case-studies/${caseStudy.slug}`} 
              className={styles.caseStudyItem}
            >
              <figure className={styles.imgWrapper}>
                {caseStudy.image ? (
                <Image 
                  src={caseStudy.image}
                  alt={caseStudy.alt || caseStudy.title} 
                  width={128}
                  height={128}
                  sizes="128px"
                  priority={true}
                  quality={80}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' 
                  }}
                />
              ) : (
                <div className={styles.placeholder} aria-hidden="true" />
              )}
              </figure>
              <div className={styles.caseStudyContent}>
                <div className={styles.caseStudyInfo}>
                <h5 className={styles.caseStudyTitle}>{caseStudy.title}</h5>
                <p className={styles.caseStudyClient}>{caseStudy.client}</p>
                </div>
                <p className='monoSm'>Read the case study</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseStudySection;
