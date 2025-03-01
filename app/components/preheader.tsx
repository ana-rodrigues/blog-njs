"use client";

import styles from './preheader.module.css';
import React from 'react';
import Clock from './clock';
import { Typewriter } from 'react-simple-typewriter';

const Preheader = () => {
  return (
    <div className={`container ${styles.preheader}`}>
      <h1 className="visuallyHidden">The digital bureau of Ana Rodrigues, Product Experience Designer</h1>

      <div className={styles.preheaderLeft}>
        <p className='monoMd'>
          <Typewriter
            words={['Ana Fernandes Rodrigues', 'Product experience designer']}
            loop={0}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
      </div>

      <div className={styles.preheaderRight}>
        <p className='monoMd'>Lisbon UTC+0</p>
        <img className='inline' src='/media/world.png' alt='Globe pixel art icon'></img>
        <Clock/>
      </div>
    </div>
  );
}

export default Preheader;
