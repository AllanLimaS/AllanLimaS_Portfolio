import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface HeroProps {
  data: any;
  lang: Lang;
  children?: React.ReactNode;
}

export default function Hero({ data, lang, children }: HeroProps) {
  const t = useTranslations(lang);
  const base = `/${lang}`;

  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pt-32 pb-xxl">
        <div className="max-w-4xl space-y-10">

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-[1.05] heading-tight">
                {data.data.name && (
                  <span className="block text-primary font-bold uppercase tracking-widest text-sm mb-4">{data.data.name}</span>
                )}
                <span className="text-on-background primary-glow">{data.data.title}</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {data.data.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <a className="inline-flex items-center justify-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-label-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-secondary-container/20"
                    href={`${base}#projects`}>
                    {t('hero.explore')}
                </a>
                <a className="inline-flex items-center justify-center border border-outline-variant/30 text-on-surface px-8 py-4 rounded-xl font-label-sm font-bold hover:bg-white/5 transition-all"
                    href={`${base}#contact`}>
                    {data.data.buttonText}
                </a>
            </div>
        </div>
    </section>
  );
}
