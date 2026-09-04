import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { LOCKED_DETAILS } from '../../types';

interface PiyushMessageProps {
  onNext: () => void;
}

export const PiyushMessage: React.FC<PiyushMessageProps> = ({ onNext }) => {
  const paragraphs = [
    'Kush,',
    'shayad main har baar words mein nahi bata pata,\nlekin teri dosti mere liye genuinely important hai.',
    'Zindagi mein kuch log bas milte hain,\nkuch log yaad ban jaate hain,\naur kuch log dosti ka woh hissa ban jaate hain\njise hum hamesha yaad rakhna chahte hain.',
    'Tu mere liye unhi logon mein se hai.',
    'Bas ek baat hamesha yaad rakhna...',
    'Chahe waqt kitna bhi badal jaaye,\nachhi dosti ki value kabhi kam nahi hoti.',
    `— ${LOCKED_DETAILS.creatorName} ❤️`,
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-14 select-none">
      <div className="max-w-xl w-full flex flex-col items-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-[10px] font-mono text-rose-400 uppercase tracking-[0.3em] font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
          <span>From The Heart</span>
        </motion.div>

        {/* Handwritten Style Letter Card with sleek glass-card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full rounded-2xl p-6 sm:p-8 md:p-10 glass-card border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Letter Content */}
          <div className="space-y-4 text-left">
            {/* Greeting */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-light text-white tracking-tight"
            >
              {paragraphs[0]}
            </motion.h3>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed whitespace-pre-line"
            >
              {paragraphs[1]}
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed whitespace-pre-line"
            >
              {paragraphs[2]}
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="text-lg sm:text-xl serif-italic text-rose-300"
            >
              {paragraphs[3]}
            </motion.p>

            {/* Paragraph 4 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="text-sm sm:text-base text-neutral-400 font-light italic pt-1"
            >
              {paragraphs[4]}
            </motion.p>

            {/* Paragraph 5 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
              className="text-base sm:text-lg text-white font-light leading-relaxed whitespace-pre-line"
            >
              {paragraphs[5]}
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 4.1 }}
              className="pt-4 text-right"
            >
              <span className="serif-italic text-2xl sm:text-3xl text-rose-400 block">
                {paragraphs[6]}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.6 }}
          className="mt-8 text-center"
        >
          <button
            id="piyush-letter-next-btn"
            onClick={onNext}
            className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] group inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Relive The Moments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
