import styles from './about.module.css';

const About = () => {
  return (
    <section className='container'>

        <h2 className='sectionHeader monoMd'>About me</h2>

        <div className={`${styles.about}`}>

            <div className={`${styles.aboutCol}`}>
            <h3 className='headingMd'>Where it started</h3>
                <p className='paragraphMd'>{'My first contact with digital experiences was an old Olivetti computer, where I quickly learned to run my favourite games as a kid, through obsessive trial and error (mostly error, to be fair). It was the entry point to becoming passionately interested about technology, culture and design.'}</p>
            </div>

            <div className={`${styles.aboutCol}`}>
                <h3 className='headingMd'>As a designer</h3>
                <p className='paragraphMd'>{`I am a builder at heart, combining usability expertise, visual culture, strategic and technical skills. With hands-on familiarity with the complexities of B2B and API-first products, I thrive in collaborative, high-impact roles where end-to-end, well-crafted product experiences drive real business value.`}</p>
            </div>

            <div className={`${styles.aboutCol}`}>
                <h3 className='headingMd'>As a leader</h3>
                <p className='paragraphMd'>{`I’ve built and driven small, but high-performing design teams, drawing on professional experiences that extend to my time working in tech. I create safe, collaborative environments where designers can grow and mature their practice, driving tangible impact.`}</p>
            </div>

        </div>
    </section>
  )
}

export default About