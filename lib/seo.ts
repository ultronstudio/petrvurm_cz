import { SITE_URL } from '@/site.config';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SOCIAL_PROFILES = [
  'https://github.com/ultronstudio',
  'https://www.linkedin.com/in/petrvurm/',
  'https://www.facebook.com/vurmpetr',
  'https://www.instagram.com/ultronek/',
] as const;

export function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export const personJsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Petr Vurm',
  givenName: 'Petr',
  familyName: 'Vurm',
  url: SITE_URL,
  mainEntityOfPage: `${SITE_URL}/o-mne`,
  image: `${SITE_URL}/images/me/cro_interview.webp`,
  jobTitle: 'Webový vývojář a software developer',
  description: 'Webový vývojář a software developer. Webům a programování se věnuje od roku 2017.',
  email: 'mailto:kontakt@petrvurm.cz',
  telephone: '+420777416611',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'IČ',
    value: '21180164',
  },
  sameAs: SOCIAL_PROFILES,
  knowsAbout: [
    'Web development',
    'Web applications',
    'Software development',
    'Laravel',
    'React',
    'TypeScript',
    'PHP',
    'Databases',
    'API integrations',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'business inquiries',
    email: 'kontakt@petrvurm.cz',
    telephone: '+420777416611',
    availableLanguage: 'cs',
  },
} as const;

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Petr Vurm',
  description: 'Osobní web Petra Vurma – webové stránky, webové aplikace, software a vybrané projekty.',
  inLanguage: 'cs-CZ',
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  about: { '@id': PERSON_ID },
} as const;

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
