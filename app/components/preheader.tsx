"use client";

import styles from './preheader.module.css';
import Clock from './clock';
import ClientSideTypewriter from './clientsidetypewriter'

const Preheader = () => {
  return (
    <div className={`container ${styles.preheader}`}>
      <h1 className="visuallyHidden">The digital bureau of Ana Rodrigues, Product Experience Designer</h1>

      <div className={styles.preheaderLeft}>
        <p className='monoSm'>
          <ClientSideTypewriter words={['Ana Fernandes Rodrigues', 'Product experience designer']}/>
        </p>
      </div>

      <div className={styles.preheaderRight}>
        <p className='monoSm'>Europe/Lisbon,</p>
        <p className='monoSm'>
          {new Intl.DateTimeFormat('en-US', {
            timeZone: 'Europe/Lisbon',
            timeZoneName: 'shortOffset'
          }).formatToParts(new Date())
            .find(part => part.type === 'timeZoneName')?.value} 
        </p>
        <img className='inline' src='/media/world.png' alt='Globe pixel art icon'></img>
        <Clock/>
      </div>
    </div>
  );
}

export default Preheader;
