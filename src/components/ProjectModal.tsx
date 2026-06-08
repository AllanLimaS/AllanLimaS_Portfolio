import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface ProjectModalProps {
  projeto: {
    data: {
      title: string;
      description: string;
      coverImage?: { src: string };
      gallery?: { src: string }[];
      link?: string;
      github?: string;
    };
  };
  lang: Lang;
  onClose: () => void;
}

export default function ProjectModal({ projeto, lang, onClose }: ProjectModalProps) {
  const t = useTranslations(lang);
  const images = projeto.data.gallery?.length
    ? projeto.data.gallery.map((img) => img.src)
    : projeto.data.coverImage
      ? [projeto.data.coverImage.src]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval>>();

  const hasMultiple = images.length > 1;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(goNext, 4000);
    autoAdvanceRef.current = interval;
    return () => clearInterval(interval);
  }, [goNext, hasMultiple]);

  const pauseAutoAdvance = () => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
  };

  const resumeAutoAdvance = () => {
    if (!hasMultiple) return;
    pauseAutoAdvance();
    autoAdvanceRef.current = setInterval(goNext, 4000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') goPrevLightbox();
        if (e.key === 'ArrowRight') goNextLightbox();
        return;
      }
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev, goNextLightbox, goPrevLightbox, lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pauseAutoAdvance();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      if (dx > 0) goNext();
      else goPrev();
    }
    resumeAutoAdvance();
  };

  const openLightbox = (index: number) => {
    pauseAutoAdvance();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    resumeAutoAdvance();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="bg-surface-container-high rounded-2xl w-full md:max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
          {images.length > 0 && (
            <div
              className="relative w-full shrink-0 bg-surface-container aspect-video"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[currentIndex]}
                alt={`${projeto.data.title} - ${currentIndex + 1}`}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => openLightbox(currentIndex)}
              />
              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); pauseAutoAdvance(); goPrev(); resumeAutoAdvance(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/25 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
                    aria-label="Previous"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); pauseAutoAdvance(); goNext(); resumeAutoAdvance(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/25 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 touch:manipulation"
                    aria-label="Next"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); resumeAutoAdvance(); }}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6 md:p-8 space-y-5 overflow-y-auto flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-headline-md text-xl md:text-2xl heading-tight text-on-background">
                {projeto.data.title}
              </h2>
              <button onClick={onClose} className="shrink-0 text-on-surface-variant hover:text-on-background transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {projeto.data.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {projeto.data.link && (
                <a
                  href={projeto.data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 text-xs md:text-sm"
                >
                  {t('projects.modal.visitSite')}
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              )}
              {projeto.data.github && (
                <a
                  href={projeto.data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-outline-variant/30 text-on-surface px-4 py-2.5 rounded-xl font-label-sm hover:bg-surface-container-low transition-all text-xs md:text-sm"
                >
                  <svg className="w-4 h-4 text-on-surface-variant mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = touchStartX.current - e.changedTouches[0].clientX;
            const dy = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
            touchStartX.current = null;
            touchStartY.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
              if (dx > 0) goNextLightbox();
              else goPrevLightbox();
            }
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-3 right-3 z-10 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <img
            src={images[lightboxIndex]}
            alt={`${projeto.data.title} - ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain select-none px-2"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrevLightbox(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                aria-label="Previous"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNextLightbox(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                aria-label="Next"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-medium tracking-wider">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
