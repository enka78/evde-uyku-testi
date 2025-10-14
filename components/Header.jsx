"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close mobile menu after navigation
  const handleMobileNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background dark:bg-card backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        <Link href="/" onClick={handleMobileNavClick}>
          <div className="flex items-center">
            <Image src="/logo.png" alt="Site logosu" width={200} height={160} />
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
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
          <ThemeSwitcher />
        </nav>

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

      {/* Mobile menu - using different approach to avoid crashes */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="card flex flex-col gap-4 px-5 py-4">
          <Link
            href="/"
            onClick={handleMobileNavClick}
            className="link py-2 block"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/uyku-apnesi-testi"
            onClick={handleMobileNavClick}
            className="link py-2 block"
          >
            Uyku Testi
          </Link>
          <Link
            href="/hakkimizda"
            onClick={handleMobileNavClick}
            className="link py-2 block"
          >
            Hakkımızda
          </Link>
          <Link
            href="/iletisim"
            onClick={handleMobileNavClick}
            className="link py-2 block"
          >
            İletişim
          </Link>
        </div>
      </div>
    </header>
  );
}
