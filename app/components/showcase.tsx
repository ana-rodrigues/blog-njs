"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './showcase.module.css';

export function Showcase() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      dragFree: false,
      inViewThreshold: 0.7,
      skipSnaps: false,
      slidesToScroll: 1,
      duration: 70
    },
    [AutoScroll({ 
      speed: 0.8, 
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

  return (
    <div className={styles.showcaseContainer}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((src, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={src}
                  alt={`Showcase image ${index + 1}`}
                  width={2000}
                  height={2000}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index < 5}
                  quality={90}
                  className={styles.showcaseImage}
                  draggable="false"
                  unoptimized={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}