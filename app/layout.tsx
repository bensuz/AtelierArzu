import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | El Yapımı Kroşe Çantalar`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: { url: "/images/arzudan-monogram.png", type: "image/png" }
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteConfig.name} | El Yapımı Kroşe Çantalar`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/atelier-hero.png",
        width: 1536,
        height: 1024,
        alt: "Kroşe çantalar ve iplikler"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
