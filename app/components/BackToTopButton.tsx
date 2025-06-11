"use client";
import React, { useEffect, useState } from "react";
import styles from "./backtotopbutton.module.css";

const SCROLL_THRESHOLD = 200;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={styles.backToTop + (visible ? " " + styles.visible : "")}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      ↑ Top
    </button>
  );
}
