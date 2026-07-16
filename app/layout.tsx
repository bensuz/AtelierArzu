import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Atelier Arzu | El Yapımı Kroşe Çantalar",
    template: "%s | Atelier Arzu"
  },
  description:
    "Atelier Arzu, Türkiye'de elde örülen kroşe çantalar tasarlayan sıcak, zarif ve ulaşılabilir bir atölyedir.",
  applicationName: "Atelier Arzu",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Atelier Arzu | El Yapımı Kroşe Çantalar",
    description:
      "Sınırlı sayıda üretilen, pamuk ipliklerle örülen kroşe çantalar.",
    url: siteConfig.url,
    siteName: "Atelier Arzu",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/atelier-hero.png",
        width: 1536,
        height: 1024,
        alt: "Atelier Arzu kroşe çanta atölyesi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Arzu",
    description: "El yapımı kroşe çantalar ve atölye hikayeleri.",
    images: ["/images/atelier-hero.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
