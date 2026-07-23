import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface ProjectCardProps {
  projeto: {
    id: string;
    data: {
      title: string;
      description: string;
      shortDescription: string;
      category: string[];
      coverImage?: { src: string };
      link?: string;
      github?: string;
    };
  };
  lang: Lang;
  onClick?: () => void;
}

const categoryBadgeClasses: Record<string, string> = {
  'Web': 'bg-secondary/10 text-secondary border border-secondary/20',
  'RPA': 'bg-primary/10 text-primary border border-primary/20',
  'Dados': 'bg-tertiary/10 text-tertiary border border-tertiary/20',
  'App': 'bg-primary/10 text-primary border border-primary/20',
};

export default function ProjectCard({ projeto, lang, onClick }: ProjectCardProps) {
  const t = useTranslations(lang);

  return (
    <div className="group cursor-pointer" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }} aria-label={`${lang === 'pt' ? 'Ver detalhes de' : 'View details of'} ${projeto.data.title}`}>
      <div className="glass-card asymmetric-radius h-full flex flex-col overflow-hidden relative">
        {projeto.data.coverImage ? (
          <img alt={`${projeto.data.title}${lang === 'pt' ? ' — capa do projeto' : ' — project cover'}`} className="w-full flex-1 min-h-0 object-cover rounded-t-xl" src={projeto.data.coverImage.src} loading="lazy" />
        ) : (
          <div className="w-full flex-1 min-h-0 bg-surface-container-high rounded-t-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant opacity-50">image</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {projeto.data.category.map((cat) => {
              const label = cat === 'Dados' ? t('projects.category.dados') : cat;
              return (
                <span key={cat} className={`inline-block px-3 py-1 rounded-md font-label-sm text-[10px] uppercase tracking-widest ${categoryBadgeClasses[cat] || categoryBadgeClasses['RPA']}`}>
                  {label}
                </span>
              );
            })}
          </div>
          <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-label-sm whitespace-nowrap">{t('projects.card.viewDetails')}</p>
        </div>
      </div>
    </div>
  );
}
