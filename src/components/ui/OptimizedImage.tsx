import { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  showSkeleton?: boolean;
}

export function OptimizedImage({ src, alt, showSkeleton = true, className = "", ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Convert jpg to webp path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative overflow-hidden bg-[rgba(0,0,0,0.1)]">
      {isLoading && showSkeleton && (
        <div className={`absolute inset-0 bg-gradient-to-r from-[rgba(212,175,100,0.1)] via-[rgba(212,175,100,0.05)] to-[rgba(212,175,100,0.1)] animate-pulse ${className}`} />
      )}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          {...props}
        />
      </picture>
    </div>
  );
}
