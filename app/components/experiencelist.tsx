import React from 'react'
import ExperienceCard from './experiencecard'

const ExperienceList = () => {
  return (
    <section>
        <h2 className='assistive'>Professional experience</h2>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
    </section>
  )
}

export default ExperienceList