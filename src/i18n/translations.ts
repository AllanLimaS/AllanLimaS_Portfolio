export const languages = ['pt', 'en'] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'pt';

// ───────────────────────────────────────────────
// Dicionário completo de strings da UI
// ───────────────────────────────────────────────
export const ui = {
  pt: {
    // Meta / SEO
    'meta.title': 'Allan Lima | Portfólio',
    'meta.description':
      'Portfólio de Allan Lima – Desenvolvimento Web, RPA e Dados.',

    // Navbar
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'nav.hire': 'Me Contrate',

    // Hero
    'hero.badge': 'Excelência Digital',
    'hero.heading.before': 'Transformando o futuro com',
    'hero.explore': 'Ver Projetos',

    // Sobre Mim — cards de skills
    'about.skill1.title': 'Arquitetura Web',
    'about.skill1.desc':
      'Frontends acessíveis e escaláveis com backends robustos e nativos na nuvem.',
    'about.skill2.title': 'RPA Inteligente',
    'about.skill2.desc':
      'Automação empresarial de tarefas repetitivas e de alto volume.',
    'about.skill3.title': 'Engenharia de Dados',
    'about.skill3.desc':
      'Transformando logs brutos em inteligência de negócios acionável.',

    // Projetos
    'projects.heading': 'Trabalhos Selecionados',
    'projects.subtitle':
      'Explorando a interseção entre eficiência e design de alto nível.',
    'projects.filter.all': 'Todos',
    'projects.card.viewDetails': 'Ver Detalhes',
    'projects.card.explore': 'Explorar →',
    'projects.category.dados': 'Dados',

    // Contato
    'contact.heading.before': 'Vamos construir algo',
    'contact.heading.highlight': 'significativo.',

    // Footer
    'footer.rights': 'TODOS OS DIREITOS RESERVADOS',
  },

  en: {
    // Meta / SEO
    'meta.title': 'Allan Lima | Portfolio',
    'meta.description':
      "Allan Lima's portfolio - Web Development, RPA and Data.",

    // Navbar
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire Me',

    // Hero
    'hero.badge': 'Crafting Digital Excellence',
    'hero.heading.before': 'Building the future through',
    'hero.explore': 'Explore Projects',

    // Sobre Mim — cards de skills
    'about.skill1.title': 'Web Architecture',
    'about.skill1.desc':
      'Scalable, accessible frontends & robust, cloud-native backends.',
    'about.skill2.title': 'Intelligent RPA',
    'about.skill2.desc':
      'Enterprise-grade automation of repetitive, high-volume tasks.',
    'about.skill3.title': 'Data Engineering',
    'about.skill3.desc':
      'Transforming raw logs into actionable business intelligence.',

    // Projetos
    'projects.heading': 'Selected Work',
    'projects.subtitle':
      'Exploring the intersection of efficiency and high-end design.',
    'projects.filter.all': 'All',
    'projects.card.viewDetails': 'View Details',
    'projects.card.explore': 'Explore →',
    'projects.category.dados': 'Data',

    // Contato
    'contact.heading.before': "Let's build something",
    'contact.heading.highlight': 'significant.',

    // Footer
    'footer.rights': 'ALL RIGHTS RESERVED',
  },
} as const;

// ───────────────────────────────────────────────
// Helper: retorna função t() para o idioma dado
// ───────────────────────────────────────────────
export type UIKeys = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKeys): string {
    const dict = ui[lang] as Record<string, string>;
    return dict[key] ?? (ui['pt'] as Record<string, string>)[key];
  };
}
