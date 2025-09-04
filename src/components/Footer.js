'use client';
import { IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 py-12">
        <Link href="/">
            <Image 
                src="/images/logo.webp"
                alt="Soundbox" 
                width={60} 
                height={60} 
            />
        </Link>
        <div className="flex gap-6">
          <a 
            href="https://instagram.com/soundbox" 
            aria-label="Instagram" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <IconBrandInstagram size={24} />
          </a>
          <a 
            href="https://facebook.com/soundbox" 
            aria-label="Facebook" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <IconBrandFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
