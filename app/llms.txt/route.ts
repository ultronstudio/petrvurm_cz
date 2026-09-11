import { BASE_HOURLY_RATE, BASE_PROJECT_RATES } from '@/lib/pricing';
import { SITE_URL } from '@/site.config';

export const dynamic = 'force-static';

export function GET() {
  const content = `# Petr Vurm

> Osobní web Petra Vurma, českého webového vývojáře a software developera. Webům a programování se věnuje od roku 2017 a pracuje na webových stránkách, webových aplikacích, softwaru na míru, API integracích a vlastních projektech.

Petr Vurm je samostatný vývojář, nikoli agentura. Veřejný kontakt je kontakt@petrvurm.cz. IČ: 21180164. Web je v češtině.

Orientační ceny: Web Start od ${BASE_PROJECT_RATES.webStart} Kč, firemní web od ${BASE_PROJECT_RATES.businessWeb} Kč, web s CMS od ${BASE_PROJECT_RATES.cmsWeb} Kč, e-shop od ${BASE_PROJECT_RATES.shop} Kč, webová aplikace od ${BASE_PROJECT_RATES.webApp} Kč. Hodinová sazba je ${BASE_HOURLY_RATE} Kč/h.

## Hlavní stránky

- [Domů](${SITE_URL}/): stručné představení, služby a vybrané projekty.
- [O mně](${SITE_URL}/o-mne): zkušenosti, zaměření, studium a certifikáty.
- [Projekty](${SITE_URL}/projekty): výběr webů, aplikací a dalších projektů.
- [Ceník](${SITE_URL}/cenik): veřejné orientační ceny webů, aplikací a hodinové práce.
- [Jak pracuji](${SITE_URL}/jak-pracuji): postup od zadání po nasazení a předání.
- [Kontakt](${SITE_URL}/kontakt): e-mail, telefon a informace vhodné pro první poptávku.
- [Lokální IT servis](${SITE_URL}/it-servis): doplňkový IT servis ve vybraných lokalitách.

## Vybrané projekty

- [FakeTube](${SITE_URL}/projekty/faketube): vlastní video platforma s uživatelskými účty, nahráváním a přehráváním videí.
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
