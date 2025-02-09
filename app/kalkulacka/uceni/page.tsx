"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";

interface CenikItemProps {
  title: string;
  description: string;
  basePrice: number; // Základní cena za jednu hodinu (45 minut)
  isOffered?: boolean; // Zda je služba aktuálně nabízena
  type: "doucovani" | "skoleni" | "kurz"; // Typ služby (doučování, školení, kurz),
  pricePerWhat: "hod" | "lekce" | "osoba"; // Cena za co (hodinu, jednu lekci, celý kurz)
  maxCapacity: number; // Maximální kapacita pro doučování/školení/kurz (jedná se o počet hodin, lekci nebo osob kurzu, které lze objednat najednou)
  minParticipants?: number; // Kolik je potřeba objednat (např. minimální počet osob pro kurz - kvůli pronájmu prostor apod.)
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

const cenikItems: CenikItemProps[] = [
  {
    title: "Programování v C#",
    description:
      "Doučování programování v jazyce C# pro začátečníky a pokročilé",
    basePrice: 300,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Tvorba statických webů",
    description: "Doučování tvorby statických webů s HTML, CSS a JS",
    basePrice: 250,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Tvorba webových aplikací",
    description: "Doučování tvorby webových aplikací (Laravel, Next.js apod.)",
    basePrice: 350,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Jak na SEO",
    description:
      "Školení SEO pro začátečníky, základy optimalizace pro vyhledávače a tvorba obsahu, který se vyhledává",
    basePrice: 1500,
    isOffered: false,
    type: "kurz",
    pricePerWhat: "osoba",
    maxCapacity: 15,
    minParticipants: 30,
  },
];

export default function KalkulackaUceni() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // Počet hodin/lekcí
  const [pricePerWhat, setPricePerWhat] = useState<"hod" | "lekce" | "osoba">(
    "hod"
  );
  const [maxCapacity, setMaxCapacity] = useState<number>(1);

  const handleCardClick = (
    service: string,
    pricePer: "hod" | "lekce" | "osoba",
    maxCapacity: number
  ) => {
    // Nastavíme cenu a typ pro aktuálně vybranou službu
    setSelectedServices([service]);
    setPricePerWhat(pricePer); // Při výběru služby nastavíme cenu podle toho, co je specifikováno
    setMaxCapacity(
      cenikItems.find((item) => item.title === service)?.maxCapacity || 1
    );
  };

  const calculatePrice = () => {
    return selectedServices.reduce((total, service) => {
      const selectedItem = cenikItems.find((item) => item.title === service);
      if (selectedItem) {
        // Když máme službu, vynásobíme základní cenu odpovídajícím počtem
        return total + selectedItem.basePrice * quantity;
      }
      return total;
    }, 0);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent("Zájem o Vaše služby");

    // Format the message with detailed service information and pricing
    const body = encodeURIComponent(
      `Dobrý den,\nMám zájem o následující ${
        pricePerWhat == "hod"
          ? "doučování"
          : pricePerWhat == "lekce"
          ? "školení"
          : "kurz"
      }:\n\n${selectedServices
        .map((service) => {
          const selectedItem = cenikItems.find(
            (item) => item.title === service
          );
          if (selectedItem) {
            // Add service description with price per unit and quantity
            return `- ${service} (${
              selectedItem.pricePerWhat === "hod"
                ? `v počtu ${quantity} ${
                    quantity === 1
                      ? "hodiny"
                      : quantity === 2 || quantity == 3 || quantity == 4
                      ? "hodin"
                      : "hodin"
                  }` // pluralization
                : selectedItem.pricePerWhat === "lekce"
                ? `v počtu ${quantity} ${
                    quantity === 1
                      ? "lekce"
                      : quantity === 2 || quantity == 3 || quantity == 4
                      ? "lekcí"
                      : "lekci"
                  }` // pluralization
                : `v počtu ${quantity} ${
                    quantity === 1
                      ? "osoba"
                      : quantity === 2 || quantity == 3 || quantity == 4
                      ? "osoby"
                      : "osob"
                  }` // pluralization
            } za ${formatNumber(selectedItem.basePrice * quantity, {
              style: "currency",
              currency: "CZK",
            })})`;
          }
          return `- ${service}`;
        })
        .join("\n\n")}
        
  Rád bych se dozvěděl více informací o cenách a podmínkách. Děkuji a těším se na odpověď.`
    );

    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container mx-auto max-w-8xl px-4 md:px-6 py-10">
      <div className="flex">
        <div className="flex-1 mr-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-primary">
            Kalkulátor doučování, školení a kurzů
          </h1>
          <p className="text-lg mb-6 text-center text-white">
            Vyberte služby, které chcete, a kalkulačka vám spočítá cenu.
          </p>

          {/* Sekce pro doučování */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Doučování
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cenikItems.filter(
                (item) => item.type === "doucovani" && item.isOffered
              ).length === 0 ? (
                <p className="text-md text-red-500">
                  V tuto chvíli nemám žádné doučování v nabídce.
                </p>
              ) : (
                cenikItems
                  .filter((item) => item.type === "doucovani" && item.isOffered)
                  .map((item) => (
                    <Card
                      key={item.title}
                      className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform cursor-pointer ${
                        selectedServices.includes(item.title)
                          ? "bg-primary text-black scale-105"
                          : "hover:shadow-xl"
                      }`}
                      onClick={() =>
                        handleCardClick(
                          item.title,
                          item.pricePerWhat,
                          item.maxCapacity
                        )
                      }
                    >
                      <h4
                        className={`text-xl font-semibold mt-4 ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`mt-2 text-sm ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.description}
                      </p>
                      <p className="mt-6 font-bold text-center text-xl">
                        <span
                          className={`${
                            selectedServices.includes(item.title)
                              ? "text-black"
                              : "text-primary"
                          }`}
                        >
                          {formatNumber(item.basePrice, {
                            style: "currency",
                            currency: "CZK",
                          })}
                          <small className="text-xs">
                            /{item.pricePerWhat}
                          </small>
                        </span>
                      </p>
                    </Card>
                  ))
              )}
            </div>
          </section>

          {/* Sekce pro školení */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Školení</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cenikItems.filter(
                (item) => item.type === "skoleni" && item.isOffered
              ).length === 0 ? (
                <p className="text-md text-red-500">
                  V tuto chvíli nemám žádné školení v nabídce.
                </p>
              ) : (
                cenikItems
                  .filter((item) => item.type === "skoleni" && item.isOffered)
                  .map((item) => (
                    <Card
                      key={item.title}
                      className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform cursor-pointer ${
                        selectedServices.includes(item.title)
                          ? "bg-primary text-black scale-105"
                          : "hover:shadow-xl"
                      }`}
                      onClick={() =>
                        handleCardClick(
                          item.title,
                          item.pricePerWhat,
                          item.maxCapacity
                        )
                      }
                    >
                      <h4
                        className={`text-xl font-semibold mt-4 ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`mt-2 text-sm ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.description}
                      </p>
                      <p className="mt-6 font-bold text-center text-xl">
                        <span
                          className={`${
                            selectedServices.includes(item.title)
                              ? "text-black"
                              : "text-primary"
                          }`}
                        >
                          {formatNumber(item.basePrice, {
                            style: "currency",
                            currency: "CZK",
                          })}
                          <small className="text-xs">
                            /{item.pricePerWhat}
                          </small>
                        </span>
                      </p>
                    </Card>
                  ))
              )}
            </div>
          </section>

          {/* Sekce pro kurzy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Kurzy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cenikItems.filter(
                (item) => item.type === "kurz" && item.isOffered
              ).length === 0 ? (
                <p className="text-md text-red-500">
                  V tuto chvíli nemám žádné kurzy v nabídce.
                </p>
              ) : (
                cenikItems
                  .filter((item) => item.type === "kurz" && item.isOffered)
                  .map((item) => (
                    <Card
                      key={item.title}
                      className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform cursor-pointer ${
                        selectedServices.includes(item.title)
                          ? "bg-primary text-black scale-105"
                          : "hover:shadow-xl"
                      }`}
                      onClick={() =>
                        handleCardClick(
                          item.title,
                          item.pricePerWhat,
                          item.maxCapacity
                        )
                      }
                    >
                      <h4
                        className={`text-xl font-semibold mt-4 ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`mt-2 text-sm ${
                          selectedServices.includes(item.title)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.description}
                      </p>
                      <p className="mt-6 font-bold text-center text-xl">
                        <span
                          className={`${
                            selectedServices.includes(item.title)
                              ? "text-black"
                              : "text-primary"
                          }`}
                        >
                          {formatNumber(item.basePrice, {
                            style: "currency",
                            currency: "CZK",
                          })}
                          <small className="text-xs">
                            /{item.pricePerWhat}
                          </small>
                        </span>
                      </p>

                      {/* Badge pro minimální počet účastníků */}
                      <div
                        className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full z-10"
                      >
                        Minimálně {item.minParticipants} účastníků
                      </div>
                    </Card>
                  ))
              )}
            </div>
          </section>
        </div>

        {/* Sticky panel pro celkovou cenu */}
        <div className="sticky top-24 w-80 p-6 rounded-lg h-[120px]">
          <h3 className="text-2xl font-semibold">Celková cena</h3>
          <p className="text-3xl mt-4 text-primary font-bold">
            {selectedServices.length === 0
              ? "0 Kč"
              : formatNumber(calculatePrice(), {
                  style: "currency",
                  currency: "CZK",
                })}
          </p>

          <div className="mt-2">
            {/* Slider pro počet hodin/lekcí */}
            {selectedServices.length > 0 && (
              <section className="mb-8">
                <div className="flex justify-between mt-2">
                  <h3 className="text-md text-white mb-2">
                    {pricePerWhat === "hod"
                      ? "Počet hodin"
                      : pricePerWhat === "lekce"
                      ? "Počet lekcí"
                      : "Počet osob"}
                  </h3>
                  <span>{quantity}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={maxCapacity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-primary"
                  placeholder="Počet"
                />
              </section>
            )}
          </div>

          {selectedServices.length > 0 && (
            <a
              href={generateMailtoLink()}
              className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/70 hover:text-white focus:outline-none focus:ring-2 mt-2"
            >
              Kontaktovat mě
            </a>
          )}
        </div>
      </div>
      <div
        className="p-4 border-yellow-500 border text-sm rounded-lg text-yellow-500"
        role="alert"
      >
        <p>
          Ceny kurzů jsou stanoveny pevně. Platba probíhá buď online na účet,
          nebo hotově osobně. Platbu je nutné provést předem, aby byla rezervace
          potvrzena. Kurzy mají stanovenou minimální kapacitu účastníků, což je
          nutné z důvodu pronájmu prostor. Pokud se kurz nenaplní do stanoveného
          minima, celková částka bude vrácena.
        </p>
      </div>
    </div>
  );
}
