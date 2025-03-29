"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './showcase.module.css';

export function Showcase() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      dragFree: false,
      inViewThreshold: 0.7,
      skipSnaps: false,
      slidesToScroll: 1,
      duration: 25,
      containScroll: false
    },
    [AutoScroll({ 
      speed: 0.5,
      direction: 'forward',
      stopOnInteraction: false,
      startDelay: 0
    })]
  );
  
  const images = [
    '/media/thumb-55.png',
    '/media/thumb-pour.png',
    '/media/thumb-navro.png',
    '/media/thumb-defiance.png',
    '/media/thumb-offwhite.png',
    '/media/thumb-swell.png', 
  ];
  


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
                    sizes="(max-width: 800px) 40vw, 75vw"
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