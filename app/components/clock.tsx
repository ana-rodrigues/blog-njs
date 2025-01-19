"use client";

import React, { useState, useEffect } from 'react';

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
    return null; // or a loading spinner
  }

  return <div><p className="clock">{time}</p></div>;
};

export default Clock;