export interface TeachingTopic {
  id: string;
  name: string;
  description: string;
  price: number;
  details: string[];
}

export interface GroupTopic {
  id: string;
  name: string;
  description: string;
  audiences: string[];
}

export const TEACHING_TOPICS: TeachingTopic[] = [
  {
    id: 'web-basics',
    name: 'HTML, CSS a JavaScript',
    description: 'Základy tvorby webu, responzivní rozvržení, práce s DOM a praktické procvičení na vlastním zadání.',
    price: 650,
    details: ['začátečníci', 'školní látka', 'vlastní menší web'],
  },
  {
    id: 'csharp',
    name: 'C# a základy programování',
    description: 'Proměnné, podmínky, cykly, metody, OOP, práce s chybami a vysvětlení školních i vlastních úloh.',
    price: 700,
    details: ['základy algoritmizace', 'OOP', 'debugging'],
  },
  {
    id: 'git-databases',
    name: 'Git, GitHub a databáze',
    description: 'Praktická práce s verzováním, repozitářem, branchemi a základy SQL a relačního návrhu.',
    price: 700,
    details: ['Git a GitHub', 'SQL', 'návrh databáze'],
  },
  {
    id: 'laravel',
    name: 'PHP, Laravel a webové aplikace',
    description: 'Backend, routy, formuláře, databáze, autentizace a postup od jednoduché aplikace k použitelnému projektu.',
    price: 800,
    details: ['PHP', 'Laravel', 'backend a databáze'],
  },
  {
    id: 'modern-web-apps',
    name: 'Moderní webové aplikace',
    description: 'Architektura aplikace, API, React nebo Next.js, práce s backendem, nasazení a produkční souvislosti.',
    price: 800,
    details: ['React / Next.js', 'API', 'deployment'],
  },
  {
    id: 'project-mentoring',
    name: 'Mentoring a debugging vlastního projektu',
    description: 'Společné projití kódu, hledání chyb, návrh dalšího postupu a vysvětlení problémů místo prostého napsání řešení za vás.',
    price: 800,
    details: ['code review', 'debugging', 'návrh dalšího postupu'],
  },
];

export const TEACHING_MIN_PRICE = Math.min(...TEACHING_TOPICS.map((topic) => topic.price));

export const GROUP_TOPICS: GroupTopic[] = [
  {
    id: 'modern-web',
    name: 'Jak vzniká moderní web',
    description: 'Od domény a HTML přes backend a databázi až po server, nasazení, výkon, SEO a základní zabezpečení.',
    audiences: ['školy', 'knihovny', 'veřejnost'],
  },
  {
    id: 'localhost-production',
    name: 'Od localhostu k produkci',
    description: 'Co všechno chybí mezi školním projektem, který běží na počítači, a aplikací připravenou pro skutečné uživatele.',
    audiences: ['střední školy', 'začínající vývojáři'],
  },
  {
    id: 'ai-development',
    name: 'Vývoj s AI bez AI slopu',
    description: 'Jak AI použít jako nástroj, ale nepřevzít slepě špatnou architekturu, zbytečné závislosti, bezpečnostní chyby nebo generické UI.',
    audiences: ['IT školy', 'vývojáři', 'firmy'],
  },
  {
    id: 'internet-scams',
    name: 'Jak se nenechat napálit na internetu',
    description: 'Phishing, falešné přihlašovací stránky, krádeže účtů, podvodné QR kódy, sociální inženýrství, MFA a základní obrana.',
    audiences: ['žáci a studenti', 'veřejnost', 'knihovny'],
  },
  {
    id: 'senior-safety',
    name: 'Bezpečný internet pro seniory',
    description: 'Prakticky a bez zbytečného žargonu: podvodné SMS a telefonáty, falešné banky a e-shopy, vzdálený přístup, hesla a ověřování identity.',
    audiences: ['senioři', 'knihovny', 'komunitní centra'],
  },
  {
    id: 'git-workshop',
    name: 'Git a GitHub v praxi',
    description: 'Praktický workshop od prvního commitu přes branche a pull request až po týmovou práci na repozitáři.',
    audiences: ['školy', 'začínající vývojáři', 'kroužky'],
  },
];
