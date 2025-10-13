// Image optimization utilities

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  blur?: number;
}

/**
 * Generate optimized image URL with parameters
 * This is a placeholder - in production, you'd use a service like Cloudinary, ImageKit, or similar
 */
export const getOptimizedImageUrl = (
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    blur = 0
  } = options;

  // For local images, return as-is (they should be optimized during build)
  if (originalUrl.startsWith('/')) {
    return originalUrl;
  }

  // For external images, you can add optimization parameters
  // Example with Cloudinary:
  // return `https://res.cloudinary.com/your-cloud/image/fetch/w_${width},h_${height},q_${quality},f_${format}/${encodeURIComponent(originalUrl)}`;
  
  // For now, return original URL
  return originalUrl;
};

/**
 * Generate responsive image srcset
 */
export const getResponsiveImageSrcSet = (
  originalUrl: string,
  sizes: number[] = [400, 800, 1200, 1600]
): string => {
  return sizes
    .map(size => `${getOptimizedImageUrl(originalUrl, { width: size })} ${size}w`)
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (urls: string[]): Promise<void[]> => {
  return Promise.allSettled(urls.map(preloadImage)).then(results => 
    results.map(result => 
      result.status === 'fulfilled' ? Promise.resolve() : Promise.reject(result.reason)
    )
  );
};

/**
 * Generate placeholder for images
 */
export const generateImagePlaceholder = (width: number, height: number): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
