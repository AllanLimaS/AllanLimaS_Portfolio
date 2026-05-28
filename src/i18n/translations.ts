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
    'about.skill1.title': 'Websites',
    'about.skill1.desc':
      'Desenvolvimento e publicação de sites institucionais, landing pages, blogs e lojas virtuais.',
    'about.skill2.title': 'RPA',
    'about.skill2.desc':
      'Criação de automações para executar tarefas manuais, repetitivas e operacionais com mais eficiência.',
    'about.skill3.title': 'Dados',
    'about.skill3.desc':
      'Criação de dashboards e análises para transformar dados em visões mais claras para o negócio.',

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
    'about.skill1.title': 'Websites',
    'about.skill1.desc':
      'Development and deployment of institutional websites, landing pages, blogs, and online stores.',
    'about.skill2.title': 'RPA',
    'about.skill2.desc':
      'Creation of automations to execute manual, repetitive, and operational tasks with greater efficiency.',
    'about.skill3.title': 'Data',
    'about.skill3.desc':
      'Creation of dashboards and analytics to transform data into clearer business insights.',

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
