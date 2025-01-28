"use client";

import React, { useState } from 'react';
import { Carousel } from '@shadcn/ui';
import styles from './gallery.module.css';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const thumbnails = [
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
    '/media/swell-thumb.png',
  ];

  return (
    <div>
      <div className={styles.thumbnailGrid}>
        {thumbnails.map((src, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(src)}
          >
            <img src={src} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className={`${styles.overlay} ${styles.show}`} onClick={() => setSelectedImage(null)}>
          <div className={styles.carouselContainer} onClick={(e) => e.stopPropagation()}>
            <Carousel>
              {thumbnails.map((src, index) => (
                <Carousel.Item key={index}>
                  <img src={src} alt={`Large view ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;