import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Evde Uyku Testi",
  description: "Evde uyku testi hizmeti ile sağlığınızı kontrol edin.",
  keywords: ["uyku testi", "horlama", "uyku apnesi", "evde test"],
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />

        <meta property="og:title" content="Evde Uyku Testi" />
        <meta property="og:description" content="Evde uyku testi hizmeti ile sağlığınızı kontrol edin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:image" content="https://example.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}