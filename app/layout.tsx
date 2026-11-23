import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

const defaultTitle = `${siteConfig.name} | El Yapımı Kroşe Çantalar`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: { url: "/images/arzudan-monogram.png", type: "image/png" }
  },
  openGraph: {
    title: defaultTitle,
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
    title: defaultTitle,
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
    <html lang="tr" data-header="solid" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          // Sets the initial header state before hydration so the homepage hero never flashes a solid bar.
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.dataset.header=(location.pathname==="/"&&window.scrollY<40)?"transparent":"solid";'
          }}
        />
        <a
          href="#icerik"
          className="focus-ring sr-only rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          İçeriğe atla
        </a>
        <Header />
        <main id="icerik" className="pt-[var(--site-header-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
