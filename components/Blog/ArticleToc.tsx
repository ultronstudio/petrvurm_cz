import type { BlogTocItem } from '@/lib/blog-headings';

export default function ArticleToc({ items, showTitle = true }: {
  items: BlogTocItem[];
  showTitle?: boolean;
}) {
  if (!items.length) return null;
  return (
    <nav aria-label="Obsah článku" className="text-sm">
      {showTitle && <h2 className="mb-5 text-base font-semibold text-white">Obsah článku</h2>}
      <ol className="space-y-1 border-l border-white/15">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={'#' + item.id}
              className={[
                'block border-l-2 border-transparent py-2 pr-3 leading-5 text-white/65 transition-colors hover:border-primary hover:text-white focus-visible:border-primary focus-visible:text-white focus-visible:outline-none',
                item.depth === 3 ? 'pl-7 text-xs' : 'pl-4',
              ].join(' ')}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
