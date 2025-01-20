import React from 'react'
import { ArrowUpRight } from 'lucide-react';

const ExperienceCard = () => {
  return (
    <article className='experience-card'>
    
    <main>

        <div>
            <h3 className='heading-md'>Navro</h3>
            <p className='paragraph-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="link"><a href='https://navro.com'>Website</a><ArrowUpRight strokeWidth={1} color='#ACACAC' /></div>
        </div>

        <div className='description'>
            <p className='paragraph-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
