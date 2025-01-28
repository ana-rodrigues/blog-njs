"use client";

import React, { useState, useEffect } from 'react';
import styles from './clock.module.css';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon' }));
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (time === null) {
    return null;
  }

  return <div className={styles.clock}>
    <p className="monoMd">{time}</p>
  </div>;
};

export default Clock;