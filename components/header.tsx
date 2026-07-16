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
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-baseline gap-3 rounded-sm">
          <span className="font-serif text-2xl font-semibold tracking-normal text-ink">
            {siteConfig.name}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-olive sm:inline">
            handmade crochet
          </span>
        </Link>
        <nav aria-label="Ana menü" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-sm text-sm font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
                className="focus-ring block rounded-md px-3 py-2 text-sm font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
