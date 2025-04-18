"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './showcase.module.css';

export function Showcase() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [loadedImages, setLoadedImages] = React.useState<Record<number, boolean>>({});
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    isMounted ? { 
      loop: true,
      align: 'center',
      dragFree: false,
      inViewThreshold: 0.7,
      skipSnaps: false,
      slidesToScroll: 1,
      duration: 30,
      containScroll: 'trimSnaps' 
    } : {},
    isMounted ? [AutoScroll({ 
      speed: 0.7,
      direction: 'forward',
      stopOnInteraction: false,
      startDelay: 0
    })] : []
  );
  
  const showcaseImages = [
    { 
      desktop: '/media/thumb-pour.png',
      tablet: '/media/thumb-pour-tablet.png',
      mobile: '/media/thumb-pour-mobile.png'
    },
    { 
      desktop: '/media/thumb-55.png',
      tablet: '/media/thumb-55-tablet.png',
      mobile: '/media/thumb-55-mobile.png'
    },
    { 
      desktop: '/media/thumb-defiance.png',
      tablet: '/media/thumb-defiance-tablet.png',
      mobile: '/media/thumb-defiance-mobile.png'
    },
    { 
      desktop: '/media/thumb-offwhite.png',
      tablet: '/media/thumb-offwhite-tablet.png',
      mobile: '/media/thumb-offwhite-mobile.png'
    },
    { 
      desktop: '/media/thumb-swell.png',
      tablet: '/media/thumb-swell-tablet.png',
      mobile: '/media/thumb-swell-mobile.png'
    }
  ];
  
  // Add a state to track the current screen size
  const [screenSize, setScreenSize] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    // Function to determine screen size
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const preloadImages = () => {
      // Preload the first two images based on current screen size
      const imagesToPreload = [
        showcaseImages[0][screenSize], 
        showcaseImages[1][screenSize]
      ];
      
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
  }, [screenSize]);
  
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
        className={`${styles.viewport} ${isDragging ? styles.dragging : ''} ${!isMounted ? styles.loading : ''}`} 
        ref={emblaRef}
        role="region"
        aria-label="Image showcase carousel"
        tabIndex={0}>
        <div className={styles.container}>
          {showcaseImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={image[screenSize]}
                  alt={`Showcase image ${index + 1}`}
                  width={1600}
                  height={1600}
                  sizes="(max-width: 480px) 85vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, 100vw"
                  priority={index === 0}
                  quality={85}
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