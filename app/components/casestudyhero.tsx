import Image from 'next/image'
import styles from './casestudyhero.module.css'

interface CaseStudyHeroProps {
  title: string
  summary: string;
  company: string
  client?: string
  role?: string
  year?: string
  image?: string
  imageAlt?: string
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  summary,
  company,
  client,
  role,
  year, 
  image,
  imageAlt
}) => {
  return (
    <>
      <div className={styles.caseStudyHero}>

        <h1 className={styles.caseStudyTitle}>{title}</h1>
        
        {(company || client || role || year) && (
          <div className={styles.caseStudyOverview}>
            {company && <div className={styles.caseStudyOverviewItem}><span className="monoSm">Company</span> <span className="paragraphMd">{company}</span></div>}
            {client && <div className={styles.caseStudyOverviewItem}><span className="monoSm">Client</span> <span className="paragraphMd">{client}</span></div>}
            {role && <div className={styles.caseStudyOverviewItem}><span className="monoSm">Role</span> <span className="paragraphMd">{role}</span></div>}
            {year && <div className={styles.caseStudyOverviewItem}><span className="monoSm">Year</span> <span className="paragraphMd">{year}</span></div>}
          </div>
        )}
      
      {image && (
        <div className={styles.featuredImageContainer}>
          <figure>
            <Image
              src={image}
              alt={imageAlt || title}
              width={1200}
              height={675}
              priority
              className={styles.featuredImage}
            />
            {imageAlt && (
              <figcaption className={`paragraphSm ${styles.figcaption}`}>{imageAlt}</figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
    </>
  )
}

export default CaseStudyHero
