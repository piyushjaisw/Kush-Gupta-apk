import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ExternalLink, ArrowRight, Heart } from 'lucide-react';
import { LOCKED_DETAILS } from '../../types';

interface KushInstagramProps {
  onNext: () => void;
}

export const KushInstagram: React.FC<KushInstagramProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-14 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-light text-white mb-6 tracking-tight"
        >
          Ab Tumhari Baari... <span className="serif-italic text-rose-300">The Spotlight</span> 📸
        </motion.h2>

        {/* Kush Instagram Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full glass-card rounded-2xl p-8 border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden"
        >
          {/* Instagram Avatar Badge */}
          <div className="w-18 h-18 rounded-full glass-card border border-white/10 p-1 shadow-lg mb-4 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-500 flex items-center justify-center text-white">
              <Instagram className="w-8 h-8" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            {LOCKED_DETAILS.friendName}
          </h3>

          <p className="mt-1 text-sm text-rose-400 font-mono tracking-wider">
            {LOCKED_DETAILS.friendHandle}
          </p>

          <p className="mt-3 text-xs text-neutral-400 max-w-xs font-light">
            The brother and irreplaceable friend this entire surprise was crafted for.
          </p>

          {/* Visit Instagram Button */}
          <a
            id="kush-instagram-link"
            href={LOCKED_DETAILS.friendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-card border border-rose-500/30 hover:border-rose-500/70 text-white font-mono text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>VISIT KUSH'S PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Proceed to Final Reveal Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <button
            id="kush-next-to-final-btn"
            onClick={onNext}
            className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
          >
            <span>The Final Words</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
