import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { getPublishedPolicies } from "@/lib/sanity";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/site";

const footerPages = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Atölye Notları" },
  { href: "/iletisim", label: "İletişim" }
];

const footerHelp = [
  { href: "/siparis-rehberi", label: "Nasıl Sipariş Verilir?" },
  { href: "/sik-sorulan-sorular", label: "Sık Sorulan Sorular" },
  { href: "/canta-olcu-rehberi", label: "Çanta Ölçü Rehberi" },
  { href: "/malzemeler-ve-bakim", label: "Malzemeler ve Bakım" }
];

export async function Footer() {
  const whatsapp = whatsappUrl();
  const policies = await getPublishedPolicies().catch((error: unknown) => {
    console.error("Could not load published policy links", error);
    return [];
  });
  const legalLinks = [
    ...policies.map(({ slug, title }) => ({ href: `/bilgiler/${slug}`, label: title })),
    ...(siteConfig.sellerName && siteConfig.sellerAddress
      ? [{ href: "/iletisim#satici-bilgileri", label: "Satıcı Bilgileri" }]
      : [])
  ];

  return (
    <footer className="bg-olive text-ivory">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div className="min-w-0 max-w-sm">
            <Link href="/" className="-ml-1 inline-flex rounded-sm" aria-label={`${siteConfig.name} ana sayfa`}>
              <Image
                src="/images/arzudan-logo.png"
                alt=""
                width={979}
                height={627}
                sizes="140px"
                className="h-auto w-[140px] brightness-0 invert"
              />
            </Link>
            <p className="mt-5 font-serif text-2xl leading-snug text-ivory">
              Her çantayı kendi ellerimle, tek tek örüyorum.
            </p>
          </div>

          {[
            { title: "Keşfet", links: footerPages },
            { title: "Sipariş ve bakım", links: footerHelp }
          ].map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-ivory/55">{title}</h2>
              <ul className="mt-5 grid gap-3 text-sm text-ivory/80">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-ivory/55">Bana ulaşın</h2>
            <ul className="mt-5 grid gap-3 text-sm text-ivory/80">
              {whatsapp && (
                <li>
                  <a className="footer-link inline-flex items-center gap-2" href={whatsapp}>
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    WhatsApp
                  </a>
                </li>
              )}
              {instagramUrl && (
                <li>
                  <a className="footer-link inline-flex items-center gap-2" href={instagramUrl} rel="me noopener" target="_blank">
                    <Instagram aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="break-all">@{siteConfig.instagramHandle}</span>
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a className="footer-link inline-flex items-center gap-2" href={`mailto:${siteConfig.email}`}>
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="break-all">{siteConfig.email}</span>
                  </a>
                </li>
              )}
              {!whatsapp && !siteConfig.email && (
                <li>
                  <Link href="/iletisim" className="footer-link">İletişim sayfası</Link>
                </li>
              )}
            </ul>
            <p className="mt-6 text-xs leading-5 text-ivory/55">
              Sipariş WhatsApp üzerinden alınır. Toplam tutar ve teslimat süresi onaydan önce yazılı olarak paylaşılır.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.</p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
