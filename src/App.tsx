import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenStep, PhotoItem } from './types';
import { DEFAULT_PHOTOS, PHOTO_CAPTIONS } from './data/defaultPhotos';
import { loadPhotosFromStorage, savePhotosToStorage, fileToDataURL } from './utils/photoStorage';
import { triggerHaptic } from './utils/haptics';
import { CheckCircle2 } from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { PhotoUploader } from './components/PhotoUploader';
import { ProgressIndicator } from './components/ProgressIndicator';
import { NavigationControls } from './components/NavigationControls';


// Screen Components
import { IntroScreen } from './components/screens/IntroScreen';
import { MysteryScreen } from './components/screens/MysteryScreen';
import { FirstPhotoReveal } from './components/screens/FirstPhotoReveal';
import { MemoryGallery } from './components/screens/MemoryGallery';
import { AboutKush } from './components/screens/AboutKush';
import { PiyushMessage } from './components/screens/PiyushMessage';
import { MemoryMontage } from './components/screens/MemoryMontage';
import { PiyushInstagram } from './components/screens/PiyushInstagram';
import { KushInstagram } from './components/screens/KushInstagram';
import { FinalReveal } from './components/screens/FinalReveal';

const STEPS_ORDER: ScreenStep[] = [
  'intro',
  'mystery',
  'first_photo',
  'gallery',
  'about_kush',
  'piyush_message',
  'montage',
  'piyush_instagram',
  'kush_instagram',
  'final_reveal',
];

// High-end cinematic zoom-blur cross-fade screen transition variants
const cinematicScreenVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: direction >= 0 ? 0.94 : 1.06,
    filter: 'blur(16px)',
    y: 0,
    willChange: 'transform, opacity, filter',
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1], // Luxury cinematic curve
      opacity: { duration: 0.6, ease: 'easeOut' },
      filter: { duration: 0.65, ease: 'easeOut' },
      scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: direction >= 0 ? 1.06 : 0.94,
    filter: 'blur(18px)',
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.45, ease: 'easeIn' },
      filter: { duration: 0.5, ease: 'easeIn' },
      scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }),
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('intro');
  const [direction, setDirection] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);
  const [isWindowDragging, setIsWindowDragging] = useState(false);

  // Load photos from IndexedDB on initial load
  useEffect(() => {
    loadPhotosFromStorage().then((saved) => {
      if (saved && saved.length > 0) {
        setPhotos(saved);
      }
    });
  }, []);

  // Update photos and persist to IndexedDB
  const handleUpdatePhotos = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    savePhotosToStorage(newPhotos);
  };

  // Replaces all memory slots with a single real photo of Kush Gupta
  const handleQuickReplaceAll = async (file: File) => {
    try {
      const dataUrl = await fileToDataURL(file);
      const newItems: PhotoItem[] = PHOTO_CAPTIONS.map((caption, index) => ({
        id: `kush-photo-${Date.now()}-${index}`,
        url: dataUrl,
        name: file.name,
        caption,
        timestamp: Date.now() + index,
      }));
      setPhotos(newItems);
      savePhotosToStorage(newItems);
      setGlobalToast("Kush Gupta's photo applied to all 10 memories and reveals! ✨");
      triggerHaptic('celebration');
      setTimeout(() => setGlobalToast(null), 5000);
    } catch (err) {
      console.error('Failed to replace photos', err);
    }
  };

  // Global window drop handler
  const handleGlobalDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWindowDragging(true);
  };

  const handleGlobalDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only turn off if leaving window bounds
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsWindowDragging(false);
  };

  const handleGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWindowDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesList = Array.from(e.dataTransfer.files) as File[];
      const imageFiles = filesList.filter((f) => f.type && f.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        handleQuickReplaceAll(imageFiles[0]);
      }
    }
  };


  const currentStepIndex = STEPS_ORDER.indexOf(currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < STEPS_ORDER.length - 1) {
      setDirection(1);
      setCurrentStep(STEPS_ORDER[currentStepIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStep(STEPS_ORDER[currentStepIndex - 1]);
    }
  };

  const handleStartSurprise = () => {
    setHasStarted(true);
    setDirection(1);
    goToNextStep();
  };

  const handleReplay = () => {
    setDirection(-1);
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPhotoModalOpen) return;
      if (e.key === 'ArrowRight') {
        goToNextStep();
      } else if (e.key === 'ArrowLeft') {
        goToPrevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, isPhotoModalOpen]);

  return (
    <main
      onDragOver={handleGlobalDragOver}
      onDragLeave={handleGlobalDragLeave}
      onDrop={handleGlobalDrop}
      className="relative min-h-[100dvh] w-full bg-[#08080c] text-white flex flex-col items-center justify-center overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200"
    >
      {/* Cinematic Ambient Particle Background */}
      <ParticleBackground />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {globalToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 px-5 py-3 rounded-full glass-card border border-emerald-500/40 bg-black/80 backdrop-blur-xl text-emerald-300 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{globalToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag & Drop Overlay Indicator */}
      <AnimatePresence>
        {isWindowDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none p-6 border-4 border-dashed border-rose-500/60 m-4 rounded-3xl"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light text-white tracking-wide mb-2">
              Drop Kush Gupta's Photo Here
            </h3>
            <p className="text-sm font-mono text-rose-300">
              Instantly replaces all memories across the entire website
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Header Navigation Controls */}
      <NavigationControls
        currentStep={currentStep}
        steps={STEPS_ORDER}
        onPrev={goToPrevStep}
        onNext={goToNextStep}
        onOpenPhotos={() => setIsPhotoModalOpen(true)}
        photoCount={photos.length}
      />

      {/* Elegant Music Player Floating Control */}
      <MusicPlayer hasStarted={hasStarted} />

      {/* Main Screen Container with Smooth Transitions */}
      <div className="relative w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={cinematicScreenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex-1 flex flex-col justify-center transform-gpu"
          >
            {currentStep === 'intro' && (
              <IntroScreen
                onStart={handleStartSurprise}
                onOpenPhotos={() => setIsPhotoModalOpen(true)}
                onQuickReplaceAll={handleQuickReplaceAll}
                photoCount={photos.length}
              />
            )}

            {currentStep === 'mystery' && (
              <MysteryScreen onNext={goToNextStep} />
            )}

            {currentStep === 'first_photo' && (
              <FirstPhotoReveal
                firstPhoto={photos[0]}
                onNext={goToNextStep}
              />
            )}

            {currentStep === 'gallery' && (
              <MemoryGallery
                photos={photos}
                onNext={goToNextStep}
              />
            )}

            {currentStep === 'about_kush' && (
              <AboutKush onNext={goToNextStep} />
            )}

            {currentStep === 'piyush_message' && (
              <PiyushMessage onNext={goToNextStep} />
            )}

            {currentStep === 'montage' && (
              <MemoryMontage
                photos={photos}
                onNext={goToNextStep}
              />
            )}

            {currentStep === 'piyush_instagram' && (
              <PiyushInstagram onNext={goToNextStep} />
            )}

            {currentStep === 'kush_instagram' && (
              <KushInstagram onNext={goToNextStep} />
            )}

            {currentStep === 'final_reveal' && (
              <FinalReveal
                finalPhoto={photos[0]}
                onReplay={handleReplay}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sleek Bottom Gallery Preview Rail on Intro Screen */}
      {currentStep === 'intro' && (
        <footer className="relative z-20 w-full max-w-5xl mx-auto px-8 py-6 hidden sm:flex items-center justify-between border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsPhotoModalOpen(true)}
              className="flex -space-x-3 group cursor-pointer"
              title="Manage Memories"
              aria-label="Manage Memories"
            >
              {photos.slice(0, 3).map((photo, i) => (
                <div 
                  key={photo.id}
                  className={`w-12 h-12 rounded-xl glass-card overflow-hidden border border-white/20 transition-transform duration-300 group-hover:scale-105 shadow-md ${
                    i === 0 ? 'rotate-[-6deg]' : i === 1 ? 'rotate-[3deg] -translate-y-1' : 'rotate-[-2deg]'
                  }`}
                >
                  <img 
                    src={photo.url} 
                    alt="Memory preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
            </button>
            <div>
              <p className="text-[10px] tracking-widest uppercase opacity-40 font-bold">Memories Collected</p>
              <p className="text-xs font-mono text-neutral-300">{photos.length}+ Photos Ready</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[10px] tracking-widest uppercase opacity-40 font-bold">Primary Target</p>
              <p className="text-xs font-mono font-semibold text-rose-400">@Gupta0866</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest uppercase opacity-40 font-bold">Secret Creator</p>
              <p className="text-xs font-mono font-semibold text-neutral-300">@Piyishjaiswal17</p>
            </div>
          </div>
        </footer>
      )}

      {/* Progress Dots Indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        steps={STEPS_ORDER}
        onSelectStep={(step) => setCurrentStep(step)}
        hasStarted={hasStarted}
      />

      {/* Photo Uploader / Manager Modal */}
      <PhotoUploader
        photos={photos}
        onUpdatePhotos={handleUpdatePhotos}
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </main>
  );
}
