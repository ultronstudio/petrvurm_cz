---
slug: "testovaci-clanek"
title: "Toto je testovací článek"
excerpt: "První testovací příspěvek ověřující, že blog správně načítá Markdown, metadata, témata i datum publikování."
image: "/images/projekty/petrvurm.jpg"
imageAlt: "Náhled webu Petra Vurma"
publishedAt: "2026-09-15"
updatedAt: ""
topics:
  - "Webový vývoj"
  - "Testování"
keywords:
  - "testovací článek"
  - "Markdown blog"
  - "Next.js"
draft: false
index: true
---

Toto je první testovací článek na mém blogu. Slouží k ověření, že se příspěvky napsané v Markdownu správně zobrazí ve výpisu i na samostatné stránce.

## Co tento článek ověřuje

- načtení titulku a perexu,
- vlastní URL podle hodnoty `slug`,
- datum publikování,
- témata a klíčová slova,
- obrázek článku,
- formátování běžného Markdownu.

## Ukázka formátování

V článku lze používat **tučný text**, *kurzívu*, odkazy, seznamy i ukázky kódu.

```ts
const blogFunguje = true;

console.log(blogFunguje ? 'Blog funguje.' : 'Je potřeba něco opravit.');
```

Pokud se tento text zobrazuje na adrese `/blog/testovaci-clanek`, načítání Markdown článků funguje správně.
