import { useState, useEffect } from 'react';

export function HeroFPVVideo() {
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setVideoReady(true);
    // Auto-start on mount if autoplay is supported
    const video = document.querySelector('video[data-hero-fpv]');
    if (video && video.play) {
      video.play().catch(() => {
        // Autoplay likely blocked by browser
        console.info('Video autoplay blocked by browser policy');
      });
    }
  }, []);

  return (
    <div className="hero-fpv-container relative w-full h-screen max-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full">
        {videoReady ? (
          <video
            data-hero-fpv
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
            poster="/lovable-uploads/higgsfield/hero-fpv/final/domus-hero-poster.jpg"
          >
            {/* Modern browsers - AV1 (if available) */}
            <source
              src="/lovable-uploads/higgsfield/hero-fpv/final/domus-hero-fpv-1920x820.av1.webm"
              type='video/webm;codecs="av01.0.05M.08"'
            />
            {/* Modern browsers - VP9 */}
            <source
              src="/lovable-uploads/higgsfield/hero-fpv/final/domus-hero-fpv-1920x820.webm"
              type="video/webm"
            />
            {/* Fallback - H.264 for all browsers */}
            <source
              src="/lovable-uploads/higgsfield/hero-fpv/final/domus-hero-fpv-1920x820.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(50,30,20,0.8)] to-[rgba(20,10,5,0.9)]" />
        )}
      </div>

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.5)]" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Main Content */}
        <div className="relative z-10 max-w-4xl text-center">
          {/* Accent Line */}
          <div className="mb-8 flex justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal italic leading-tight text-[var(--cream)]">
            Domus Jurere
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-[var(--cream-dk)] tracking-wide">
            Ultra Luxury Suites in Paradise
          </p>

          {/* Description */}
          <p className="mt-8 mx-auto max-w-2xl text-sm md:text-base text-[var(--cream-dk)] leading-relaxed opacity-90">
            Experience architectural perfection where contemporary design meets natural beauty.
            Each suite crafted for discerning guests seeking the pinnacle of coastal luxury.
          </p>

          {/* CTA Button */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#quartos"
              data-hover
              className="btn-cta-primary inline-block"
            >
              Explore Suites
            </a>
            <a
              href="https://wa.me/message"
              target="_blank"
              rel="noreferrer"
              data-hover
              className="px-8 py-3 border border-[var(--gold)] text-[var(--gold)] hover:bg-[rgba(212,188,128,0.1)] transition-colors duration-300 text-sm font-semibold tracking-wider"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Video Status Indicator */}
        {!isPlaying && (
          <div className="absolute bottom-8 right-8 z-20">
            <div className="text-xs text-[var(--cream-dk)] opacity-60">
              Loading...
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-[var(--gold)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Component Optimization Notes:
 * 
 * - Uses autoPlay with fallback for browsers that block it
 * - muted attribute required for autoplay to work
 * - playsInline for better mobile behavior
 * - Multiple video sources for browser compatibility (AV1 > VP9 > H.264)
 * - Poster image serves as fallback while loading
 * - Gradient overlays ensure text readability
 * - Content centered in safe area for all aspect ratios
 * - Lazy loading: video only loads when component mounts
 * 
 * Performance Tips:
 * - Consider lazy loading the component itself with React.lazy()
 * - Implement progressive video quality based on connection speed
 * - Use CDN for video delivery with regional edge caching
 * - Monitor Core Web Vitals (LCP, CLS, FID)
 * - Test on real 4G/5G devices before production
 */
