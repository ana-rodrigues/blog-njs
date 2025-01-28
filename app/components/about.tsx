import React from 'react'

const About = () => {
  return (
    <section>

        <h2 className='visuallyHidden'>About</h2>

        <div className='about'>

            <div className='aboutCol col2'>
                <h3 className='headingMd'>About me</h3>
                <p className='paragraphMd'>{'My first contact with digital experiences was an old Olivetti machine, where I quickly learned to run my favourite games as a kid, through obsessive trial and error. It was the entry point to becoming passionately interested about technology, culture and design.'}</p>
            </div>

            <div className='aboutCol col3'>
                <h3 className='headingMd'>As a designer</h3>
                <p className='paragraphMd'>{'I have guided multiple early-stage companies in shaping their product experiences to find market-fit in dynamic, highly competitive markets. This required exceptional craft, rapid execution, strong collaboration and navigating ambiguity to deliver impactful results.'}</p>
            </div>

            <div className='aboutCol col4'>
                <h3 className='headingMd'>As a team leader</h3>
                <p className='paragraphMd'>{'I had the opportunity to build and lead high-performing teams, fostering design cultures that transformed companies from emerging players to innovators. These teams nurtured young designers, who have since built successful careers of their own.'}</p>
            </div>

        </div>

    </section>
  )
}

export default About