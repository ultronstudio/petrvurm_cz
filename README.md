# petrvurm.cz

Osobní a profesní web Petra Vurma zaměřený na firemní weby, webové aplikace, zakázkový software a související vývojové služby.

## Technologie

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion pouze tam, kde má animace skutečný přínos
- Markdown pro obsah detailů projektů

## Lokální spuštění

Požadavky: aktuální Node.js LTS a npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vývojový server běží standardně na `http://localhost:3000`.

## Proměnné prostředí

Viz `.env.example`.

- `MAPY_API_KEY` – serverový klíč pro Mapy.cz API. Nikdy nesmí být commitnutý do repozitáře.
- `NEXT_PUBLIC_SITE_URL` – veřejná URL webu, v produkci `https://petrvurm.cz`.
- `MAPY_REFERER` – volitelný referer/origin pro Mapy.cz klíč omezený na konkrétní doménu.

Lokální hodnoty patří do `.env.local` nebo jiného ignorovaného env souboru.

## Kontroly a build

```bash
npm run lint
npm run typecheck
npm run build
```

Produkční spuštění sestavené aplikace:

```bash
npm run start
```

## Deployment

Repozitář je propojen s Vercel. Push do pracovní branche vytvoří Preview Deployment; produkční deployment vzniká z hlavní branche podle nastavení projektu ve Vercel.

Citlivé hodnoty se spravují ve Vercel Environment Variables, nikoli v GitHub repozitáři.

## Struktura

- `app/` – routy, metadata a serverové/API handlery
- `components/` – sdílené UI komponenty
- `lib/` – konfigurace služeb, cen a lokalit
- `projekty/` – Markdown obsah případových ukázek
- `public/` – statické obrázky a dokumenty
- `site.config.ts` – sdílená konfigurace URL, rout a lokálních služeb

## Bezpečnost

Skutečné API klíče, tokeny a hesla do repozitáře nepatří. Pokud se secret někdy objevil v Git historii, samotné smazání souboru nestačí — klíč je nutné zneplatnit/rotovat u poskytovatele a aktualizovat v deployment prostředí.
