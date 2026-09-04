import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { LOCKED_DETAILS } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface IntroScreenProps {
  onStart: () => void;
  onOpenPhotos: () => void;
  onQuickReplaceAll?: (file: File) => void;
  photoCount: number;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onStart,
  onOpenPhotos,
  onQuickReplaceAll,
  photoCount,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleStart = () => {
    triggerHaptic('celebration');
    onStart();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onQuickReplaceAll) {
      onQuickReplaceAll(e.target.files[0]);
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-12 text-center select-none">
      {/* Top secretive subtle badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-[10px] tracking-[0.3em] text-rose-400 uppercase font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
        <span>Personal Surprise • For Kush</span>
      </motion.div>

      {/* Main Intro Text sequence */}
      <div className="max-w-2xl mx-auto space-y-5">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-rose-500 text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold block"
        >
          Special Message
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-tight text-white"
        >
          Hey {LOCKED_DETAILS.friendName.split(' ')[0]}... <span className="text-rose-500 opacity-90 inline-block animate-pulse">❤️</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-lg sm:text-2xl text-neutral-400 font-light tracking-wide leading-relaxed pt-2"
        >
          Ye surprise kisi aur ke liye nahi...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.3 }}
          className="text-3xl sm:text-4xl md:text-5xl serif-italic text-white opacity-95"
        >
          Sirf tumhare liye hai.
        </motion.div>
      </div>

      {/* Big Call-to-action Button */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="mt-12 flex flex-col items-center gap-6"
      >
        <button
          id="start-surprise-btn"
          onClick={handleStart}
          aria-label="Start the surprise"
          className="bg-white text-black px-10 py-4 sm:px-12 sm:py-5 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_50px_rgba(244,63,94,0.4)] group flex items-center gap-3 cursor-pointer"
        >
          <span>Start the Surprise</span>
          <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">✨</span>
        </button>

        <div className="flex flex-col items-center gap-3">
          {/* 1-Click Replace All Images with Kush's Photo */}
          <input
            ref={fileInputRef}
            id="intro-quick-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            id="intro-replace-all-btn"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 transition-all text-xs font-mono tracking-wide cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.15)] group"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 text-rose-400" />
            <span>Replace All Images With Kush's Photo</span>
          </button>

          <span className="text-[11px] tracking-[0.2em] uppercase opacity-40 italic text-neutral-300 font-light">
            — Created with heart by {LOCKED_DETAILS.creatorName}
          </span>

          {/* Real photo counter info & management */}
          <button
            id="intro-manage-photos-btn"
            onClick={onOpenPhotos}
            className="text-[11px] font-mono text-neutral-400 hover:text-rose-300 transition-colors py-1 px-3 rounded-full hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{photoCount} Memories Active</span>
            <span className="text-neutral-500">· Manage Photos</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
