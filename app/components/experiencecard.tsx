import React from 'react';
import Gallery from './gallery';
import styles from './experiencecard.module.css';

const ExperienceCard = () => {
  return (
    <article className={styles.experienceCard}>
      <main className={styles.main}>
        <div>
          <h3 className={`${styles.headingMd} headingMd`}>Navro</h3>
          <p className={`${styles.paragraphMd} paragraphMd`}>Navro simplifies global payments for businesses by offering access to premier payment services worldwide through a single contract and API.</p>
          <div className={`${styles.link} link`}>
            <a href='https://navro.com'>Website</a>
            <img className={`${styles.inline} inline`} src='/media/url.png' alt='External link pixel icon' />
          </div>
        </div>

        <div className={`${styles.description} description`}>
          <p className={`${styles.paragraphMd} paragraphMd`}>I joined as the first in-house designer, responsible for transitioning the design function from consultancy to a permanent team. Collaborating closely with Product and Engineering leadership, I established foundational processes, implemented continuous discovery practices and promoted accessibility standards. As a result, in less than two years, our team built a full payment suite featuring complex payment workflows that comply with regulatory requirements across various regions.</p>
        </div>
        <div></div>
        <div>
          <Gallery />
        </div>
      </main>
      <aside className={styles.aside}>
        <p className={`${styles.monoSm} monoSm`}>Product Designer</p>
        <p className={`${styles.monoSm} monoSm`}>2023-today</p>
      </aside>
    </article>
  );
};

export default ExperienceCard;
