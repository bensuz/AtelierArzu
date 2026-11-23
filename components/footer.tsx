import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
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
  const helpLinks = [
    ...footerHelp,
    ...policies.map(({ slug, title }) => ({ href: `/bilgiler/${slug}`, label: title })),
    ...(siteConfig.sellerName && siteConfig.sellerAddress
      ? [{ href: "/iletisim#satici-bilgileri", label: "Satıcı Bilgileri" }]
      : [])
  ];

  return (
    <footer className="border-t border-olive/20 bg-olive text-shell">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:px-8">
        <div className="min-w-0">
          <Link href="/" className="-ml-2 inline-flex rounded-sm" aria-label={`${siteConfig.name} ana sayfa`}>
            <Image
              src="/images/arzudan-logo.png"
              alt=""
              width={979}
              height={627}
              sizes="152px"
              className="h-auto w-[152px] brightness-0 invert"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-shell/72">
            {siteConfig.description}
          </p>
        </div>
        {[
          { title: "Siteyi keşfedin", links: footerPages },
          { title: "Sipariş ve bakım", links: helpLinks }
        ].map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-shell/60">{title}</h2>
            <ul className="mt-4 grid gap-3 text-sm text-shell/76">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="min-w-0">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-shell/60">Bize ulaşın</h2>
          <ul className="mt-4 grid gap-3 text-sm text-shell/76">
            {whatsapp && (
              <li>
                <a className="footer-link inline-flex items-center gap-2" href={whatsapp}>
                  <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a className="footer-link inline-flex items-center gap-2" href={`mailto:${siteConfig.email}`}>
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="break-all">{siteConfig.email}</span>
              </a>
            </li>
            {instagramUrl && (
              <li>
                <a className="footer-link inline-flex items-center gap-2" href={instagramUrl}>
                  <Instagram aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="break-all">@{siteConfig.instagramHandle}</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="bg-[#414b36] px-4 py-4 text-center text-sm text-shell/90">
        © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
