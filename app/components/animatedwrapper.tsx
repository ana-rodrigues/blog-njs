"use client"

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './animatedwrapper.module.css';

interface AnimatedWrapperProps {
  children: ReactNode;
}

export default function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      style={{ overflow: 'hidden' }}
      className={`${styles.animatedwrapper}`}
    >
      {children}
    </motion.div>
  );
}