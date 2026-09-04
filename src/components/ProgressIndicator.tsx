import React from 'react';
import { ScreenStep } from '../types';

interface ProgressIndicatorProps {
  currentStep: ScreenStep;
  steps: ScreenStep[];
  onSelectStep: (step: ScreenStep) => void;
  hasStarted: boolean;
}

const STEP_LABELS: Record<ScreenStep, string> = {
  intro: 'Intro',
  mystery: 'Message',
  first_photo: 'First Memory',
  gallery: 'Gallery',
  about_kush: 'About Kush',
  piyush_message: "Piyush's Letter",
  montage: 'Montage',
  piyush_instagram: 'Piyush',
  kush_instagram: 'Kush',
  final_reveal: 'Final Reveal',
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  steps,
  onSelectStep,
  hasStarted,
}) => {
  if (!hasStarted) return null;

  const currentIndex = steps.indexOf(currentStep);
  const progressPercent = ((currentIndex + 1) / steps.length) * 100;

  return (
    <>
      {/* Sleek Vertical Progress Rail for larger screens */}
      <aside 
        aria-label="Screen progression rail"
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-auto select-none"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-rose-500/40 to-transparent" />
        <div className="flex flex-col gap-3 py-1">
          {steps.map((step, idx) => {
            const isActive = step === currentStep;
            const isPassed = idx < currentIndex;
            return (
              <button
                key={`rail-${step}`}
                onClick={() => onSelectStep(step)}
                className="group relative flex items-center p-1 cursor-pointer"
                title={STEP_LABELS[step]}
                aria-label={`Jump to ${STEP_LABELS[step]}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-2 h-2 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] scale-125'
                      : isPassed
                      ? 'w-1.5 h-1.5 bg-rose-400/50 hover:bg-rose-400'
                      : 'w-1.5 h-1.5 bg-white/10 hover:bg-white/30'
                  }`}
                />
                <span className="absolute left-6 px-2 py-0.5 rounded glass-card text-[9px] font-mono tracking-widest uppercase text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {STEP_LABELS[step]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-rose-500/40 to-transparent" />
      </aside>

      {/* Interactive Dots Bar for all screens */}
      <nav 
        aria-label="Experience progress"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-auto select-none max-w-[92vw]"
      >
        <div className="glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {steps.map((step, idx) => {
            const isActive = step === currentStep;
            const isPassed = idx < currentIndex;

            return (
              <button
                key={step}
                id={`progress-step-btn-${step}`}
                onClick={() => onSelectStep(step)}
                className={`group relative transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 sm:w-7 h-2 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                    : isPassed
                    ? 'w-1.5 h-1.5 bg-rose-400/50 hover:bg-rose-400'
                    : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/40'
                }`}
                title={STEP_LABELS[step]}
                aria-label={`Jump to ${STEP_LABELS[step]} step`}
              />
            );
          })}
          <span className="text-[10px] text-neutral-400 font-mono ml-1 tracking-wider uppercase">
            {currentIndex + 1}/{steps.length}
          </span>
        </div>

        {/* Thin ambient progress line on very top edge */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] pointer-events-none z-50">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(244,63,94,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </nav>
    </>
  );
};
