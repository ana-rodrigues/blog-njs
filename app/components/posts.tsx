'use client';

import { useEffect, useState, useMemo, useCallback } from 'react'
import { BlogPost } from 'app/feed/utils'
import styles from './posts.module.css'
import CategoryFilter from './categoryfilter'
import MediaPost from './mediapost'
import Post from './post'
import Note from './notepost'

export function BlogPosts() {
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Extract unique categories from blog posts
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        allBlogs
          .map(blog => blog.metadata.category)
          .filter(Boolean) as string[]
      )
    );
  }, [allBlogs]);

  // Filter posts by category and sort by date (newest first)
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = [...allBlogs];
    
    // Apply category filter if active
    if (activeCategory) {
      filtered = filtered.filter(blog => blog.metadata.category === activeCategory);
    }
    
    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
  }, [allBlogs, activeCategory]);

  // Handle category change with animation - optimized for responsiveness
  const handleCategoryChange = useCallback((category: string | null) => {
    if (category !== activeCategory) {
      setIsTransitioning(true);
      setActiveCategory(category);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      });
    }
  }, [activeCategory]);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts', { 
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setAllBlogs(data);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        if (isMounted) {
          setError('Failed to load posts');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, [])

  if (isLoading) {
    return <div className={styles.loadingContainer}>
      <p className='monoSm'>Loading posts...</p>
    </div>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (allBlogs.length === 0) {
    return <p>No posts available</p>
  }

  return (
    <div className="container">
      {activeCategory && (
        <h2 className={`visuallyHidden ${styles.categoryHeading}`}>
          Showing <span className={styles.categoryName}>
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </span>
        </h2>
      )}
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className={isTransitioning ? styles.fadeExit : styles.fadeEnterActive}>
        {filteredAndSortedBlogs.length === 0 ? (
          <p className={styles.noResults}>No posts found for this category</p>
        ) : (
          <div className={styles.blogList}>
            {filteredAndSortedBlogs.map((post) => {
              switch (post.metadata.category) {
                case 'notes':
                  return <Note key={post.slug} post={post} />
                case 'experiments':
                  return <MediaPost key={post.slug} post={post} />
                case 'articles':
                  return <Post key={post.slug} post={post} />
                default:
                  return <Post key={post.slug} post={post} />
              }
            })}
          </div>
        )}
      </div>
    </div>
  )
}
 