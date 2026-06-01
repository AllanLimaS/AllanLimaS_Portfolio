import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = useTranslations(lang);

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-8">
        <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest text-center">
            © {new Date().getFullYear()} ALLAN DE LIMA DA SILVA. {t('footer.rights')}.
        </p>
    </footer>
  );
}
