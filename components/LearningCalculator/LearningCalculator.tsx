'use client';

import { useMemo, useState } from 'react';
import { TEACHING_TOPICS } from '@/lib/teaching';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
  }).format(value);
}

type LessonMode = 'online' | 'osobne';

export default function LearningCalculator() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [lessonCount, setLessonCount] = useState(1);
  const [mode, setMode] = useState<LessonMode>('online');

  const selectedTopic = useMemo(
    () => TEACHING_TOPICS.find((topic) => topic.id === selectedTopicId) ?? null,
    [selectedTopicId],
  );

  const total = selectedTopic ? selectedTopic.price * lessonCount : 0;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Poptávka výuky programování');

    if (!selectedTopic) {
      return `mailto:kontakt@petrvurm.cz?subject=${subject}`;
    }

    const modeLabel = mode === 'online' ? 'online' : 'osobně po domluvě';
    const body = encodeURIComponent(
      `Dobrý den,\n\nmám zájem o individuální výuku:\n\n- Téma: ${selectedTopic.name}\n- Počet lekcí: ${lessonCount}\n- Délka lekce: 60 minut\n- Forma: ${modeLabel}\n- Orientační cena: ${formatCurrency(total)}\n\nProsím o domluvu termínu a upřesnění tématu.\n`,
    );

    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  }, [lessonCount, mode, selectedTopic, total]);

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
      <div>
        <fieldset>
          <legend className="text-2xl font-bold">1. Téma výuky</legend>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Vyberte nejbližší oblast. Konkrétní obsah lekce se vždy přizpůsobí tomu, co potřebujete procvičit nebo vyřešit.
          </p>

          <div className="mt-6 border-b border-white/10">
            {TEACHING_TOPICS.map((topic) => {
              const selected = selectedTopicId === topic.id;
              return (
                <label key={topic.id} className="grid cursor-pointer gap-2 border-t border-white/10 py-5 sm:grid-cols-[1.5rem_1fr_auto] sm:gap-4">
                  <input
                    type="radio"
                    name="teaching-topic"
                    value={topic.id}
                    checked={selected}
                    onChange={() => setSelectedTopicId(topic.id)}
                    className="mt-1 h-4 w-4 accent-cyan-400"
                  />
                  <span>
                    <span className={`block font-semibold ${selected ? 'text-primary' : 'text-white'}`}>{topic.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-white/60">{topic.description}</span>
                    <span className="mt-2 block text-xs leading-5 text-white/50">{topic.details.join(' · ')}</span>
                  </span>
                  <span className="font-semibold text-primary sm:text-right">{formatCurrency(topic.price)} / 60 min</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-12">
          <legend className="text-2xl font-bold">2. Forma a rozsah</legend>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Online výuka je nejjednodušší na domluvu. Osobní setkání je možné podle místa a termínu; případná doprava není v kalkulaci zahrnuta.
          </p>

          <div className="mt-6 border-y border-white/10 py-5">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <span className="block text-sm font-semibold text-white">Forma</span>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="lesson-mode"
                      checked={mode === 'online'}
                      onChange={() => setMode('online')}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    Online
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="lesson-mode"
                      checked={mode === 'osobne'}
                      onChange={() => setMode('osobne')}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    Osobně po domluvě
                  </label>
                </div>
              </div>

              <label className="block">
                <span className="block text-sm font-semibold text-white">Počet 60minutových lekcí</span>
                <select
                  value={lessonCount}
                  onChange={(event) => setLessonCount(Number(event.target.value))}
                  className="mt-3 w-full rounded-lg border border-white/15 bg-[#111113] px-3 py-2 text-sm text-white outline-none focus:border-primary"
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </fieldset>

        <p className="mt-5 text-sm leading-6 text-white/50">
          Potřebujete jiné téma nebo delší spolupráci? Napište rovnou s krátkým popisem problému. Automatické množstevní slevy nepoužívám; cena odpovídá skutečnému času výuky.
        </p>
      </div>

      <aside className="border-t border-white/10 pt-7 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Souhrn výuky">
        <h2 className="text-xl font-bold">Orientační kalkulace</h2>

        {selectedTopic ? (
          <>
            <p className="mt-4 font-semibold text-white">{selectedTopic.name}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Sazba</dt>
                <dd className="text-white/90">{formatCurrency(selectedTopic.price)} / 60 min</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Lekcí</dt>
                <dd className="text-white/90">{lessonCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Forma</dt>
                <dd className="text-right text-white/90">{mode === 'online' ? 'Online' : 'Osobně'}</dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-white/60">Celkem</span>
                <strong className="text-xl text-primary">{formatCurrency(total)}</strong>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm leading-6 text-white/60">Vyberte téma a zobrazí se orientační cena.</p>
        )}

        <p className="mt-5 text-xs leading-5 text-white/50">
          Kalkulace je orientační. Před lekcí si upřesníme cíl, úroveň a materiály, aby byl čas využitý smysluplně.
        </p>

        <a href={mailtoHref} className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">
          Poptat výuku
        </a>
      </aside>
    </div>
  );
}
