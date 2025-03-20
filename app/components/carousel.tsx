"use client";

import React from 'react';
import styles from './carousel.module.css';

class Carousel extends React.Component {
  // Images array
  images = [
    '/media/thumb-offwhite1.png',
    '/media/thumb-pour.png',
    '/media/thumb-navro.png',
    '/media/thumb-defiance.png',
    '/media/thumb-offwhite2.png',
    '/media/thumb-swell.png',
    '/media/thumb-browns.png', 
  ];

  // Class properties instead of useState
  isDragging = false;
  startX = 0;
  startY?: number;
  scrollLeft = 0;
  scrollInterval: NodeJS.Timeout | null = null;
  carouselRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const carousel = this.carouselRef.current;
    if (!carousel) return;

    // Position at the start of middle set for seamless scrolling
    setTimeout(() => {
      if (carousel) {
        carousel.scrollLeft = carousel.scrollWidth / 3;
      }
    }, 100);

    // Initialize auto-scroll
    this.restartAutoScroll();

    // Add direct event listeners to ensure they're captured properly
    carousel.addEventListener('mousedown', () => this.stopAutoScroll(), { passive: false });
    carousel.addEventListener('touchstart', () => this.stopAutoScroll(), { passive: false });
    carousel.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
  }

  componentWillUnmount() {
    const carousel = this.carouselRef.current;
    if (!carousel) return;
    
    this.stopAutoScroll();
    carousel.removeEventListener('mousedown', () => this.stopAutoScroll());
    carousel.removeEventListener('touchstart', () => this.stopAutoScroll());
    carousel.removeEventListener('touchmove', this.touchMoveHandler);
  }

  touchMoveHandler = (e) => {
    if (this.isDragging) {
      e.preventDefault();
    }
  };

  // Enhanced stop auto-scroll function
  stopAutoScroll = () => {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  };

  handleMouseDown = (e) => {
    this.stopAutoScroll();
    this.isDragging = true;
    this.startX = e.pageX - (this.carouselRef.current?.offsetLeft || 0);
    this.scrollLeft = this.carouselRef.current?.scrollLeft || 0;
  };

  handleTouchStart = (e) => {
    this.stopAutoScroll(); 
    this.isDragging = true;
    this.startX = e.touches[0].pageX - (this.carouselRef.current?.offsetLeft || 0);
    this.scrollLeft = this.carouselRef.current?.scrollLeft || 0;
  };

  handleMouseLeave = () => {
    if (this.isDragging) {
      this.isDragging = false;
      this.restartAutoScroll();
    }
  };

  handleMouseUp = () => {
    this.isDragging = false;
    this.restartAutoScroll();
  };

  handleTouchEnd = () => {
    this.isDragging = false;
    this.restartAutoScroll();
  };

  handleMouseMove = (e) => {
    if (!this.isDragging) return;
    
    const x = e.pageX - (this.carouselRef.current?.offsetLeft || 0);
    const walk = (x - this.startX) * 2; // Adjusts the scroll speed
    
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollLeft = this.scrollLeft - walk; // Invert direction
      
      // Ensure smooth looping during manual scroll
      const carousel = this.carouselRef.current;
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

  handleTouchMove = (e) => {
    if (!this.isDragging) return;
    
    // Only prevent default if it's a horizontal drag
    // This allows vertical scrolling on mobile
    const touchY = e.touches[0].pageY;
    const touchX = e.touches[0].pageX;
    
    // If the user is primarily moving horizontally, prevent default to enable carousel drag
    // Otherwise, allow the page to scroll vertically
    const xDiff = Math.abs(touchX - this.startX);
    const yDiff = Math.abs(touchY - (this.startY || touchY));
    
    // Store startY if not already set
    if (!this.startY) {
      this.startY = touchY;
    }
    
    // If horizontal movement is greater than vertical, prevent default
    if (xDiff > yDiff) {
      e.preventDefault();
      
      const x = touchX - (this.carouselRef.current?.offsetLeft || 0);
      const walk = (x - this.startX) * 2; // Adjusts the scroll speed
      
      if (this.carouselRef.current) {
        this.carouselRef.current.scrollLeft = this.scrollLeft - walk; // Invert direction
        
        // Same looping logic for touch
        const carousel = this.carouselRef.current;
        const contentWidth = carousel.scrollWidth;
        const containerWidth = carousel.clientWidth;
        const maxScroll = contentWidth - containerWidth;
        
        if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft = contentWidth / 3;
        } else if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollLeft = maxScroll / 2;
        }
      }
    }
  };

  // Improved auto-scroll with seamless looping
  restartAutoScroll = () => {
    const carousel = this.carouselRef.current;
    if (!carousel) return;

    // Always clear any existing interval first
    this.stopAutoScroll();

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

    this.scrollInterval = setInterval(scroll, 30);
  };

  render() {
    return (
      <div 
        className={`full ${styles.carouselContainer}`}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        ref={this.carouselRef}
      >
        <div className={styles.carousel}>
          {/* Triple the images for smoother infinite scrolling */}
          {[...this.images, ...this.images, ...this.images].map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt={`Carousel image ${(index % this.images.length) + 1}`}
              draggable="false"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;