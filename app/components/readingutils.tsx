"use client"

import Link from "next/link";
import styles from './readingutils.module.css';
import { Undo2, Clock1 } from 'lucide-react';


export function ReadingUtils({ postLength }) {
  const readingTime = Math.max(1, Math.ceil(postLength / 200));
  
  return (
    <div className={styles.readingUtilsWrapper}>
      <div className={styles.readingUtilsBar}>
        <Link href="/blog" className={`monoSm ${styles.backLink}`}>
          <Undo2 size={16} className={styles.icon} />
          <span>Return to blog</span>
        </Link>
        
        <div className={styles.divider}></div>
        
        <div className={`monoSm ${styles.readingTime}`}>
          <Clock1 size={16} className={styles.icon} />
          <span>{readingTime} min</span>
        </div>
      </div>
    </div>
  );
}

export default ReadingUtils;
