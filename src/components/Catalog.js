'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

function deriveTagFromSlug(slug) {
  if (!slug || typeof slug !== 'string') return 'OUTROS';
  const first = slug.split('-')[0] || slug;
  return first.toUpperCase();
}

export default function Catalog({ products }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('TODOS');

  const tags = useMemo(() => {
    const set = new Set(['TODOS']);
    (products || []).forEach((p) => set.add(deriveTagFromSlug(p.slug)));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (products || [])
      .filter((p) => (activeTag === 'TODOS' ? true : deriveTagFromSlug(p.slug) === activeTag))
      .filter((p) => {
        if (!q) return true;
        const hay = `${p.title || ''} ${p.slug || ''}`.toLowerCase();
        return hay.includes(q);
      });
  }, [products, query, activeTag]);

  return (
    <div id="produtos">
      <div className="space-y-4 md:space-y-6">
        <div className="relative w-full md:max-w-lg">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm"
            aria-label="Buscar produtos"
          />
        </div>

        <div>
          <span className="sr-only" id="catalog-categories-label">Categorias do catálogo</span>
          <div
            className="flex gap-2 whitespace-nowrap overflow-x-auto no-scrollbar py-1"
            role="tablist"
            aria-labelledby="catalog-categories-label"
          >
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTag(tag)}
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/30 ${
                    isActive
                      ? 'bg-gradient-to-r from-gray-900 to-black text-white border-black shadow-[0_8px_20px_-8px_rgba(0,0,0,.4)]'
                      : 'bg-white/80 backdrop-blur border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-600 hover:shadow-sm'
                  } hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="mt-2 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 border border-dashed border-gray-300 rounded-2xl bg-white">
            <p className="text-gray-600">Nenhum produto encontrado.</p>
          </div>
        )}

        {filtered.map((product) => {
          const cover = product.bannerCover || '/products/PLACEHOLDER/placeholder.webp';
          const tag = deriveTagFromSlug(product.slug);
          return (
            <Link
              key={product.slug}
              href={`/${product.slug}`}
              className="group block rounded-2xl border border-gray-200 overflow-hidden bg-white hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-gray-50 to-gray-100">
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-black/80 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider">
                  {tag}
                </span>
                <Image
                  src={cover}
                  alt={product.title || product.slug}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 tracking-wide line-clamp-2">
                  {(product.title || product.slug).toUpperCase()}
                </h2>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">Ver detalhes</span>
                  <IconArrowRight className="w-5 h-5 text-gray-900 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


