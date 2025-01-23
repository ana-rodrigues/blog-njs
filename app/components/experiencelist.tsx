import React from 'react';

const ExperienceList = () => {
  return (
<section>
    <h2 className='visually-hidden'>Professional experience</h2>

    <article className='experience-card'>
    <main>
        <div>
            <h3 className='heading-md'>Navro</h3>
            <p className='paragraph-md'>Navro simplifies global payments for businesses by offering access to premier payment services worldwide through a single contract and API.</p>
            <div className="link"><a href='https://navro.com'>Website</a><img className='inline' src='/media/url.png' alt='External link pixel icon'></img></div>
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


    <article className='experience-card'>
    <main>
        <div>
            <h3 className='heading-md'>Swell Commerce</h3>
            <p className='paragraph-md'>Swell is a customizable, API-first e-commerce platform. It's headless architecture offers businesses the flexibility to operate multiple storefronts across various tech stacks.</p>
            <div className="link"><a href='https://www.swell.is'>Website</a><img className='inline' src='/media/url.png' alt='External link pixel icon'></img></div>
        </div>
        <div className='description'>
            <p className='paragraph-md'>I embraced a new challenge as a Product Manager, applying my e-commerce and product design expertise to develop a hosted storefronts solution featuring a no-code builder - a product aiming to unlock the full potential of the SMB customer segment for the business. I also contributed to increased conversions through the optimisation of the product onboarding.</p>
        </div>
        <div></div>
        <div>
            <img src="/media/thumbnail.png" alt="" />
        </div>
    </main>
    <aside>
        <p className='mono-sm role'>Product Manager</p>
        <p className='mono-sm year'>2022</p>
    </aside>
    </article>

    <article className='experience-card'>
    <main>
        <div>
            <h3 className='heading-md'>Gaspard+Bruno</h3>
            <p className='paragraph-md'>Gaspard+Bruno is an independent creative company with offices in London and Lisbon, specializing in strategy, design, and engineering.</p>
            <div className="link"><a href='https://gaspardbruno.com'>Website</a><img className='inline' src='/media/url.png' alt='External link pixel icon'></img></div>
        </div>
        <div className='description'>
            <p className='paragraph-md'>I helped shaping their product approach and played a key role in collaborations with high-profile clients such as Public.com, Off-White, and Browns Fashion (for Farfetch), helping transform the organisation from a small studio into the creative powerhouse it is today.</p>
        </div>
        <div></div>
        <div>
            <img src="/media/thumbnail.png" alt="" />
        </div>
    </main>
    <aside>
        <p className='mono-sm role'>Lead Product Designer<br></br>Product Designer </p>
        <p className='mono-sm year'>2017 - 2022</p>
    </aside>
    </article>

</section>
  )
}

export default ExperienceList