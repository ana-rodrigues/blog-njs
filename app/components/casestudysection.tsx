import Link from 'next/link';
import styles from './casestudies.module.css';
import Image from 'next/image';
import { getCaseStudies, type CaseStudy } from '../case-studies/utils.server';



async function CaseStudySection() {
  const caseStudies = await getCaseStudies();

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
      <section id="casestudies" className={`container ${styles.caseStudies}`}>
      <h2 className="sectionHeader monoMd">Selected Work</h2>

        <ul className={styles.caseStudyList}>
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <Link 
                href={`/case-studies/${caseStudy.slug}`} 
                className={styles.caseStudyItem}
              >
                <figure className={styles.imgWrapper}>
                  {caseStudy.metadata.image ? (
                  <Image 
                    src={caseStudy.metadata.image}
                    alt={caseStudy.metadata.alt || caseStudy.metadata.title} 
                    width={560}
                    height={560}
                    sizes="560px"
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
                  <h5 className={styles.caseStudyTitle}>{caseStudy.metadata.title}</h5>
                  <p className={styles.caseStudyClient}>{caseStudy.metadata.client}</p>
                  </div>

                  <div className={styles.postAction} aria-label={`Read ${caseStudy.metadata.title}`}>
                    <p className="monoSm">Read the full story</p>
                  </div>  

                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
  );
};

export default CaseStudySection;
