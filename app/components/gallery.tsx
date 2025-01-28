"use client";

import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './gallery.module.css';

interface GalleryProps {
  thumbnails: string[];
}

const Gallery: React.FC<GalleryProps> = ({ thumbnails }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean, label: string) => (
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        onKeyDown={(e) => handleKeyDown(e, onClickHandler)}
        className={`${styles.customArrow} ${styles.customArrowPrev} ${styles.monoSm}`}
        aria-label={label}
      >
        Prev
      </button>
    )
  );

  const renderArrowNext = (onClickHandler: () => void, hasNext: boolean, label: string) => (
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        onKeyDown={(e) => handleKeyDown(e, onClickHandler)}
        className={`${styles.customArrow} ${styles.customArrowNext} ${styles.monoSm}`}
        aria-label={label}
      >
        Next
      </button>
    )
  );

  const handleKeyDown = (e: React.KeyboardEvent, onClickHandler: () => void) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      onClickHandler();
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(thumbnails[index]);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsExiting(false);
    }, 100);
  };

  return (
    <div>
      <div className={styles.thumbnailGrid}>
        {thumbnails.map((src, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => handleSlideChange(index)}
          >
            <img src={src} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className={`${styles.overlay} ${styles.show}`} onClick={handleClose}>
          <div className={`${styles.carouselContainer} ${isExiting ? styles.exit : ''}`} onClick={(e) => e.stopPropagation()}>
            <Carousel
              className={styles.customCarousel}
              showArrows={true}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              selectedItem={currentIndex}
              onChange={handleSlideChange}
              renderArrowPrev={renderArrowPrev}
              renderArrowNext={renderArrowNext}
            >
              {thumbnails.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`Large view ${index + 1}`} className={styles.carouselImage} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;