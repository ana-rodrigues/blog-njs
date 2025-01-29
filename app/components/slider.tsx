import React from 'react'
import styles from './slider.module.css';

interface SliderProps {
  thumbnails: string[];
}

const Slider: React.FC<SliderProps> = ({ thumbnails }) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {thumbnails.map((src, index) => (
          <div key={index} className={styles.slide}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider