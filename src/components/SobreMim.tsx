import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface SobreMimProps {
  data: any;
  lang: Lang;
  children?: React.ReactNode;
}

export default function SobreMim({ data, lang, children }: SobreMimProps) {
  const t = useTranslations(lang);

  const skills = [
    {
      icon: 'code',
      title: t('about.skill1.title'),
      desc: t('about.skill1.desc'),
    },
    {
      icon: 'smart_toy',
      title: t('about.skill2.title'),
      desc: t('about.skill2.desc'),
    },
    {
      icon: 'analytics',
      title: t('about.skill3.title'),
      desc: t('about.skill3.desc'),
    },
  ];

  return (
    <section className="py-xxl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto bg-surface-container-lowest/30 rounded-[3rem]" id="about">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <div className="text-primary/40 font-display-lg text-4xl opacity-20 select-none">A.</div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background heading-tight">
                {data.data.title || 'Perfil Híbrido.'}
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                {children}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 w-full">
                {skills.map((skill) => (
                  <div key={skill.icon} className="p-8 rounded-2xl border border-outline-variant/10 bg-surface-container-low text-left group hover:border-primary/30 transition-all duration-500">
                      <span className="material-symbols-outlined text-primary mb-6 text-4xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                      <h4 className="font-headline-md text-xl mb-3">{skill.title}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{skill.desc}</p>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}
