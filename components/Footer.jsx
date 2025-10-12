"use client";
export default function Footer() {
  return (
    <footer className="bg-card-bg text-foreground py-6 mt-16 border-t border-border">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Evde Uyku Testi. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}