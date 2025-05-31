/**
 * Shared types for MDX components
 */

// Define interface for the MDX content
export interface MDXContent {
  compiledSource: string;
  frontmatter?: Record<string, any>;
  scope?: Record<string, any>;
}

// Props for the MDX client renderer
export interface MDXClientRendererProps {
  content: string;
}

// Common component props
export interface MDXComponentProps {
  children: React.ReactNode;
}

// Link component props
export interface MDXLinkProps extends MDXComponentProps {
  href: string;
}

// Code component props
export interface MDXCodeProps extends MDXComponentProps {
  className?: string;
}

// Image component props
export interface MDXImageProps {
  src: string;
  alt?: string;
}
