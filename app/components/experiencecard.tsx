import React from 'react'
import { ArrowUpRight } from 'lucide-react';

const ExperienceCard = () => {
  return (

    <article className='experience-card'>
    <main>
        <div>
            <h3 className='heading-md'>Navro</h3>
            <p className='paragraph-md'>Navro simplifies global payments for businesses by offering access to premier payment services worldwide through a single contract and API.</p>
            <div className="link"><a href='https://navro.com'>Website</a><ArrowUpRight strokeWidth={1} color='#ACACAC' /></div>
        </div>

        <div className='description'>
            <p className='paragraph-md'>I joined as the first in-house designer, responsible for transitioning the design function from consultancy to a permanent team. Collaborating closely with Product and Engineering leadership, I established foundational processes, implemented continuous discovery practices and promoted accessibility standards. As a result, in less than two years, our team built a full payment suite featuring complex payment workflows that comply with regulatory requirements across various regions.</p>
        </div>
        <div></div>
        <div>
            <img src="/media/thumbnail.png" alt="" />
        </div>
    </main>
    <aside>
        <p className='mono-sm role'>Product Designer</p>
        <p className='mono-sm year'>2023-today</p>
    </aside>
    </article>

  )
}

export default ExperienceCard
