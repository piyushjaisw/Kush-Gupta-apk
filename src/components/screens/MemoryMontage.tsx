import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { PhotoItem, LOCKED_DETAILS } from '../../types';

interface MemoryMontageProps {
  photos: PhotoItem[];
  onNext: () => void;
}

const MONTAGE_TEXTS = [
  'These moments...',
  'These memories...',
  'These laughs...',
  'These little things...',
  'Make a friendship special. ❤️',
];

export const MemoryMontage: React.FC<MemoryMontageProps> = ({
  photos,
  onNext,
}) => {
  // Use photos from index 1 onward if available, or all photos
  const montagePhotos = photos.length > 1 ? photos.slice(1) : photos;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  // Cycle photos and text automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % montagePhotos.length);
      setTextIndex((prev) => (prev + 1) % MONTAGE_TEXTS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [montagePhotos.length]);

  const currentPhoto = montagePhotos[photoIndex] || photos[0];
  const nextPhoto = montagePhotos[(photoIndex + 1) % montagePhotos.length];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 sm:px-6 py-12 select-none">
      {/* Top Header Tag */}
      <div className="w-full max-w-lg text-center pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-[10px] font-mono text-rose-400 uppercase tracking-[0.3em] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
          <span>Montage of Memories</span>
        </div>
      </div>

      {/* Center Cinematic Photo Stack with Slow Zoom & Transitions */}
      <div className="relative w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center">
        {/* Background stack layer for layered depth effect */}
        {nextPhoto && (
          <div className="absolute inset-0 translate-y-3 translate-x-2 rotate-2 scale-95 rounded-2xl glass-card overflow-hidden -z-10 opacity-30 border border-white/10">
            <img
              src={nextPhoto.url}
              alt="Upcoming memory"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Foreground Active Photo */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-[#08080c]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto?.id || photoIndex}
              initial={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.55 },
                filter: { duration: 0.6 },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu"
            >
              <img
                src={currentPhoto?.url}
                alt={`${LOCKED_DETAILS.friendName} montage`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Photo Counter */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-card border border-white/10 text-[10px] font-mono text-neutral-300">
            {photoIndex + 1} / {montagePhotos.length}
          </div>
        </div>

        {/* Short Text Between Moments */}
        <div className="mt-8 h-14 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8, filter: 'blur(8px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -8, filter: 'blur(8px)', scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl serif-italic text-white tracking-wide"
            >
              {MONTAGE_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md pt-4 pb-2 text-center">
        <button
          id="montage-continue-btn"
          onClick={onNext}
          className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
