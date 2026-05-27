import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface ContatoProps {
    data: any;
    lang: Lang;
    children?: React.ReactNode;
}

export default function Contato({ data, lang, children }: ContatoProps) {
    const t = useTranslations(lang);

    return (
        <section className="py-xxl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto" id="contact">
            <div className="bg-surface-container-low rounded-[2.5rem] p-12 md:p-32 border border-outline-variant/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative z-10 space-y-12">
                    <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg heading-tight">
                        {t('contact.heading.before')} <span className="text-primary italic">{t('contact.heading.highlight')}</span>
                    </h2>
                    <div className="py-12">
                        <a className="text-2xl md:text-5xl font-bold border-b-[3px] border-primary/20 hover:border-primary transition-all duration-500 pb-4 inline-block heading-tight" href="mailto:hello@devsystems.tech">
                            hello@devsystems.tech
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 pt-8">
                        <a className="font-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3" href="#">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> GITHUB
                        </a>
                        <a className="font-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3" href="#">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> LINKEDIN
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
