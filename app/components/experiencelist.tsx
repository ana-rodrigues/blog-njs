import React from 'react'
import ExperienceCard from './experiencecard'

const ExperienceList = () => {
  return (
    <section>
        <h2 className='visually-hidden'>Professional experience</h2>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
    </section>
  )
}

export default ExperienceList