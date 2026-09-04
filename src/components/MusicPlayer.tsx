import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Upload } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface MusicPlayerProps {
  hasStarted: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ hasStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state with audioEngine
  useEffect(() => {
    if (hasStarted && !customAudioUrl) {
      audioEngine.start().then(() => {
        setIsPlaying(true);
      });
    }
  }, [hasStarted, customAudioUrl]);

  const togglePlay = () => {
    if (customAudioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(console.warn);
        setIsPlaying(true);
      }
      return;
    }

    const playing = audioEngine.togglePlay();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    if (customAudioUrl && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      return;
    }

    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (customAudioUrl && audioRef.current) {
      audioRef.current.volume = val;
    } else {
      audioEngine.setVolume(val);
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      audioEngine.pause();
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(console.warn);
          setIsPlaying(true);
        }
      }, 200);
    }
  };

  return (
    <>
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Sleek Music Player Pill */}
      <aside 
        aria-label="Background music controls"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none"
      >
        <div 
          className="relative flex items-center glass-card px-3.5 py-1.5 rounded-full shadow-2xl transition-all duration-300 hover:border-rose-500/40"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Sleek Equalizer Soundwave Bars */}
          <div className="flex items-center gap-[3px] mr-2.5 h-4 w-4 justify-center">
            <div className={`w-[2px] rounded-full bg-rose-400 transition-all duration-300 ${isPlaying ? 'animate-wave-1 h-3 opacity-90' : 'h-1.5 opacity-40'}`} />
            <div className={`w-[2px] rounded-full bg-rose-500 transition-all duration-300 ${isPlaying ? 'animate-wave-2 h-4.5 opacity-100' : 'h-2.5 opacity-50'}`} />
            <div className={`w-[2px] rounded-full bg-rose-400 transition-all duration-300 ${isPlaying ? 'animate-wave-3 h-2.5 opacity-70' : 'h-1.5 opacity-30'}`} />
            <div className={`w-[2px] rounded-full bg-rose-500 transition-all duration-300 ${isPlaying ? 'animate-wave-4 h-4 opacity-90' : 'h-2 opacity-40'}`} />
          </div>

          <div className="flex flex-col mr-2.5 hidden sm:block">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 font-medium">Soundtrack</span>
            <span className="text-[11px] font-mono tracking-tight text-neutral-200 truncate max-w-[125px]">
              {customAudioUrl ? 'CUSTOM_AUDIO.MP3' : 'CINEMATIC_SCORE.MP3'}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              id="music-play-pause-btn"
              onClick={togglePlay}
              className="p-1 rounded-full text-neutral-300 hover:text-rose-400 transition-colors focus:outline-none"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
              aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              id="music-mute-btn"
              onClick={toggleMute}
              className="p-1 rounded-full text-neutral-300 hover:text-rose-400 transition-colors focus:outline-none"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expandable volume slider and custom track loader */}
          {showControls && (
            <div className="absolute right-0 top-full mt-2 w-52 p-3.5 rounded-2xl glass-card bg-[#050505]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="uppercase tracking-wider">Volume</span>
                <span className="text-rose-400">{Math.round(volume * 100)}%</span>
              </div>
              <input
                id="music-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-rose-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                aria-label="Volume Slider"
              />

              <label 
                htmlFor="custom-audio-input"
                className="mt-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-mono tracking-wider uppercase text-neutral-300 cursor-pointer border border-white/[0.06] transition-colors"
              >
                <Upload className="w-3 h-3 text-rose-400" />
                <span>Upload Custom Score</span>
                <input
                  id="custom-audio-input"
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomAudioUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
