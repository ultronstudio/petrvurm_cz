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

  const selectClass = 'mt-1 block w-full rounded-md border border-white/20 bg-[#111113] px-3 py-2 text-white focus-visible:outline-primary';

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">
        Téma lekce
        <select className={selectClass} value={selectedTopicId ?? ''} onChange={(event) => setSelectedTopicId(event.target.value)}>
          <option value="">Vyberte téma</option>
          {TEACHING_TOPICS.map((topic) => (
            <option key={topic.id} value={topic.id}>{topic.name} · {formatCurrency(topic.price)}</option>
          ))}
        </select>
      </label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="text-sm font-medium">
          Forma výuky
          <select className={selectClass} value={mode} onChange={(event) => setMode(event.target.value === 'osobne' ? 'osobne' : 'online')}>
            <option value="online">Online</option>
            <option value="osobne">Osobně po domluvě</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Počet lekcí
          <select className={selectClass} value={lessonCount} onChange={(event) => setLessonCount(Number(event.target.value))}>
            {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
          </select>
        </label>
      </div>
      {mode === 'osobne' && <p className="mt-2 text-sm text-white/70">Případnou dopravu domluvíme zvlášť.</p>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <output className="text-sm text-white/80">{selectedTopic ? `Celkem přibližně ${formatCurrency(total)}` : 'Pro výpočet ceny vyberte téma.'}</output>
        <a href={mailtoHref} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black hover:bg-primary/90">Poptat doučování</a>
      </div>
    </div>
  );
}
