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
  
  // Define image data with appropriate dimensions and formats
  const showcaseImages = [
    {
      src: '/media/thumb-55.png',
      blur: '/media/thumb-55-tiny.webp',
    },
    {
      src: '/media/thumb-pour.png',
      blur: '/media/thumb-pour-tiny.webp',
    },
    {
      src: '/media/thumb-navro.png',
      blur: '/media/thumb-navro-tiny.webp',
    },
    {
      src: '/media/thumb-defiance.png',
      blur: '/media/thumb-defiance-tiny.webp',
    },
    {
      src: '/media/thumb-offwhite.png',
      blur: '/media/thumb-offwhite-tiny.webp',
    },
    {
      src: '/media/thumb-swell.png',
      blur: '/media/thumb-swell-tiny.webp',
    }
  ];
  
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
                  width={600}
                  height={600}
                  sizes="(max-width: 800px) 40vw, 60vw"
                  priority={index === 1}
                  quality={75}
                  className={`${styles.showcaseImage} ${loadedImages[index] ? styles.imageLoaded : styles.imageLoading}`}
                  draggable="false"
                  loading={index < 2 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                  placeholder="blur"
                  blurDataURL={image.blur}
                /> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}