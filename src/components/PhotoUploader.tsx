import React, { useState, useRef } from 'react';
import { Images, Plus, Trash2, X, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import { PhotoItem } from '../types';
import { PHOTO_CAPTIONS } from '../data/defaultPhotos';
import { fileToDataURL } from '../utils/photoStorage';

interface PhotoUploaderProps {
  photos: PhotoItem[];
  onUpdatePhotos: (photos: PhotoItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onUpdatePhotos,
  isOpen,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceAllInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null, replaceAll: boolean = false) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const filesArr = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (filesArr.length === 0) {
        setIsProcessing(false);
        return;
      }

      if (replaceAll) {
        // Take the first file and replicate across all 10 memory positions
        const primaryFile = filesArr[0];
        const dataUrl = await fileToDataURL(primaryFile);

        const newItems: PhotoItem[] = PHOTO_CAPTIONS.map((caption, index) => ({
          id: `kush-photo-${Date.now()}-${index}`,
          url: dataUrl,
          name: primaryFile.name,
          caption,
          timestamp: Date.now() + index,
        }));

        onUpdatePhotos(newItems);
        setSuccessNotice("Replaced all images across the website with Kush Gupta's photo! ✨");
        setTimeout(() => setSuccessNotice(null), 5000);
      } else {
        const newItems: PhotoItem[] = [];
        for (let i = 0; i < filesArr.length; i++) {
          const file = filesArr[i];
          const dataUrl = await fileToDataURL(file);
          const caption = PHOTO_CAPTIONS[(photos.length + i) % PHOTO_CAPTIONS.length];
          newItems.push({
            id: `kush-photo-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
            url: dataUrl,
            name: file.name,
            caption,
            timestamp: Date.now() + i,
          });
        }

        const updated = [...photos, ...newItems];
        onUpdatePhotos(updated);
        setSuccessNotice(`Added ${newItems.length} real photo${newItems.length > 1 ? 's' : ''} of Kush!`);
        setTimeout(() => setSuccessNotice(null), 4000);
      }
    } catch (err) {
      console.error('Failed to read image', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files, false);
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (photos.length <= 1) {
      alert('Keep at least 1 photo for the surprise gallery.');
      return;
    }
    const updated = photos.filter((p) => p.id !== id);
    onUpdatePhotos(updated);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-labelledby="photo-manager-title"
        className="w-full max-w-2xl glass-card border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh] overflow-hidden text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl glass-card border border-rose-500/30 text-rose-400">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <h2 id="photo-manager-title" className="text-base font-light text-white flex items-center gap-2 tracking-tight">
                <span>Kush Gupta's Memories</span>
                <span className="text-[10px] font-mono py-0.5 px-2 rounded-full glass-card border border-white/10 text-rose-400 font-normal">
                  {photos.length} Total
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Supports 10, 15, 20, 30+ photos. Stored safely & privately in your browser.
              </p>
            </div>
          </div>
          <button
            id="close-photo-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close photo manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast */}
        {successNotice && (
          <div className="my-3 p-2.5 rounded-xl glass-card border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Quick Action: Replace ALL Images with Kush's Photo */}
        <div className="mt-4 p-4 rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-rose-900/20 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Replace All Images with Kush Gupta</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-normal">
                  1-Click
                </span>
              </p>
              <p className="text-[11px] text-neutral-300 font-light mt-0.5">
                Apply your uploaded reference photo to every memory slide and reveal
              </p>
            </div>
          </div>
          <input
            ref={replaceAllInputRef}
            id="replace-all-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files, true)}
          />
          <button
            id="replace-all-photos-btn"
            disabled={isProcessing}
            onClick={() => replaceAllInputRef.current?.click()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] cursor-pointer disabled:opacity-50 shrink-0 text-center"
          >
            {isProcessing ? 'Applying...' : "Select Kush's Photo"}
          </button>
        </div>

        {/* Upload Drop Zone (Add more) */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-3 border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-rose-400 bg-rose-500/10'
              : 'border-white/15 hover:border-rose-500/40 glass-card'
          }`}
        >
          <input
            ref={fileInputRef}
            id="batch-photo-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files, false)}
          />
          <div className="w-8 h-8 rounded-full glass-card border border-white/10 flex items-center justify-center text-rose-400">
            <Plus className="w-4 h-4" />
          </div>
          <p className="text-xs font-mono tracking-wider uppercase text-neutral-200">
            Or upload multiple unique photos
          </p>
          <p className="text-[11px] text-neutral-400 font-light">
            Click or drag & drop 10, 15, 20+ additional photos of Kush Gupta
          </p>
        </div>

        {/* Photos Grid */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
            <span>Uploaded Memories ({photos.length})</span>
            <span className="flex items-center gap-1 text-rose-400">
              <Sparkles className="w-3 h-3" />
              Private browser storage
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-xl overflow-hidden glass-card border border-white/10"
              >
                <img
                  src={photo.url}
                  alt={`Kush Gupta memory ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                  <div className="flex justify-end">
                    <button
                      id={`delete-photo-${photo.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePhoto(photo.id);
                      }}
                      className="p-1 rounded bg-black/60 hover:bg-rose-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Delete photo"
                      aria-label="Delete this photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-white/90 px-1 truncate">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-light">
            Photos stay private on your device.
          </span>
          <button
            id="done-uploading-btn"
            onClick={onClose}
            className="bg-white text-black px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold hover:bg-rose-500 hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
          >
            Done & Apply
          </button>
        </div>
      </div>
    </div>
  );
};
