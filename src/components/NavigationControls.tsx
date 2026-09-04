import React from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { ScreenStep } from '../types';

interface NavigationControlsProps {
  currentStep: ScreenStep;
  steps: ScreenStep[];
  onPrev: () => void;
  onNext: () => void;
  onOpenPhotos: () => void;
  photoCount: number;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  steps,
  onPrev,
  onNext,
  onOpenPhotos,
  photoCount,
}) => {
  const currentIndex = steps.indexOf(currentStep);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2 select-none">
      {/* Back button (available after intro) */}
      {!isFirst && (
        <button
          id="global-prev-screen-btn"
          onClick={onPrev}
          className="p-2 rounded-full glass-card hover:border-white/20 text-neutral-400 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
          title="Previous Screen"
          aria-label="Previous Screen"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Photo Manager trigger button */}
      <button
        id="global-open-photo-manager-btn"
        onClick={onOpenPhotos}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card hover:border-rose-500/40 text-neutral-300 hover:text-white transition-all shadow-lg cursor-pointer"
        title="Manage Kush's Photos"
        aria-label="Manage Kush's Photos"
      >
        <Images className="w-3.5 h-3.5 text-rose-400" />
        <span className="font-mono text-[11px] tracking-tight">{photoCount} PHOTOS</span>
      </button>

      {/* Quick skip forward button (if not last) */}
      {!isFirst && !isLast && (
        <button
          id="global-next-screen-btn"
          onClick={onNext}
          className="p-2 rounded-full glass-card hover:border-white/20 text-neutral-400 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
          title="Next Screen"
          aria-label="Next Screen"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
