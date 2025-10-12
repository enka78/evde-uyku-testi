"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Image src="/logo.png" alt="Site logosu" width={200} height={150} />

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link href="/uyku-apnesi-testi" className="text-foreground hover:text-primary transition-colors">Uyku Testi</Link>
          <Link href="/hakkimizda" className="text-foreground hover:text-primary transition-colors">Hakkımızda</Link>
          <Link href="/iletisim" className="text-foreground hover:text-primary transition-colors">İletişim</Link>
          <ThemeSwitcher />
        </nav>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeSwitcher />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-md bg-card-bg text-foreground">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/90 backdrop-blur-md p-4 space-y-2 border-b border-border">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 text-foreground hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/uyku-apnesi-testi" onClick={() => setOpen(false)} className="block py-2 text-foreground hover:text-primary transition-colors">
            Uyku Testi
          </Link>
          <Link href="/hakkimizda" onClick={() => setOpen(false)} className="block py-2 text-foreground hover:text-primary transition-colors">
            Hakkımızda
          </Link>
          <Link href="/iletisim" onClick={() => setOpen(false)} className="block py-2 text-foreground hover:text-primary transition-colors">
            İletişim
          </Link>
        </div>
      )}
    </header>
  );
}