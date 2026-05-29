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

const categoryColors: Record<string, string> = {
  'Web': 'secondary',
  'RPA': 'primary',
  'Dados': 'tertiary',
};

export default function ProjectCard({ projeto, lang, onClick }: ProjectCardProps) {
  const t = useTranslations(lang);
  const mainCategory = projeto.data.category[0];
  const color = categoryColors[mainCategory] || 'primary';

  const categoryLabel = mainCategory === 'Dados'
    ? t('projects.category.dados')
    : mainCategory;

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="glass-card asymmetric-radius h-full flex flex-col overflow-hidden relative">
        {projeto.data.coverImage ? (
          <img alt={projeto.data.title} className="w-full flex-1 min-h-0 object-cover rounded-t-xl" src={projeto.data.coverImage.src} />
        ) : (
          <div className="w-full flex-1 min-h-0 bg-surface-container-high rounded-t-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant opacity-50">image</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <span className={`inline-block bg-${color}/10 text-${color} px-3 py-1 rounded-md font-label-sm text-[10px] border border-${color}/20 uppercase tracking-widest`}>
            {categoryLabel}
          </span>
          <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-label-sm">{t('projects.card.viewDetails')}</p>
        </div>
      </div>
    </div>
  );
}
