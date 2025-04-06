'use client';

import Image from 'next/image'
import { formatDate, BlogPost } from 'app/feed/utils'
import styles from './mediapost.module.css'
import { useState, useRef, useEffect } from 'react'

type MediaPostProps = {
  post: BlogPost
}

const getMediaType = (url: string | undefined): 'image' | 'video' => {
  if (!url) return 'image'
  const extension = url.split('.').pop()?.toLowerCase()
  return extension === 'mp4' ? 'video' : 'image'
}

export default function MediaPost({ post }: MediaPostProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mediaType = getMediaType(post.metadata.image);

  // Intersection Observer to detect when video is in viewport
  useEffect(() => {
    if (!videoRef.current || mediaType !== 'video') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        
        // Play video when in view, pause when out of view
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(err => console.log('Auto-play prevented:', err));
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the video is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [mediaType]);
  
  // Handle video load events
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };
  
  if (!post.metadata.image) {
    return (
      <article
        key={post.slug}
        className={`${styles.post}`}>
        <div className={`${styles.postContent}`}>
          <div className={`${styles.postMeta}`}>
            <p className="monoSm">{formatDate(post.metadata.publishedAt, false)}</p>
            <p className="monoSm">{post.metadata.category}</p>
          </div>
          <div className='paragraphMd'>{post.metadata.title}</div>
        </div>
      </article>
    )
  }

  return (
    <article
      key={post.slug}
      className={`${styles.post}`}>
      <div className={`${styles.postContent}`}>
        <div className={`${styles.postMeta}`}>
          <p className="monoSm">{formatDate(post.metadata.publishedAt, false)}</p>
          <p className="monoSm">{post.metadata.category}</p>
        </div>
        <div 
          ref={containerRef}
          className={`${styles.mediaContainer}`}
        >
          {mediaType === 'video' ? (
            <div className={`${styles.videoWrapper} ${!isVideoLoaded ? styles.loading : ''}`}>
              <video
                ref={videoRef}
                className={`${styles.postImage} ${isVideoLoaded ? styles.loaded : ''}`}
                playsInline
                autoPlay={isInView}
                loop
                muted
                preload="metadata"
                onLoadedData={handleVideoLoaded}
              >
                <source src={post.metadata.image} type="video/mp4" />
              </video>
            </div>
          ) : (
            <Image
              src={post.metadata.image}
              alt={post.metadata.alt || post.metadata.title}
              className={`${styles.postImage}`}
              width={800}
              height={450}
              quality={85}
              loading="eager"
              priority={true}
            />
          )}
        </div>
        <div className='paragraphMd'>{post.metadata.title}</div>
      </div>
    </article>
  )
}