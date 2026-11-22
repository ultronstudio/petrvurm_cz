import { TEACHING_MIN_PRICE } from '@/lib/teaching';
import { SITE_URL } from '@/site.config';

export const dynamic = 'force-static';

export function GET() {
  const content = `# Petr Vurm

> Osobní web Petra Vurma, českého webového vývojáře a software developera. Webům a programování se věnuje od roku 2017 a pracuje na webových stránkách, webových aplikacích, softwaru na míru, API integracích a vlastních projektech.

Petr Vurm je samostatný vývojář, nikoli agentura. Veřejný kontakt je kontakt@petrvurm.cz. IČ: 21180164. Web je v češtině.

Cenu webu nebo aplikace navrhne Petr podle zadání. Individuální výuka programování začíná na ${TEACHING_MIN_PRICE} Kč za 60 minut.

## Hlavní stránky

- [Domů](${SITE_URL}/): stručné představení, služby a vybrané projekty.
- [O mně](${SITE_URL}/o-mne): zkušenosti, zaměření, studium a certifikáty.
- [Projekty](${SITE_URL}/projekty): výběr webů, aplikací a dalších projektů.
- [Blog](${SITE_URL}/blog): články o webovém vývoji, programování a technologiích.
- [Výuka, workshopy a přednášky](${SITE_URL}/vyuka): individuální výuka programování a webového vývoje, mentoring, workshopy, webináře a přednášky pro jednotlivce, školy, knihovny, firmy a další organizace.
- [Kontakt](${SITE_URL}/kontakt): e-mail, telefon a informace vhodné pro první poptávku.
- [Lokální IT servis](${SITE_URL}/it-servis): doplňkový IT servis ve vybraných lokalitách.

## Výuka a skupinové akce

Individuální výuka zahrnuje HTML/CSS/JavaScript, C#, Git/GitHub, databáze, PHP/Laravel, moderní webové aplikace a mentoring nebo debugging vlastního projektu.

Skupinové workshopy a přednášky mohou být připravené například na témata vzniku moderního webu, cesty od localhostu k produkci, vývoje s AI bez nekontrolovaného generovaného kódu, Git/GitHub nebo praktické digitální bezpečnosti pro mladé, veřejnost a seniory. U skupinových akcí se cena stanovuje podle rozsahu a cílové skupiny.

## Vybrané doplňkové služby

- integrace platební brány,
- integrace CRM, fakturace a dalších API,
- měsíční správa webu,
- technické SEO a strukturovaná data,
- bezpečnostní audit a hardening,
- testování a kontrola přístupnosti,
- revize a debloat webu vzniklého s výraznou pomocí generátorů kódu.

## Vybrané projekty

- [FakeTube](${SITE_URL}/projekty/faketube): vlastní video platforma s uživatelskými účty, nahráváním a přehráváním videí.
- [Ráj vlny](${SITE_URL}/projekty/raj-vlny): údržba e-shopu s přízí a integrace platební brány Comgate.
- [BressKamp](${SITE_URL}/projekty/bresskamp): one-page firemní web pro německou společnost.
- [Ivan](${SITE_URL}/projekty/sspt-ivan): nástroj pro přípravu zasedacího pořádku matematické soutěže.
- [MeGen](${SITE_URL}/projekty/megen): webová aplikace pro generování memů z textu a obrázků.
- [HopHub](${SITE_URL}/projekty/hophub): experimentální rozšíření prohlížeče měnící vzhled GitHubu.
- [Twitch: Red Light, Green Light](${SITE_URL}/projekty/twitch-chatbot-red-light-green-light): chatbot s jednoduchou hrou přímo v Twitch chatu.

## Kontakt a identita

- [GitHub](https://github.com/ultronstudio)
- [LinkedIn](https://www.linkedin.com/in/petrvurm/)
- [Facebook](https://www.facebook.com/vurmpetr)
- [Instagram](https://www.instagram.com/ultronek/)

## Optional

- [Obchodní podmínky](${SITE_URL}/obchodni-podminky)
- [Zásady ochrany osobních údajů](${SITE_URL}/gdpr)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
