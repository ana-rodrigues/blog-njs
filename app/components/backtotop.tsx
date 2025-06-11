"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./backtotop.module.css";
import { TbArrowUp } from "react-icons/tb";

interface BackToTopProps {
  threshold?: number;
  label?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({ 
  threshold = 200,
  label = "Scroll to top"
}) => {
  const [visible, setVisible] = useState(false);

  // Memoize the scroll handler for better performance
  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <TbArrowUp aria-hidden="true" />
      <span aria-hidden="true">Top</span>
    </button>
  );
};

export default BackToTop;
