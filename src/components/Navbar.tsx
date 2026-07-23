import React, { useState, useEffect } from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface NavbarProps {
  lang?: Lang;
}

export default function Navbar({ lang: langProp }: NavbarProps) {
  const lang: Lang = langProp ?? (typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'pt');
  const t = useTranslations(lang);

  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const target = lang === 'pt' ? '/en' : '/pt';
    window.location.href = target;
  };

  const base = `/${lang}`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkClass = (section: string) =>
    activeSection === section
      ? 'text-primary font-medium text-sm'
      : 'text-on-surface-variant/60 hover:text-on-surface transition-colors text-sm';

  const isActive = (section: string) => activeSection === section;

  const mobileLinkClass = (section: string) =>
    activeSection === section
      ? 'text-primary font-medium'
      : 'text-on-surface-variant hover:text-on-surface transition-colors';

  return (
    <>
      <nav className="hidden md:block fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-3">
          <div className="w-24" />
          <div className="flex items-center gap-10" role="navigation" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
            <a className={linkClass('hero')} href={`${base}#hero`} aria-current={isActive('hero') ? 'true' : undefined}>
              {t('nav.home')}
            </a>
            <a className={linkClass('about')} href={`${base}#about`} aria-current={isActive('about') ? 'true' : undefined}>
              {t('nav.about')}
            </a>
            <a className={linkClass('projects')} href={`${base}#projects`} aria-current={isActive('projects') ? 'true' : undefined}>
              {t('nav.projects')}
            </a>
            <a className={linkClass('contact')} href={`${base}#contact`} aria-current={isActive('contact') ? 'true' : undefined}>
              {t('nav.contact')}
            </a>
          </div>
          <div className="w-24 flex justify-end">
            <button
              onClick={toggleLanguage}
              className="text-xs text-on-surface-variant/50 hover:text-on-surface transition-colors font-medium uppercase tracking-wider"
              aria-label={lang === 'pt' ? 'Mudar para inglês' : 'Switch to Portuguese'}
            >
              <span className={lang === 'pt' ? 'text-primary' : ''}>pt</span>
              <span className="mx-0.5 text-outline-variant/30">/</span>
              <span className={lang === 'en' ? 'text-primary' : ''}>en</span>
            </button>
          </div>
        </div>
      </nav>

      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 flex flex-col gap-1 p-2 rounded-full bg-background/90 backdrop-blur-md border border-outline-variant/10 shadow-sm"
        aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className="block w-5 h-px bg-on-surface" />
        <span className="block w-5 h-px bg-on-surface" />
        <span className="block w-5 h-px bg-on-surface" />
      </button>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-background border-l border-outline-variant/10 shadow-2xl transition-transform duration-300 ease-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end items-center px-6 py-5">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 -mr-1 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label={lang === 'pt' ? 'Fechar menu' : 'Close menu'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1 px-6" role="navigation" aria-label={lang === 'pt' ? 'Navegação mobile' : 'Mobile navigation'}>
          {(['hero', 'about', 'projects', 'contact'] as const).map((section) => (
            <a
              key={section}
              href={`${base}#${section}`}
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-3 -mx-3 rounded-lg text-base transition-colors ${mobileLinkClass(section)}`}
              aria-current={isActive(section) ? 'true' : undefined}
            >
              {section === 'hero' ? t('nav.home') : t(`nav.${section}` as any)}
            </a>
          ))}
        </div>

        <div className="px-6 py-6">
          <button
            onClick={toggleLanguage}
            className="text-xs text-on-surface-variant/60 hover:text-on-surface transition-colors font-medium uppercase tracking-wider"
            aria-label={lang === 'pt' ? 'Mudar para inglês' : 'Switch to Portuguese'}
          >
            <span className={lang === 'pt' ? 'text-primary' : ''}>pt</span>
            <span className="mx-0.5 text-outline-variant/40">/</span>
            <span className={lang === 'en' ? 'text-primary' : ''}>en</span>
          </button>
        </div>
      </div>
    </>
  );
}
