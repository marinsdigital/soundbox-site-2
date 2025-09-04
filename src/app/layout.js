import "./globals.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Soundbox - Qualidade em Áudio Profissional",
  description: "Página de produtos da Soundbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 font-sans text-gray-800">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200">
                <Link href="/" className="flex items-center">
                <Image 
                    src="/images/logo.webp" 
                    alt="Soundbox Logo" 
                    width={80} 
                    height={45}
                    priority
                />
                </Link>
                <Menu />
            </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
