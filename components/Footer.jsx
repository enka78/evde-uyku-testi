"use client";
export default function Footer() {
  return (
    <footer className="bg-background dark:bg-card text-copy-secondary dark:text-copy-primary py-8 mt-16 border-t border-border dark:border-cta-active">
      <div className="container mx-auto text-center">
        <p className="mt-2 text-colorSecond-light dark:text-colorSecond-dark opacity-70 text-sm">
          Uyku sağlığınız bizim önceliğimizdir.
        </p>
        <p className="mt-2 text-black dark:text-white text-xl!">
          Zeytinlik Mahallesi Yakut Sokak Üstün Pasajı Kat-3 Bakırköy / İstanbul
        </p>
        <p className="text-xs! text-colorFirst-light dark:text-colorFirst-dark mt-2!">
          © {new Date().getFullYear()} Uyku Bilimleri Merkezi. Tüm hakları
          saklıdır. Uyku Bilimleri Merkezi Bir{" "}
          <a
            href="https://www.ubider.org/"
            target="_blank"
            className="underline text-blue-500"
          >
            UBİDER - Uyku Bilimleri Derneği
          </a>
            Kuruluşudur
        </p>
      </div>
    </footer>
  );
}
