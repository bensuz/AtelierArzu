import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-olive/20 bg-olive text-shell">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-shell/72">
            Elde örülen, sınırlı sayıda üretilen ve günlük hayata sıcak bir
            dokunuş ekleyen kroşe çantalar.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shell/60">
            Sayfalar
          </p>
          <div className="mt-4 grid gap-2 text-sm text-shell/76">
            <Link href="/urunler" className="hover:text-shell">
              Ürünler
            </Link>
            <Link href="/hakkimizda" className="hover:text-shell">
              Hakkımızda
            </Link>
            <Link href="/blog" className="hover:text-shell">
              Blog
            </Link>
            <Link href="/iletisim" className="hover:text-shell">
              İletişim
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shell/60">
            İletişim
          </p>
          <div className="mt-4 grid gap-3 text-sm text-shell/76">
            <a className="inline-flex items-center gap-2 hover:text-shell" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-shell" href={siteConfig.instagram}>
              <Instagram aria-hidden="true" className="h-4 w-4" />
              Instagram
            </a>
            <a className="inline-flex items-center gap-2 hover:text-shell" href={`https://wa.me/${siteConfig.phone}`}>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-shell/10 px-4 py-5 text-center text-xs text-shell/52">
        © {new Date().getFullYear()} Atelier Arzu. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
