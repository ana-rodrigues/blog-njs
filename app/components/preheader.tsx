import styles from './preheader.module.css';
import React from 'react'
import Clock from './clock';

const Preheader = () => {
  return (
    <div className={styles.preheader}>
        <h1 className="visuallyHidden">The digital bureau of Ana Rodrigues, Product Experience Designer</h1>

    <div className={styles.preheaderLeft}>
        <p className='monoMd'>The digital bureau of Ana Rodrigues</p>
    </div>

    <div className={styles.preheaderRight}>
        <p className='monoMd'>Lisbon UTC+0</p>
        <img className='inline' src='/media/world.png' alt='Globe pixel art icon'></img>
        <Clock/>
    </div>
</div>
  )
}

export default Preheader
