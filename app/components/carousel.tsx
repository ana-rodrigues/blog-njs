"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './carousel.module.css';

const Carousel: React.FC = () => {
  const images = [
    '/media/thumb-offwhite1.png',
    '/media/thumb-pour.png',
    '/media/thumb-navro.png',
    '/media/thumb-defiance.png',
    '/media/thumb-offwhite2.png',
    '/media/thumb-swell.png',
    '/media/thumb-browns.png', 
  ];

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    // Stop autoscroll on MouseDown

  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjusts the scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scroll = () => {
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth / 2;
      } else {
        carousel.scrollLeft -= 1;
      }
    };
      // Invert scroll direction

    const interval = setInterval(scroll, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`full ${styles.carouselContainer}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={carouselRef}
    >
      <div className={styles.carousel}>
        {images.concat(images).map((src, index) => (
          <img key={index} src={src} alt={`Carousel image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;