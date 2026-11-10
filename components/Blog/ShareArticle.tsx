'use client';

import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Check, Copy, Mail, Share2, X } from 'lucide-react';
import BrandIcon, { type BrandName } from '@/components/Blog/BrandIcon';

type ShareArticleProps = { title: string; url: string };
type ShareDialogProps = ShareArticleProps & {
  dialogRef: RefObject<HTMLDialogElement | null>;
  close: () => void;
  onClosed: () => void;
};

const socialNetworks: { name: string; icon: BrandName; link: (title: string, url: string) => string }[] = [
  { name: 'Facebook', icon: 'facebook', link: (_, url) => 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) },
  { name: 'LinkedIn', icon: 'linkedin', link: (_, url) => 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url) },
  { name: 'X (Twitter)', icon: 'x', link: (title, url) => 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url) },
  { name: 'Bluesky', icon: 'bluesky', link: (title, url) => 'https://bsky.app/intent/compose?text=' + encodeURIComponent(title + '\n' + url) },
  { name: 'WhatsApp', icon: 'whatsapp', link: (title, url) => 'https://api.whatsapp.com/send?text=' + encodeURIComponent(title + '\n' + url) },
  { name: 'Telegram', icon: 'telegram', link: (title, url) => 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title) },
  { name: 'Reddit', icon: 'reddit', link: (title, url) => 'https://www.reddit.com/submit?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) },
];

const networkClass = 'inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';

function ShareNetworks({ title, url }: ShareArticleProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2">
      {socialNetworks.map((network) => (
        <a key={network.name} href={network.link(title, url)} target="_blank" rel="noopener noreferrer" className={networkClass}>
          <BrandIcon name={network.icon} />
          <span>{network.name}</span>
        </a>
      ))}
      <a href={'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(title + '\n\n' + url)} className={networkClass}>
        <Mail size={16} aria-hidden="true" />
        E-mail
      </a>
    </div>
  );
}

function ShareCopy({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setFailed(false);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <label htmlFor="article-share-url" className="mb-2 block text-sm text-white/70">Odkaz na článek</label>
      <div className="flex gap-2">
        <input id="article-share-url" type="text" readOnly value={url}
          onFocus={(event) => event.currentTarget.select()}
          className="min-w-0 flex-1 rounded-md border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/80 outline-none focus-visible:border-primary" />
        <button type="button" onClick={copy}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? 'Zkopírováno' : 'Kopírovat'}
        </button>
      </div>
      {failed && <p role="status" className="mt-2 text-sm text-red-300">Kopírování se nezdařilo. Odkaz můžete označit a zkopírovat ručně.</p>}
      {copied && <p role="status" className="mt-2 text-sm text-white/60">Odkaz je ve schránce.</p>}
    </div>
  );
}

function ShareDialog({ title, url, dialogRef, close, onClosed }: ShareDialogProps) {
  return (
    <dialog ref={dialogRef} aria-labelledby="article-share-title" onClose={onClosed}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      className="w-[calc(100%-2rem)] max-w-lg rounded-lg border border-white/20 bg-[#19191c] p-0 text-white shadow-2xl backdrop:bg-black/75">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="article-share-title" className="text-xl font-semibold">Sdílet článek</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">{title}</p>
          </div>
          <button type="button" onClick={close} aria-label="Zavřít sdílení"
            className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <ShareNetworks title={title} url={url} />
        <ShareCopy url={url} />
      </div>
    </dialog>
  );
}

export default function ShareArticle({ title, url }: ShareArticleProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef} type="button" aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <Share2 size={17} aria-hidden="true" />
        Sdílet
      </button>
      <ShareDialog title={title} url={url} dialogRef={dialogRef}
        close={() => dialogRef.current?.close()}
        onClosed={() => triggerRef.current?.focus()} />
    </>
  );
}
