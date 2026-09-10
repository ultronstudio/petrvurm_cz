---
title: "Twitch Game: Red Light, Green Light"
description: "Twitch chatbot pro jednoduchou hru Red Light, Green Light přímo v chatu"
previewImage: "/images/projekty/twitch-chatbot-red-light-green-light.png"
created: "10. února 2025"
status: "Dokončeno"
licence: "Apache License 2.0"
---

Chatbot umožňuje divákům streamu hrát Red Light, Green Light přímo přes Twitch chat.

## Jak hra funguje

- hráč, který napíše zprávu během červeného světla, je na jednu minutu vyřazen pomocí timeoutu,
- chatbot oznamuje stav hry a výsledek v chatu,
- streamer může změnit délku jednotlivých fází i celé hry,
- pro ovládání stačí příkazy pro spuštění a ukončení.

## Příkazy

`!start` – spustí hru

`!end` – ukončí hru

## Technologie

Node.js, JavaScript a Twitch API.

## Odkazy

- [GitHub](https://github.com/ultronstudio/twitch-chatbot-red-light-green-light)
