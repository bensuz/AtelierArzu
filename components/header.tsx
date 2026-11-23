import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/malzemeler-ve-bakim", label: "Malzemeler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-shell">
      <div className="mx-auto flex min-h-[var(--site-header-height)] max-w-7xl items-center justify-between gap-2 px-4 py-1 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring shrink-0 rounded-sm">
          <Image
            src="/images/arzudan-logo.png"
            alt={siteConfig.name}
            width={979}
            height={627}
            sizes="(min-width: 640px) 128px, 112px"
            className="h-auto w-28 sm:w-32"
            preload
          />
        </Link>
        <nav aria-label="Ana menü" className="hidden items-center gap-4 md:flex lg:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-sm text-base font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/iletisim"
            className="focus-ring hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-shell md:inline-flex"
          >
            WhatsApp
          </Link>
          <details className="relative md:hidden">
            <summary
              aria-label="Menüyü aç"
              className="focus-ring flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full bg-white"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </summary>
            <nav
              aria-label="Mobil menü"
              className="absolute right-0 mt-3 w-56 rounded-lg bg-white p-3 shadow-soft"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring block rounded-md px-3 py-2 text-base font-medium text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
