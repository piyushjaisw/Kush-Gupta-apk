import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Share2, Heart, Sparkles, Check, Copy } from 'lucide-react';
import { PhotoItem, LOCKED_DETAILS } from '../../types';

interface FinalRevealProps {
  finalPhoto?: PhotoItem;
  onReplay: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({
  finalPhoto,
  onReplay,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const handleShare = async () => {
    const shareData = {
      title: 'JUST FOR YOU ❤️ | Kush Gupta',
      text: 'A secret friendship surprise created with love by Piyush Jaiswal for Kush Gupta ❤️',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareNotice('Surprise shared successfully!');
        setTimeout(() => setShareNotice(null), 3000);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setShareNotice('Link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareNotice(null);
      }, 3000);
    }).catch(() => {
      setShareNotice('Could not copy automatically. You can copy the page address from your browser.');
      setTimeout(() => setShareNotice(null), 4000);
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center select-none">
      <div className="max-w-xl w-full flex flex-col items-center space-y-10">
        {/* Emotional Reveal Text Sequence */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-rose-400 font-semibold"
          >
            {LOCKED_DETAILS.friendName.split(' ')[0]}...
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight"
          >
            Thank You<br />
            <span className="serif-italic text-white">For Being My Friend.</span> <span className="text-rose-500 inline-block animate-pulse">❤️</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="text-lg sm:text-xl text-neutral-400 font-light"
          >
            Har friendship perfect nahi hoti...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
            className="text-xl sm:text-2xl serif-italic text-rose-300"
          >
            Par kuch friendships bahut special hoti hain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.0 }}
            className="pt-2 text-base sm:text-lg text-neutral-400 font-light space-y-1"
          >
            <p>Bas ek wish hai...</p>
            <p className="text-white font-medium">Ye dosti aise hi bani rahe.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 4.8 }}
            className="pt-3 text-2xl sm:text-3xl serif-italic text-white leading-snug"
          >
            Keep smiling.<br />
            Keep being you. ✨
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.6 }}
            className="text-xs font-mono text-neutral-400 uppercase tracking-widest pt-2"
          >
            From {LOCKED_DETAILS.creatorName} to {LOCKED_DETAILS.friendName} ❤️
          </motion.p>
        </div>

        {/* Final Photo Reveal */}
        {finalPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 6.2, ease: 'easeOut' }}
            className="relative group w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl p-2 glass-card border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0a0f]">
              <motion.img
                src={finalPhoto.url}
                alt={`${LOCKED_DETAILS.friendName} final memory`}
                animate={{ scale: [1, 1.05] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/90">
                  Always In The Memories
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Final Screen Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 7.0 }}
          className="w-full glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full glass-card text-rose-500 mb-1">
            <Heart className="w-5 h-5 fill-current animate-pulse" />
          </div>

          <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
            THIS WAS JUST A SMALL SURPRISE... <span className="serif-italic text-rose-400">❤️</span>
          </h3>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
            Because some friends deserve to know how much their friendship means.
          </p>

          <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-neutral-400 space-y-1">
            <p>Made with ❤️ by <span className="text-white font-medium">{LOCKED_DETAILS.creatorName}</span></p>
            <p>For: <span className="text-rose-400 font-medium">{LOCKED_DETAILS.friendName}</span></p>
          </div>
        </motion.div>

        {/* Feedback notice toast */}
        {shareNotice && (
          <div className="p-3 rounded-xl glass-card border border-rose-500/30 text-rose-200 text-xs flex items-center justify-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{shareNotice}</span>
          </div>
        )}

        {/* Action Buttons: REPLAY & SHARE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 7.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2"
        >
          <button
            id="replay-surprise-btn"
            onClick={onReplay}
            className="group w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] inline-flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Replay The Surprise</span>
          </button>

          <button
            id="share-surprise-btn"
            onClick={handleShare}
            className="group w-full sm:w-auto glass-card border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white px-8 py-4 rounded-full font-mono text-xs tracking-wider inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-rose-400" />
                <span>SHARE SURPRISE</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
