import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LOCKED_DETAILS } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface MysteryScreenProps {
  onNext: () => void;
}

export const MysteryScreen: React.FC<MysteryScreenProps> = ({ onNext }) => {
  const friendFirstName = LOCKED_DETAILS.friendName.split(' ')[0];

  const handleNext = () => {
    triggerHaptic('pulse');
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-16 text-center select-none">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-rose-400 font-semibold"
        >
          A Heartfelt Thought
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-3xl sm:text-5xl font-light text-white tracking-tight"
        >
          {friendFirstName}, ek baat bolun?
        </motion.h2>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-lg sm:text-2xl text-neutral-400 font-light tracking-wide leading-relaxed"
        >
          Zindagi mein bahut log milte hain...
        </motion.p>

        {/* Line 3 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="text-xl sm:text-3xl serif-italic text-neutral-300"
        >
          Par har koi yaad nahi ban pata.
        </motion.p>

        {/* Line 4 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 3.8 }}
          className="pt-4 text-2xl sm:text-4xl font-light text-white leading-snug"
        >
          Tu unhi special logon mein se hai. <span className="inline-block text-rose-500 opacity-90 animate-pulse">❤️</span>
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.6 }}
        className="mt-14"
      >
        <button
          id="mystery-next-btn"
          onClick={handleNext}
          aria-label="Keep going"
          className="bg-white text-black px-10 py-4 sm:px-12 sm:py-4.5 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
        >
          <span>Keep Going</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
};
