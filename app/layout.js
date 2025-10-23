import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) - Google Ads ID AW-17674804846 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17674804846"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'AW-17674804846');
        `,
          }}
        />
        <meta property="og:title" content="Evde Uyku Testi" />
        <meta
          property="og:description"
          content="Evde uyku testi hizmeti ile sağlığınızı kontrol edin."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
