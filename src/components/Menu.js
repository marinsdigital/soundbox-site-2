'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronLeft, IconLogout } from '@tabler/icons-react';

export default function Menu() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/"
        className={`text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors ${pathname === '/' ? 'hidden' : ''}`}
        aria-hidden={pathname === '/'}
      >
        Todos os produtos
      </Link>
      <a
        href="https://soundboxbrasil.com.br"
        className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-900 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors"
        aria-label="Sair do catálogo e voltar ao site principal"
      >
        <IconChevronLeft className="w-5 h-5" />
        Sair do catálogo
      </a>
    </nav>
  );
}
