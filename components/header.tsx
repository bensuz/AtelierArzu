import Image from "next/image";
import Link from "next/link";
import { HeaderChrome } from "@/components/header-chrome";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks, type NavItem } from "@/components/nav-links";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/site";

const navItems: NavItem[] = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Atölye Notları" },
  { href: "/siparis-rehberi", label: "Sipariş Rehberi" },
  { href: "/iletisim", label: "İletişim" }
];

const mobileExtras: NavItem[] = [
  { href: "/malzemeler-ve-bakim", label: "Malzemeler ve Bakım" },
  { href: "/sik-sorulan-sorular", label: "Sık Sorulan Sorular" },
  { href: "/canta-olcu-rehberi", label: "Çanta Ölçü Rehberi" }
];

export function Header() {
  const whatsapp = whatsappUrl("Merhaba, kroşe çantalarınız hakkında bilgi almak istiyorum.");

  return (
    <header className="site-header fixed inset-x-0 top-0 z-[60]">
      <HeaderChrome />
      <div className="mx-auto flex h-[var(--site-header-height)] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring shrink-0 rounded-sm" aria-label={`${siteConfig.name} ana sayfa`}>
          <Image
            src="/images/arzudan-logo.png"
            alt={siteConfig.name}
            width={979}
            height={627}
            sizes="(min-width: 768px) 132px, 104px"
            className="header-logo h-auto w-[104px] md:w-[132px]"
            priority
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden md:block">
          <NavLinks
            items={navItems}
            className="flex items-center gap-7 lg:gap-9"
            linkClassName="nav-link focus-ring rounded-sm text-[1.0625rem] font-medium text-charcoal/85 hover:text-charcoal aria-[current=page]:text-burgundy"
          />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {whatsapp ? (
            <a href={whatsapp} className="header-cta btn-primary hidden md:inline-flex">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          ) : (
            <Link href="/iletisim" className="header-cta btn-primary hidden md:inline-flex">
              Bize yazın
            </Link>
          )}

          <MobileMenu
            items={navItems}
            extras={mobileExtras}
            whatsappHref={whatsapp}
            instagramHref={instagramUrl}
            instagramHandle={siteConfig.instagramHandle}
          />
        </div>
      </div>
    </header>
  );
}
