import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoItem, LOCKED_DETAILS } from '../../types';

interface FirstPhotoRevealProps {
  firstPhoto?: PhotoItem;
  onNext: () => void;
}

export const FirstPhotoReveal: React.FC<FirstPhotoRevealProps> = ({
  firstPhoto,
  onNext,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Cinematic Photo Frame with soft glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-2xl p-2 glass-card shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0a0f] flex items-center justify-center">
            {firstPhoto && !imgError ? (
              <motion.img
                src={firstPhoto.url}
                alt={LOCKED_DETAILS.friendName}
                onError={() => setImgError(true)}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-neutral-400">
                <ImageIcon className="w-12 h-12 text-rose-400/50" />
                <p className="text-sm font-medium">{LOCKED_DETAILS.friendName}'s Memory</p>
                <p className="text-xs text-neutral-500 font-mono">FIRST MEMORY FRAME</p>
              </div>
            )}

            {/* Photographic vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Friend Name Tag */}
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl glass-card text-left flex items-center justify-between border border-white/10">
              <span className="text-xs font-medium text-white tracking-wide">
                {LOCKED_DETAILS.friendName}
              </span>
              <span className="text-[10px] text-rose-400 font-mono tracking-wider">01 // FIRST REVEAL</span>
            </div>
          </div>
        </motion.div>

        {/* Text Reveal Below Photo */}
        <div className="mt-8 space-y-3 max-w-sm">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-lg sm:text-xl font-light text-neutral-400"
          >
            Ye sirf ek photo nahi...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-3xl sm:text-4xl serif-italic text-white"
          >
            Ek memory hai. <span className="inline-block text-rose-500 opacity-90 animate-pulse">❤️</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.8 }}
            className="text-sm text-neutral-400 font-light leading-relaxed pt-1"
          >
            aur memories ki value tab samajh aati hai<br />
            jab woh kisi special dost ke saath judi ho.
          </motion.p>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="mt-8"
        >
          <button
            id="show-memories-gallery-btn"
            onClick={onNext}
            className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Show The Memories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
