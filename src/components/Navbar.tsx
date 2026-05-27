import React, { useState, useEffect } from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface NavbarProps {
  lang?: Lang;
}

export default function Navbar({ lang: langProp }: NavbarProps) {
  // Fallback: detecta o idioma pela URL se a prop não chegar
  const lang: Lang = langProp ?? (typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'pt');
  const t = useTranslations(lang);

  const toggleLanguage = () => {
    const target = lang === 'pt' ? '/en' : '/pt';
    window.location.href = target;
  };

  const base = `/${lang}`;

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (section: string) => {
    return activeSection === section
      ? "text-primary font-bold border-b-2 border-primary/40 pb-1 font-label-sm transition-all"
      : "text-on-surface-variant font-label-sm hover:text-primary transition-colors duration-300";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-7xl mx-auto relative">
            <div></div>
            <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
                <a className={getLinkClass('about')}
                    href={`${base}#about`}>{t('nav.about')}</a>
                <a className={getLinkClass('projects')}
                    href={`${base}#projects`}>{t('nav.projects')}</a>
                <a className={getLinkClass('contact')}
                    href={`${base}#contact`}>{t('nav.contact')}</a>
            </div>
            <div className="flex gap-4 items-center">
              <button onClick={toggleLanguage} className="text-on-surface-variant hover:text-primary transition-colors font-label-sm font-bold uppercase tracking-widest" aria-label="Toggle Language">
                <span className={lang === 'pt' ? 'text-primary' : ''}>pt-br</span> / <span className={lang === 'en' ? 'text-primary' : ''}>en</span>
              </button>
            </div>
        </div>
    </nav>
  );
}
