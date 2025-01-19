import React from 'react'
import { ArrowUpRight } from 'lucide-react';

const Experience = () => {
  return (
    <article className='experience-card'>
    <main>
        <div>
            <h3>Navro</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="link"><a href='https://navro.com'>Website</a><ArrowUpRight strokeWidth={1} /></div>
        </div>

        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div></div>

        <div>
            <img src="/media/thumbnail.png" alt="" />
        </div>
    </main>

    <aside>
        <p>Product Designer</p>
        <p></p>
        <p></p>
        <p>2023-today</p>
    </aside>

    </article>
  )
}

export default Experience
