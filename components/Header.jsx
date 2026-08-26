"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleMobileNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background dark:bg-card backdrop-blur-sm shadow-md z-50">
      {/* Üst Ana Header Alanı */}
      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        <Link href="/" onClick={handleMobileNavClick}>
          <div className="flex items-center">
            <Image src="/logo.png" alt="Site logosu" width={200} height={160} priority />
          </div>
        </Link>

        {/* Masaüstü Navigasyon ve Öne Çıkarılmış Telefon Butonu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="link">
            Ana Sayfa
          </Link>
          <Link href="/uyku-apnesi-testi" className="link">
            Uyku Testi
          </Link>
          <Link href="/hakkimizda" className="link">
            Hakkımızda
          </Link>
          <Link href="/iletisim" className="link">
            İletişim
          </Link>

          {/* Vurgulu Masaüstü Telefon CTA Butonu */}
          <a
            href="tel:+905323553622"
            className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-200"
          >
            <Phone size={16} className="fill-current" />
            <span>0532 355 36 22</span>
          </a>

          <ThemeSwitcher />
        </nav>

        {/* Mobil Sağ Kısım */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md bg-background dark:bg-card text-copy-primary dark:text-copy-secondary hover:bg-accent/70 dark:hover:bg-cta-active/70 transition-colors"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBİL ALT BANT - Sürekli görünür arama şeridi */}
      <div className="md:hidden bg-blue-600 text-white py-2 px-5">
        <a
          href="tel:+905323553622"
          className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
        >
          <Phone size={15} className="fill-current" />
          <span>Hemen Ara: 0532 355 36 22</span>
        </a>
      </div>

      {/* Mobil Açılır Menü */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="card flex flex-col gap-2 px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" onClick={handleMobileNavClick} className="link py-2 block">
            Ana Sayfa
          </Link>
          <Link href="/uyku-apnesi-testi" onClick={handleMobileNavClick} className="link py-2 block">
            Uyku Testi
          </Link>
          <Link href="/hakkimizda" onClick={handleMobileNavClick} className="link py-2 block">
            Hakkımızda
          </Link>
          <Link href="/iletisim" onClick={handleMobileNavClick} className="link py-2 block">
            İletişim
          </Link>
        </div>
      </div>
    </header>
  );
}
