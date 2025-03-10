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

  // Enhanced stop auto-scroll function
  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoScroll();
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoScroll(); 
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      restartAutoScroll();
    }
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
      
      // Ensure smooth looping during manual scroll
      const carousel = carouselRef.current;
      const contentWidth = carousel.scrollWidth;
      const containerWidth = carousel.clientWidth;
      const maxScroll = contentWidth - containerWidth;
      
      // If we're at the beginning or end, handle looping
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = contentWidth / 3;
      } else if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = maxScroll / 2;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjusts the scroll speed
    
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk; // Invert direction
      
      // Same looping logic for touch
      const carousel = carouselRef.current;
      const contentWidth = carousel.scrollWidth;
      const containerWidth = carousel.clientWidth;
      const maxScroll = contentWidth - containerWidth;
      
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = contentWidth / 3;
      } else if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = maxScroll / 2;
      }
    }
  };

  // Improved auto-scroll with seamless looping
  const restartAutoScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Always clear any existing interval first
    stopAutoScroll();

    const scroll = () => {
      if (!carousel) return;
      
      const contentWidth = carousel.scrollWidth;
      const containerWidth = carousel.clientWidth;
      const maxScroll = contentWidth - containerWidth;
      
      // Logic for seamless looping
      if (carousel.scrollLeft >= maxScroll) {
        // When we reach the end, jump back to first duplicate set
        carousel.scrollLeft = containerWidth; 
      } else {
        carousel.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    setScrollInterval(interval);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Position at the start of middle set for seamless scrolling
    setTimeout(() => {
      if (carousel) {
        carousel.scrollLeft = carousel.scrollWidth / 3;
      }
    }, 100);

    // Initialize auto-scroll
    restartAutoScroll();

    const touchMoveHandler = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    
    // Add direct event listeners to ensure they're captured properly
    carousel.addEventListener('mousedown', () => stopAutoScroll(), { passive: false });
    carousel.addEventListener('touchstart', () => stopAutoScroll(), { passive: false });
    carousel.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      stopAutoScroll();
      carousel.removeEventListener('mousedown', () => stopAutoScroll());
      carousel.removeEventListener('touchstart', () => stopAutoScroll());
      carousel.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);  // Empty dependency array

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
    >
      <div className={styles.carousel}>
        {/* Triple the images for smoother infinite scrolling */}
        {[...images, ...images, ...images].map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Carousel image ${(index % images.length) + 1}`}
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;