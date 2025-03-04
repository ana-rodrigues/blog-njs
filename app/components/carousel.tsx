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
  const [autoScrollSpeed] = useState(0.5); // Lower value for smoother animation

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
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Adjusts the scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Adjusts the scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk; // Invert direction
    }
  };

  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const restartAutoScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    stopAutoScroll();

    const scroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        // Smooth reset by stepping back instead of jumping
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += autoScrollSpeed;
      }
    };

    // Using requestAnimationFrame for smoother scrolling
    const animateScroll = () => {
      scroll();
      const id = requestAnimationFrame(animateScroll);
      setScrollInterval(id as unknown as NodeJS.Timeout);
    };

    const id = requestAnimationFrame(animateScroll);
    setScrollInterval(id as unknown as NodeJS.Timeout);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    restartAutoScroll();

    const touchMoveHandler = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    
    carousel.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      if (scrollInterval) {
        cancelAnimationFrame(scrollInterval as unknown as number);
      }
      carousel.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

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
      style={{ touchAction: 'pan-x' }}
    >
      <div className={styles.carousel}>
        {images.concat(images).map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Carousel image ${index + 1}`}
            loading="eager" // Ensure images load quickly
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;