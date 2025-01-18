"use client";

import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div><label className="clock">{time}</label></div>;
};

export default Clock;