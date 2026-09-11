'use client';

import { useMemo, useState } from 'react';
import {
  ADDON_GROUPS,
  WEB_ADDONS,
  WEB_PACKAGES,
  WEB_PRICING_HOURLY_RATE,
  type WebPricingItem,
} from '@/lib/web-pricing';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
  }).format(value);
}

function priceLabel(item: WebPricingItem): string {
  const base = `od ${formatCurrency(item.price)}`;
  if (item.billing === 'monthly') return `${base} / měsíc`;
  if (item.billing === 'yearly') return `${base} / rok`;
  return base;
}

export default function WebPriceCalculator() {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const selectedItems = useMemo(() => {
    const selectedPackage = WEB_PACKAGES.find((item) => item.id === selectedPackageId);
    const addons = WEB_ADDONS.filter((item) => selectedAddonIds.includes(item.id));
    return selectedPackage ? [selectedPackage, ...addons] : addons;
  }, [selectedAddonIds, selectedPackageId]);

  const totals = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => {
          sum[item.billing] += item.price;
          return sum;
        },
        { 'one-time': 0, monthly: 0, yearly: 0 } as Record<WebPricingItem['billing'], number>,
      ),
    [selectedItems],
  );

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const clearSelection = () => {
    setSelectedPackageId(null);
    setSelectedAddonIds([]);
  };

  const mailtoHref = useMemo(() => {
    if (selectedItems.length === 0) return 'mailto:kontakt@petrvurm.cz?subject=Poptávka%20webu';

    const lines = selectedItems.map((item) => `- ${item.name}: ${priceLabel(item)}`);
    const totalsText = [
      totals['one-time'] > 0 ? `Jednorázově: od ${formatCurrency(totals['one-time'])}` : null,
      totals.monthly > 0 ? `Pravidelně: od ${formatCurrency(totals.monthly)} / měsíc` : null,
      totals.yearly > 0 ? `Pravidelně: od ${formatCurrency(totals.yearly)} / rok` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const subject = encodeURIComponent('Poptávka podle kalkulátoru');
    const body = encodeURIComponent(
      `Dobrý den,\n\nz kalkulátoru na petrvurm.cz jsem vybral:\n\n${lines.join('\n')}\n\n${totalsText}\n\nProsím o upřesnění rozsahu a finální nabídku.\n`,
    );

    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  }, [selectedItems, totals]);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
      <div>
        <fieldset>
          <legend className="text-2xl font-bold">1. Základ projektu</legend>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Vyberte jeden balíček, nebo pokračujte pouze doplňkovou službou pro existující web.
          </p>

          <div className="mt-6 border-b border-white/10">
            <label className="grid cursor-pointer gap-2 border-t border-white/10 py-5 sm:grid-cols-[1.5rem_1fr_auto] sm:gap-4">
              <input
                type="radio"
                name="web-package"
                checked={selectedPackageId === null}
                onChange={() => setSelectedPackageId(null)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span>
                <span className="block font-semibold text-white">Jen doplňková služba</span>
                <span className="mt-1 block text-sm leading-6 text-white/60">Pro úpravu, audit nebo rozšíření už existujícího webu.</span>
              </span>
              <span className="text-sm text-white/50 sm:text-right">bez základního balíčku</span>
            </label>

            {WEB_PACKAGES.map((item) => {
              const selected = selectedPackageId === item.id;
              return (
                <label key={item.id} className="grid cursor-pointer gap-2 border-t border-white/10 py-5 sm:grid-cols-[1.5rem_1fr_auto] sm:gap-4">
                  <input
                    type="radio"
                    name="web-package"
                    value={item.id}
                    checked={selected}
                    onChange={() => setSelectedPackageId(item.id)}
                    className="mt-1 h-4 w-4 accent-cyan-400"
                  />
                  <span>
                    <span className={`block font-semibold ${selected ? 'text-primary' : 'text-white'}`}>{item.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-white/60">{item.description}</span>
                    {item.details && (
                      <span className="mt-2 block text-xs leading-5 text-white/45">{item.details.join(' · ')}</span>
                    )}
                  </span>
                  <span className="font-semibold text-primary sm:text-right">{priceLabel(item)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-12">
          <legend className="text-2xl font-bold">2. Doplňkové služby</legend>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Doplňky lze přidat k novému projektu i objednat samostatně pro existující web.
          </p>

          <div className="mt-7 space-y-9">
            {ADDON_GROUPS.map((group) => {
              const items = WEB_ADDONS.filter((item) => item.group === group);
              return (
                <section key={group} aria-labelledby={`addon-${group.replaceAll(' ', '-').toLowerCase()}`}>
                  <h3 id={`addon-${group.replaceAll(' ', '-').toLowerCase()}`} className="text-lg font-semibold text-white">{group}</h3>
                  <div className="mt-3 border-b border-white/10">
                    {items.map((item) => {
                      const selected = selectedAddonIds.includes(item.id);
                      return (
                        <label key={item.id} className="grid cursor-pointer gap-2 border-t border-white/10 py-5 sm:grid-cols-[1.5rem_1fr_auto] sm:gap-4">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleAddon(item.id)}
                            className="mt-1 h-4 w-4 accent-cyan-400"
                          />
                          <span>
                            <span className={`block font-semibold ${selected ? 'text-primary' : 'text-white'}`}>{item.name}</span>
                            <span className="mt-1 block text-sm leading-6 text-white/60">{item.description}</span>
                            {item.details && (
                              <span className="mt-2 block text-xs leading-5 text-white/45">{item.details.join(' · ')}</span>
                            )}
                          </span>
                          <span className="font-semibold text-primary sm:text-right">{priceLabel(item)}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </fieldset>
      </div>

      <aside className="border-t border-white/10 pt-7 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Souhrn kalkulace">
        <h2 className="text-xl font-bold">Orientační kalkulace</h2>

        {selectedItems.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-white/60">Zatím není nic vybráno.</p>
        ) : (
          <ul className="mt-4 space-y-3 text-sm">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex gap-3 justify-between">
                <span className="text-white/70">{item.name}</span>
                <span className="shrink-0 text-white/90">{priceLabel(item)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 border-t border-white/10 pt-5">
          {totals['one-time'] > 0 && (
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-white/60">Jednorázově</span>
              <strong className="text-xl text-primary">od {formatCurrency(totals['one-time'])}</strong>
            </div>
          )}
          {totals.monthly > 0 && (
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <span className="text-sm text-white/60">Měsíčně</span>
              <strong className="text-lg text-primary">od {formatCurrency(totals.monthly)}</strong>
            </div>
          )}
          {totals.yearly > 0 && (
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <span className="text-sm text-white/60">Ročně</span>
              <strong className="text-lg text-primary">od {formatCurrency(totals.yearly)}</strong>
            </div>
          )}
          {selectedItems.length === 0 && <strong className="text-xl text-white/40">—</strong>}
        </div>

        <p className="mt-5 text-xs leading-5 text-white/45">
          Jde o orientační minimální cenu. Finální nabídka závisí na konkrétním zadání a stavu existujícího projektu. Hodinová sazba pro práce mimo domluvený rozsah je {WEB_PRICING_HOURLY_RATE} Kč/h.
        </p>

        <a href={mailtoHref} className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">
          Poslat poptávku
        </a>
        {selectedItems.length > 0 && (
          <button type="button" onClick={clearSelection} className="mt-4 block text-sm text-white/50 hover:text-white">
            Vymazat výběr
          </button>
        )}
      </aside>
    </div>
  );
}
