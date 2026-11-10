'use client';

import { useRef, useState } from 'react';
import { Check, Copy, Mail, Share2, X } from 'lucide-react';
import BrandIcon from '@/components/Blog/BrandIcon';

type ShareArticleProps = {
  title: string;
  url: string;
};

export default function ShareArticle({ title, url }: ShareArticleProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const networks = [
    { name: 'Facebook', icon: 'facebook' as const, href: 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl },
    { name: 'LinkedIn', icon: 'linkedin' as const, href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl },
    { name: 'X (Twitter)', icon: 'x' as const, href: 'https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl },
    { name: 'Bluesky', icon: 'bluesky' as const, href: 'https://bsky.app/intent/compose?text=' + encodeURIComponent(title + '\n' + url) },
    { name: 'WhatsApp', icon: 'whatsapp' as const, href: 'https://api.whatsapp.com/send?text=' + encodeURIComponent(title + '\n' + url) },
    { name: 'Telegram', icon: 'telegram' as const, href: 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle },
    { name: 'Reddit', icon: 'reddit' as const, href: 'https://www.reddit.com/submit?url=' + encodedUrl + '&title=' + encodedTitle },
  ];

  function openDialog() {
    setCopied(false);
    setCopyFailed(false);
    dialog.current?.showModal();
  }

  function closeDialog() {
    dialog.current?.close();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Share2 size={17} aria-hidden="true" />
        Sdílet
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="article-share-title"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="w-[calc(100%-2rem)] max-w-lg rounded-lg border border-white/20 bg-[#19191c] p-0 text-white shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="article-share-title" className="text-xl font-semibold">Sdílet článek</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{title}</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Zavřít sdílení"
              className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {networks.map((network) => (
              <a
                key={network.name}
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <BrandIcon name={network.icon} />
                <span>{network.name}</span>
              </a>
            ))}
            <a
              href={'mailto:?subject=' + encodedTitle + '&body=' + encodeURIComponent(title + '\n\n' + url)}
              className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Mail size={16} aria-hidden="true" />
              E-mail
            </a>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <label htmlFor="article-share-url" className="mb-2 block text-sm text-white/70">
              Odkaz na článek
            </label>
            <div className="flex gap-2">
              <input
                id="article-share-url"
                type="text"
                readOnly
                value={url}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/80 outline-none focus-visible:border-primary"
              />
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copied ? 'Zkopírováno' : 'Kopírovat'}
              </button>
            </div>
            {copyFailed && <p role="status" className="mt-2 text-sm text-red-300">Kopírování se nezdařilo. Odkaz můžete označit a zkopírovat ručně.</p>}
            {copied && <p role="status" className="mt-2 text-sm text-white/60">Odkaz je ve schránce.</p>}
          </div>
        </div>
      </dialog>
    </>
  );
}
