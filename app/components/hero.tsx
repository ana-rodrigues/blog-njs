import styles from './hero.module.css';
import Slider from './slider'

const Hero: React.FC = () => {
  const thumbnails = [
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
  ];

  
return (
    <section className={`container ${styles.hero}`}>

    <div className={styles.introTop}>
      <p className={styles.introHeading}>{'Full-stack product experience designer for fintech, e-commerce, and everything in between.'}</p>
    </div>

    <div className={styles.introBottom}>

      <p></p>

      <p className={`paragraphMd ${styles.introDescription}`}>{`I'm a Product Experience Designer with over 8 years of experience in crafting digital solutions for the e-commerce and fintech industries. My experience spans roles as Product Designer, Team Lead, and Product Manager, putting me in a unique position to help businesses shape products zero to one.`}</p>

      <p className={`paragraphMd ${styles.introDescription}`}>{`I am a builder at heart, combining usability expertise, visual culture, strategic and technical skills. With hands-on familiarity with the complexities of B2B and API-first products, I thrive in collaborative, high-impact roles where thoughtful, well-crafted product experiences drive real business value.`}</p>
    </div>

    <Slider thumbnails={thumbnails} />

    </section>
)
}

export default Hero