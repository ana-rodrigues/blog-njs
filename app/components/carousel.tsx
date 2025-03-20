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
  startY = 0;
  scrollLeft = 0;
  scrollInterval: NodeJS.Timeout | null = null;
  carouselRef = React.createRef<HTMLDivElement>();
  isScrollDirectionDetermined = false;
  isHorizontalScroll = false;
  initialDragDistance = 0;

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
  }

  componentWillUnmount() {
    this.stopAutoScroll();
  }

  // Enhanced stop auto-scroll function
  stopAutoScroll = () => {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.stopAutoScroll();
    this.isDragging = true;
    this.startX = e.pageX - (this.carouselRef.current?.offsetLeft || 0);
    this.scrollLeft = this.carouselRef.current?.scrollLeft || 0;
  };

  handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    this.stopAutoScroll(); 
    this.isDragging = true;
    this.startX = e.touches[0].pageX - (this.carouselRef.current?.offsetLeft || 0);
    this.startY = e.touches[0].pageY;
    this.scrollLeft = this.carouselRef.current?.scrollLeft || 0;
    
    // Reset scroll direction detection for new touch
    this.isScrollDirectionDetermined = false;
    this.isHorizontalScroll = false;
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

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.isDragging) return;
    
    const x = e.pageX - (this.carouselRef.current?.offsetLeft || 0);
    const dragDistance = x - this.startX;
    
    // Apply resistance to the drag distance
    const resistedDistance = this.applyDragResistance(dragDistance);
    
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollLeft = this.scrollLeft - resistedDistance; // Invert direction
      
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

  handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!this.isDragging) return;
    
    const touchY = e.touches[0].pageY;
    const touchX = e.touches[0].pageX;
    
    // Calculate movement in both directions
    const xDiff = Math.abs(touchX - this.startX);
    const yDiff = Math.abs(touchY - this.startY);
    
    // Determine scroll direction if not already determined
    if (!this.isScrollDirectionDetermined) {
      // Require a minimum movement threshold before determining direction (8px)
      // Increased from 5px to make it easier to scroll vertically
      if (xDiff > 24 || yDiff > 24) {
        this.isHorizontalScroll = xDiff > yDiff;
        this.isScrollDirectionDetermined = true;
      }
    }
    
    // If horizontal scrolling, handle carousel movement
    if (this.isHorizontalScroll) {
      // Only prevent default for horizontal scrolling to allow vertical scrolling
      e.preventDefault(); 
      
      const x = touchX - (this.carouselRef.current?.offsetLeft || 0);
      const dragDistance = x - this.startX;
      
      // Apply resistance to the drag distance
      const resistedDistance = this.applyDragResistance(dragDistance);
      
      if (this.carouselRef.current) {
        this.carouselRef.current.scrollLeft = this.scrollLeft - resistedDistance; // Invert direction
        
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
    // For vertical scrolling, we don't call preventDefault()
    // This allows the browser to handle vertical scrolling naturally
  };

  // Helper method to apply resistance to dragging
  applyDragResistance = (distance: number): number => {
    // The resistance factor determines how much resistance to apply
    // Lower values = more resistance
    const resistanceFactor = 0.8;
    
    // Apply a non-linear resistance that increases with distance
    // This creates a natural feeling of increasing resistance
    return distance * resistanceFactor;
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

    this.scrollInterval = setInterval(scroll, 45);
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
        onTouchMove={(e) => this.handleTouchMove(e)}
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