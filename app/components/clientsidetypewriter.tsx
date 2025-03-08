'use client';

import { Typewriter } from 'react-simple-typewriter';

interface ClientSideTypewriterProps {
  words: string[];
}

export default function ClientSideTypewriter({ words }: ClientSideTypewriterProps) {
  return (
    <Typewriter
      words={words}
      loop={0}
      cursor
      cursorStyle='_'
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
    />
  );
}