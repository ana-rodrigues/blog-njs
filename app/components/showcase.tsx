"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './showcase.module.css';

export function Showcase() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      dragFree: false,
      inViewThreshold: 0.7,
      skipSnaps: false,
      slidesToScroll: 1,
      duration: 25, // Faster duration for smoother looping transitions
      containScroll: false // Allow overscrolling for smoother looping
    },
    [AutoScroll({ 
      speed: isInitializing ? 0.1 : 0.8,
      direction: 'forward',
      stopOnInteraction: false,
      startDelay: 0
    })]
  );
  
  const images = [
    '/media/thumb-offwhite1.png',
    '/media/thumb-pour.png',
    '/media/thumb-navro.png',
    '/media/thumb-defiance.png',
    '/media/thumb-offwhite2.png',
    '/media/thumb-swell.png',
    '/media/thumb-browns.png', 
  ];
  
  // Handle the smooth initialization of auto-scroll
  React.useEffect(() => {
    if (isInitializing) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing]);

  // Set up event handlers for drag interactions
  React.useEffect(() => {
    if (emblaApi) {
      const onPointerDown = () => setIsDragging(true);
      const onPointerUp = () => setIsDragging(false);
      
      emblaApi.on('pointerDown', onPointerDown);
      emblaApi.on('pointerUp', onPointerUp);
      
      // Also handle when pointer leaves the carousel area
      const handlePointerLeave = () => setIsDragging(false);
      const viewportNode = emblaApi.rootNode();
      viewportNode.addEventListener('pointerleave', handlePointerLeave);
      
      return () => {
        emblaApi.off('pointerDown', onPointerDown);
        emblaApi.off('pointerUp', onPointerUp);
        viewportNode.removeEventListener('pointerleave', handlePointerLeave);
      };
    }
  }, [emblaApi]);

  return (
    <div className={styles.showcaseContainer}>
      <div 
        className={`${styles.viewport} ${isDragging ? styles.dragging : ''}`} 
        ref={emblaRef}>
        <div className={styles.container}>
          {images.map((src, index) => {
            const [isLoaded, setIsLoaded] = React.useState(false);
            
            return (
              <div key={index} className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={src}
                    alt={`Showcase image ${index + 1}`}
                    width={2000}
                    height={2000}
                    sizes="(max-width: 800px) 50vw, 75vw"
                    priority={index < 5}
                    quality={90}
                    className={`${styles.showcaseImage} ${isLoaded ? styles.imageLoaded : styles.imageLoading}`}
                    draggable="false"
                    unoptimized={false}
                    onLoad={() => setIsLoaded(true)}
                  /> 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}