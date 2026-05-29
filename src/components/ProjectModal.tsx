import React, { useState, useEffect, useCallback } from 'react';
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

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [goNext, images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface-container-high rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {images.length > 0 && (
          <div className="relative w-full aspect-video bg-surface-container">
            <img
              src={images[currentIndex]}
              alt={`${projeto.data.title} - ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            {images.length > 1 && (
              <>
                <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-headline-md text-2xl heading-tight text-on-background">
              {projeto.data.title}
            </h2>
            <button onClick={onClose} className="text-on-surface-variant hover:text-on-background transition-colors">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <p className="text-on-surface-variant leading-relaxed">
            {projeto.data.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {projeto.data.link && (
              <a
                href={projeto.data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
              >
                {t('projects.modal.visitSite')}
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            )}
            {projeto.data.github && (
              <a
                href={projeto.data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-outline-variant/30 text-on-surface px-4 py-3 rounded-xl font-label-sm hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                </svg>
                <span className="sr-only">{t('projects.modal.viewOnGitHub')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
