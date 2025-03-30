"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './showcase.module.css';

export function Showcase() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [loadedImages, setLoadedImages] = React.useState<Record<number, boolean>>({});
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
  
  const showcaseImages = [
    { src: '/media/thumb-pour.png' },
    { src: '/media/thumb-navro.png' },
    { src: '/media/thumb-defiance.png' },
    { src: '/media/thumb-offwhite.png' },
    { src: '/media/thumb-swell.png' }
  ];
  
  React.useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [showcaseImages[0].src, showcaseImages[1].src];
      imagesToPreload.forEach(src => {
        const img = new window.Image();
        img.src = src;
      });
    };
    
    // Use requestIdleCallback for better performance
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadImages);
      } else {
        setTimeout(preloadImages, 200);
      }
    }
  }, []);
  
  // Handle image load state in a more efficient way
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };


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
        ref={emblaRef}
        role="region"
        aria-label="Image showcase carousel"
        tabIndex={0}>
        <div className={styles.container}>
          {showcaseImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={image.src}
                  alt={`Showcase image ${index + 1}`}
                  width={1000}
                  height={1000}
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 50vw"
                  priority={index === 0}
                  quality={index === 0 ? 85 : 60}
                  className={`${styles.showcaseImage} ${loadedImages[index] ? styles.imageLoaded : styles.imageLoading}`}
                  draggable="false"
                  loading={index < 2 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                /> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}