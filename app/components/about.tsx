import React from 'react'
import styles from './about.module.css';

const About = () => {
  return (
    <section className='container'>

        <h2 className='sectionHeader monoMd'>About me</h2>

        <div className={`${styles.about}`}>

            <div className={`${styles.aboutCol}`}>
                <p className='paragraphMd'>{'My first contact with digital experiences was an old Olivetti machine, where I quickly learned to run my favourite games as a kid, through obsessive trial and error. It was the entry point to becoming passionately interested about technology, culture and design.'}</p>
            </div>

            <div className={`${styles.aboutCol}`}>
                <p className='paragraphMd'>{'I have guided multiple early-stage companies in shaping their product experiences to find market-fit in dynamic, highly competitive markets. This required exceptional craft, rapid execution, strong collaboration and navigating ambiguity to deliver impactful results.'}</p>
            </div>

        </div>

    </section>
  )
}

export default About