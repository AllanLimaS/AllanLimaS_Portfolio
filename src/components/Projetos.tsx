import React, { useState } from 'react';
import { useTranslations, type Lang } from '../i18n/translations';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjetosProps {
  projetos: any[];
  lang: Lang;
}

export default function Projetos({ projetos, lang }: ProjetosProps) {
  const t = useTranslations(lang);

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const sortedProjetos = [...projetos].sort((a: any, b: any) => {
    const orderA = a.data.order ?? 99;
    const orderB = b.data.order ?? 99;
    return orderA - orderB;
  });

  const filteredProjetos = activeFilter === 'All' 
    ? sortedProjetos 
    : sortedProjetos.filter((p: any) => p.data.category.includes(activeFilter));

  const getFilterClass = (filter: string) => {
    return activeFilter === filter
      ? "px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-sm transition-all shadow-lg shadow-primary/20"
      : "px-6 py-2.5 rounded-full border border-outline-variant/20 text-on-surface-variant font-label-sm hover:border-primary/40 transition-all";
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto scroll-mt-16" id="projects">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background heading-tight">
                    {t('projects.heading')}
                </h2>
                <p className="text-on-surface-variant max-w-md text-body-lg mt-2">
                    {t('projects.subtitle')}
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveFilter('All')} className={getFilterClass('All')}>
                  {t('projects.filter.all')}
                </button>
                <button onClick={() => setActiveFilter('RPA')} className={getFilterClass('RPA')}>RPA</button>
                <button onClick={() => setActiveFilter('Web')} className={getFilterClass('Web')}>Web</button>
                <button onClick={() => setActiveFilter('Dados')} className={getFilterClass('Dados')}>
                  {t('projects.category.dados')}
                </button>
                <button onClick={() => setActiveFilter('App')} className={getFilterClass('App')}>App</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjetos.map((projeto: any) => (
              <ProjectCard key={projeto.id} projeto={projeto} lang={lang} onClick={() => setSelectedProject(projeto)} />
            ))}
        </div>

        {selectedProject && (
          <ProjectModal projeto={selectedProject} lang={lang} onClose={() => setSelectedProject(null)} />
        )}
    </section>
  );
}
