import React, { useState } from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface ProjetosProps {
  projetos: any[];
  lang: Lang;
}

// Cores e ícones por categoria (as categorias são consistentes nos dois idiomas)
const categoryColors: Record<string, string> = {
  'Web': 'secondary',
  'RPA': 'primary',
  'Dados': 'tertiary',
};

const categoryIcons: Record<string, string> = {
  'Web': 'web',
  'RPA': 'arrow_outward',
  'Dados': 'analytics',
};

export default function Projetos({ projetos, lang }: ProjetosProps) {
  const t = useTranslations(lang);

  // Rótulo localizado para a categoria "Dados" (único que muda entre idiomas)
  const getCategoryLabel = (category: string) => {
    if (category === 'Dados') return t('projects.category.dados');
    return category;
  };

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjetos = activeFilter === 'All' 
    ? projetos 
    : projetos.filter((p: any) => p.data.category === activeFilter);

  const getFilterClass = (filter: string) => {
    return activeFilter === filter
      ? "px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-sm transition-all shadow-lg shadow-primary/20"
      : "px-6 py-2.5 rounded-full border border-outline-variant/20 text-on-surface-variant font-label-sm hover:border-primary/40 transition-all";
  };

  return (
    <section className="py-xxl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto" id="projects">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background heading-tight">
                    {t('projects.heading')}
                </h2>
                <p className="text-on-surface-variant max-w-md text-body-lg mt-2">
                    {t('projects.subtitle')}
                </p>
            </div>
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveFilter('All')} className={getFilterClass('All')}>
                  {t('projects.filter.all')}
                </button>
                <button onClick={() => setActiveFilter('RPA')} className={getFilterClass('RPA')}>RPA</button>
                <button onClick={() => setActiveFilter('Web')} className={getFilterClass('Web')}>Web</button>
                <button onClick={() => setActiveFilter('Dados')} className={getFilterClass('Dados')}>
                  {t('projects.category.dados')}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjetos.map((projeto: any) => {
              const color = categoryColors[projeto.data.category] || 'primary';
              const icon = categoryIcons[projeto.data.category] || 'arrow_outward';
              const categoryLabel = getCategoryLabel(projeto.data.category);

              return (
                <div key={projeto.id} className="group cursor-pointer">
                    <div className="glass-card asymmetric-radius h-full flex flex-col justify-between overflow-hidden relative">
                        {projeto.data.coverImage ? (
                          <img alt={projeto.data.title} className="w-full aspect-video object-cover rounded-t-xl mb-4" src={projeto.data.coverImage.src} />
                        ) : (
                          <div className="w-full aspect-video bg-surface-container-high rounded-t-xl mb-4 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-outline-variant opacity-50">image</span>
                          </div>
                        )}
                        <div className="relative z-10 space-y-6 px-8">
                            <div className="flex justify-between items-start">
                                <span className={`bg-${color}/10 text-${color} px-3 py-1 rounded-md font-label-sm text-[10px] border border-${color}/20 uppercase tracking-widest`}>
                                  {categoryLabel}
                                </span>
                                <span className={`material-symbols-outlined text-on-surface-variant group-hover:text-${color} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`}>
                                  {icon}
                                </span>
                            </div>
                            <h3 className="font-headline-md text-2xl heading-tight">{projeto.data.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                {projeto.data.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {projeto.data.tags.map((tag: string) => (
                                  <span key={tag} className="px-3 py-1 bg-surface-container-high border border-outline-variant/10 rounded-md text-label-sm">
                                    {tag}
                                  </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 flex items-end justify-between border-t border-outline-variant/10 pt-6 px-8 pb-8">
                            <div className="space-y-1">
                                <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-label-sm">{t('projects.card.viewDetails')}</p>
                                <p className={`text-lg font-bold text-${color}`}>{t('projects.card.explore')}</p>
                            </div>
                        </div>
                    </div>
                </div>
              );
            })}
        </div>
    </section>
  );
}
