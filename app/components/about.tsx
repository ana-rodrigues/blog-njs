import React from 'react'

const About = () => {
  return (
    <section>

        <h2 className='visually-hidden'>About</h2>

        <div className='about'>

            <div className='about-col col-2'>
                <h3 className='heading-md'>About me</h3>
                <p className='paragraph-sm'>{'My first contact with digital experiences was with an old Olivetti machine, where I quickly learned to run my favourite games through obsessive trial and error. It was the entry point to becoming passionately interested about technology, culture and design.'}</p>
            </div>

            <div className='about-col col-3'>
                <h3 className='heading-md'>As a designer</h3>
                <p className='paragraph-sm'>{'I have guided multiple early-stage companies in shaping their product experiences to find market-fit in dynamic, highly competitive markets. This required exceptional craft, rapid execution, strong collaboration and navigating ambiguity to deliver impactful results.'}</p>
            </div>

            <div className='about-col col-4'>
                <h3 className='heading-md'>As a team leader</h3>
                <p className='paragraph-sm'>{'I had the opportunity to build and lead high-performing teams, fostering design cultures that transformed companies from emerging players to innovators. These teams nurtured young designers, who have since built successful careers of their own.'}</p>
            </div>

        </div>

    </section>
  )
}

export default About