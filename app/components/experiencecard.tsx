import styles from './experiencecard.module.css'
import experienceData from '../content/experience.json'
import Image from 'next/image'
interface ExperienceCardProps {
  index: number;
} 

const ExperienceCard: React.FC<ExperienceCardProps> = ({ index }) => {
  const experience = experienceData.experiences[index];

  return (
    <article className={styles.experienceCard}>

      <div className={styles.header}>

        <div className={styles.company}>
        <Image 
            className={`${styles.logo} inline`} 
            src={experience.logo} 
            alt='Company logotype'
            width={80}
            height={80}
          />
          <div className={styles.detail}>
            <h3 className={`${styles.headingMd} headingMd`}>{experience.company}</h3>
                <div className='link'>
                  <a href={experience.website}>{experience.websiteLabel}</a>
                  <img className={`inline`} src='/media/url.png'/>
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

      </div>

    </article>
  );
};

export default ExperienceCard;
