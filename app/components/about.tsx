import React from 'react'
import styles from './about.module.css';

const About = () => {
  return (
    <section className='container'>

        <h2 className='sectionHeader monoMd'>About me</h2>

        <div className={`${styles.about}`}>

            <div className={`${styles.aboutCol}`}>
                <p className='paragraphMd'>{'My first contact with digital experiences was an old Olivetti machine, where I quickly learned to run my favourite games as a kid, through obsessive trial and error (mostly error, to be fair). It was the entry point to becoming passionately interested about technology, culture and design.'}</p>
            </div>

            <div className={`${styles.aboutCol}`}>
                <p className='paragraphMd'>{'A builder at heart, I combine usability expertise, visual culture, strategic and technical skills. With hands-on familiarity with the complexities of B2B and API-first products, I thrive in collaborative, high-impact roles where thoughtful, well-crafted product experiences drive business value.'}</p>
            </div>

        </div>

    </section>
  )
}

export default About