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
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    // Stop autoscroll on MouseDown
    stopAutoScroll();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    // Stop autoscroll on TouchStart
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    restartAutoScroll();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    restartAutoScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjusts the scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk; // Invert direction
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjusts the scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk; // Invert direction
    }
  };

  // Add a dedicated function to stop autoscroll
  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const restartAutoScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Always make sure to clear any existing interval first
    stopAutoScroll();

    const scroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll,30);
    setScrollInterval(interval);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Initialize auto-scroll
    restartAutoScroll();

    const touchMoveHandler = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    
    carousel.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      stopAutoScroll();
      carousel.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);  // Remove isDragging from dependencies to avoid re-initializing

  return (
    <div 
      className={`full ${styles.carouselContainer}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      ref={carouselRef}
      style={{ touchAction: 'pan-x' }} // Change to pan-x to only allow horizontal movement
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