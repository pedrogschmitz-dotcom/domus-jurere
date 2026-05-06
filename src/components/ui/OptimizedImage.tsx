import { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  showSkeleton?: boolean;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  showSkeleton = true,
  className = "",
  priority = false,
  loading,
  fetchPriority,
  decoding,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const canGenerateWebp = /\.(jpg|jpeg|png)$/i.test(src);
  const avifSrc = canGenerateWebp ? src.replace(/\.(jpg|jpeg|png)$/i, ".avif") : src;
  const webpSrc = canGenerateWebp ? src.replace(/\.(jpg|jpeg|png)$/i, ".webp") : src;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative overflow-hidden bg-[rgba(0,0,0,0.1)]">
      {isLoading && showSkeleton && (
        <div className={`absolute inset-0 bg-gradient-to-r from-[rgba(212,175,100,0.1)] via-[rgba(212,175,100,0.05)] to-[rgba(212,175,100,0.1)] animate-pulse ${className}`} />
      )}
      <picture>
        {canGenerateWebp && <source srcSet={avifSrc} type="image/avif" />}
        {canGenerateWebp && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : loading ?? "lazy"}
          fetchPriority={priority ? "high" : fetchPriority}
          decoding={decoding ?? "async"}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          {...props}
        />
      </picture>
    </div>
  );
}
