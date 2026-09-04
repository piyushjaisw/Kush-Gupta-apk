import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Heart, Sparkles, Download, Check } from 'lucide-react';
import { PhotoItem, LOCKED_DETAILS } from '../../types';
import { PHOTO_CAPTIONS } from '../../data/defaultPhotos';
import { triggerHaptic } from '../../utils/haptics';

interface MemoryGalleryProps {
  photos: PhotoItem[];
  onNext: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const total = Math.max(photos.length, 1);
  const currentPhoto = photos[currentIndex] || photos[0];

  // Auto-play interval
  useEffect(() => {
    if (!isAutoplay || isDragging || photos.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4800);

    return () => clearInterval(timer);
  }, [isAutoplay, isDragging, photos.length, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
    triggerHaptic('light');
  };

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!currentPhoto?.url) return;

    triggerHaptic('medium');
    setIsDownloading(true);

    try {
      const filename = `kush-gupta-memory-${String(currentIndex + 1).padStart(2, '0')}.jpg`;
      const url = currentPhoto.url;

      if (url.startsWith('data:') || url.startsWith('blob:')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        try {
          const res = await fetch(url, { mode: 'cors' });
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1500);
        } catch {
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to download photo:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Drag swipe handler for touch and mouse
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const swipeThreshold = 50;
    const velocityThreshold = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> Advance to next photo
      triggerHaptic('light');
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> Return to previous photo
      triggerHaptic('light');
      handlePrev();
    }
  };

  // Caption selection
  const caption =
    currentPhoto?.caption ||
    PHOTO_CAPTIONS[currentIndex % PHOTO_CAPTIONS.length];

  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 sm:px-6 py-10 select-none">
      {/* Top Header Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between pt-2 pb-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-[0.3em] text-rose-400 uppercase font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Memory Vault</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
            Moments With {LOCKED_DETAILS.friendName.split(' ')[0]}
          </h2>
        </div>

        {/* Dynamic Counter: MEMORY 01 / TOTAL */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-mono text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
          <span>{formattedCurrent} / {formattedTotal}</span>
        </div>
      </div>

      {/* Main Single Large Photo Display Container with Touch Swipe */}
      <div className="relative w-full max-w-md sm:max-w-lg flex-1 flex flex-col items-center justify-center my-auto">
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex items-center justify-center touch-pan-y">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPhoto?.id || currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.08, filter: 'blur(12px)', x: direction * 40 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(12px)', x: -direction * 40 }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.45 },
                filter: { duration: 0.5 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.65}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.98 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07070a] transform-gpu cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Image with slow Ken-Burns cinematic zoom */}
              <motion.img
                src={currentPhoto?.url}
                alt={`Kush Gupta memory ${currentIndex + 1}`}
                animate={{ scale: [1, 1.06] }}
                transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                draggable={false}
                referrerPolicy="no-referrer"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Autoplay Progress Line at top of card */}
          {isAutoplay && !isDragging && (
            <motion.div
              key={`progress-${currentIndex}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.8, ease: 'linear' }}
              className="absolute top-0 left-0 h-[2px] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] z-20 pointer-events-none"
            />
          )}

          {/* Download Photo Button - Contextual on individual card view */}
          <div className="absolute top-3.5 right-3.5 z-30 pointer-events-auto">
            <button
              id={`gallery-download-photo-btn-${currentIndex + 1}`}
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md select-none ${
                downloadSuccess
                  ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'bg-black/60 hover:bg-black/85 border-white/20 hover:border-rose-400/50 text-white hover:text-rose-200 shadow-md'
              }`}
              title="Save this memory to your device"
              aria-label="Save this memory to your device"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium">Saved!</span>
                </>
              ) : (
                <>
                  <Download className={`w-3.5 h-3.5 text-rose-400 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span className="text-[11px]">Download</span>
                </>
              )}
            </button>
          </div>

          {/* Caption Box gracefully anchored at bottom */}
          <div className="absolute bottom-0 inset-x-0 p-5 z-20 pointer-events-none">
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-4 rounded-xl text-center border border-white/10 shadow-2xl"
            >
              <p className="text-sm sm:text-base text-white/95 serif-italic tracking-wide">
                "{caption}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* Swipe Hint for Mobile Devices */}
        <p className="text-[10px] font-mono text-neutral-400/80 tracking-widest uppercase flex items-center justify-center gap-1.5 mt-2.5">
          <span className="inline-block animate-pulse">←</span>
          <span>Swipe or click arrows to explore</span>
          <span className="inline-block animate-pulse">→</span>
        </p>

        {/* Mini Pagination Dots */}
        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                  triggerHaptic('light');
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Gallery Interactive Controls: Prev, Play/Pause, Download, Next */}
        <div className="mt-4 flex items-center justify-between w-full max-w-sm px-2 gap-2">
          <button
            id="gallery-prev-btn"
            onClick={handlePrev}
            className="p-3 rounded-full glass-card hover:border-white/25 text-neutral-300 hover:text-white transition-all shadow-md active:scale-90 cursor-pointer"
            title="Previous Memory"
            aria-label="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id="gallery-toggle-autoplay-btn"
            onClick={toggleAutoplay}
            className={`px-3.5 py-2 rounded-full border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoplay
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                : 'glass-card border-white/10 text-neutral-300 hover:border-white/20'
            }`}
            title={isAutoplay ? 'Pause auto-play' : 'Start auto-play'}
            aria-label={isAutoplay ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isAutoplay ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>AUTOPLAY</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            id="gallery-download-btn-bottom"
            onClick={handleDownload}
            disabled={isDownloading}
            className={`p-3 rounded-full glass-card border text-neutral-300 hover:text-white transition-all shadow-md active:scale-90 cursor-pointer ${
              downloadSuccess
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                : 'border-white/10 hover:border-white/25'
            }`}
            title="Download current photo"
            aria-label="Download current photo"
          >
            {downloadSuccess ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Download className="w-4 h-4 text-rose-300" />
            )}
          </button>

          <button
            id="gallery-next-btn"
            onClick={handleNext}
            className="p-3 rounded-full glass-card hover:border-white/25 text-neutral-300 hover:text-white transition-all shadow-md active:scale-90 cursor-pointer"
            title="Next Memory"
            aria-label="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Button to proceed to Screen 5 */}
      <div className="w-full max-w-md pt-4 pb-2 text-center">
        <button
          id="gallery-proceed-btn"
          onClick={onNext}
          className="bg-white text-black px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group inline-flex items-center gap-3 cursor-pointer"
        >
          <span>What Makes Kush Special</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
