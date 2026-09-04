import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { LOCKED_DETAILS } from '../../types';

interface AboutKushProps {
  onNext: () => void;
}

export const AboutKush: React.FC<AboutKushProps> = ({ onNext }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const isOverflown = scrollHeight > clientHeight + 50;
      setCanScroll(isOverflown);

      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const atBottom = currentScroll + clientHeight >= scrollHeight - 60;
      setHasScrolledBottom(atBottom);
    };

    checkScroll();
    // Re-check after animations finish
    const timer = setTimeout(checkScroll, 1000);

    window.addEventListener('resize', checkScroll);
    window.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({ top: 300, behavior: 'smooth' });
  };
  const points = [
    {
      text: 'Kyuki tere saath normal moments bhi memorable lagte hain.',
      sub: 'Even the simplest chai or late-night talk turns into a core memory.',
    },
    {
      text: 'Har friendship ko explain karna zaroori nahi hota...',
      sub: 'Some bonds exist without formalities or unneeded words.',
    },
    {
      text: 'Kuch dost bas apni presence se life ko better bana dete hain.',
      sub: 'A genuine comfort that you can just be completely yourself.',
    },
    {
      text: 'Tu unhi doston mein se ek hai.',
      sub: 'A friend who stands tall through thick and thin.',
    },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-14 select-none">
      <div className="max-w-xl w-full flex flex-col items-center text-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-rose-400 text-[10px] font-mono uppercase tracking-[0.3em] font-semibold mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
          <span>Gratitude & Brotherhood</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-snug"
        >
          {LOCKED_DETAILS.friendName.split(' ')[0]}, <span className="serif-italic text-white">Tu Special Kyun Hai?</span> <span className="text-rose-500 inline-block animate-pulse">❤️</span>
        </motion.h2>

        {/* Appreciation Cards */}
        <div className="mt-8 w-full space-y-3.5 text-left">
          {points.map((pt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.25 }}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-4 shadow-lg"
            >
              <div className="mt-0.5 p-2 rounded-xl bg-white/[0.04] text-rose-400 border border-white/5 flex-shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-base sm:text-lg serif-italic text-white leading-snug">
                  "{pt.text}"
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 font-light">
                  {pt.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-10"
        >
          <button
            id="about-kush-next-btn"
            onClick={onNext}
            className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
          >
            <span>A Message From Piyush</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Subtle 'Scroll for more' indicator for mobile devices */}
      <AnimatePresence>
        {canScroll && !hasScrolledBottom && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleScrollDown}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 cursor-pointer sm:hidden flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-rose-500/30 bg-black/75 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-95 transition-transform"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300">
              Scroll for more
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
