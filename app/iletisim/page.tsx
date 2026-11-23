import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppButton, WhatsAppIcon } from "@/components/whatsapp-button";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "İletişim",
  description:
    "Arzu’dan ile WhatsApp veya Instagram üzerinden iletişime geçin. Kroşe çanta siparişi, renk ve ölçü soruları için bana yazın.",
  path: "/iletisim"
});

export default function ContactPage() {
  const whatsapp = whatsappUrl("Merhaba, kroşe çantalarınız hakkında bilgi almak istiyorum.");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/iletisim", label: "İletişim" }]} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="eyebrow">İletişim</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">Bana yazın</h1>
          <p className="mt-6 text-lg leading-8 text-charcoal/80">
            Model, renk veya siparişle ilgili sorularınız için en hızlı yol WhatsApp. İlgilendiğiniz ürünün bağlantısını paylaşırsanız fiyat ve teslimat bilgisini doğrudan iletebilirim.
          </p>
          <div className="mt-8">
            <WhatsAppButton message="Merhaba, kroşe çanta siparişi hakkında bilgi almak istiyorum." />
            {!siteConfig.phone && (
              <p className="mt-3 text-sm text-charcoal/60">WhatsApp numarası tanımlandığında bu buton etkinleşir. Şimdilik Instagram üzerinden ulaşabilirsiniz.</p>
            )}
          </div>
          <div className="mt-10 flex flex-wrap gap-5 text-sm">
            <Link href="/siparis-rehberi" className="text-link">Nasıl sipariş verilir?</Link>
            <Link href="/sik-sorulan-sorular" className="text-link">Sık sorulan sorular</Link>
          </div>
        </div>

        <ul className="grid gap-3 self-start sm:grid-cols-2">
          {whatsapp && (
            <li>
              <a className="focus-ring flex h-full flex-col gap-3 rounded-lg border border-charcoal/10 bg-ivory p-6 hover:border-burgundy/40" href={whatsapp}>
                <WhatsAppIcon className="h-6 w-6 text-burgundy" />
                <span className="font-serif text-2xl text-charcoal">WhatsApp</span>
                <span className="text-sm text-charcoal/65">+{siteConfig.phone}</span>
              </a>
            </li>
          )}
          {instagramUrl && (
            <li>
              <a className="focus-ring flex h-full flex-col gap-3 rounded-lg border border-charcoal/10 bg-ivory p-6 hover:border-burgundy/40" href={instagramUrl} target="_blank" rel="me noopener">
                <Instagram aria-hidden="true" className="h-6 w-6 text-burgundy" />
                <span className="font-serif text-2xl text-charcoal">Instagram</span>
                <span className="text-sm text-charcoal/65">@{siteConfig.instagramHandle}</span>
              </a>
            </li>
          )}
          {siteConfig.email && (
            <li>
              <a className="focus-ring flex h-full flex-col gap-3 rounded-lg border border-charcoal/10 bg-ivory p-6 hover:border-burgundy/40" href={`mailto:${siteConfig.email}`}>
                <Mail aria-hidden="true" className="h-6 w-6 text-burgundy" />
                <span className="font-serif text-2xl text-charcoal">E-posta</span>
                <span className="break-all text-sm text-charcoal/65">{siteConfig.email}</span>
              </a>
            </li>
          )}
          <li className="flex h-full flex-col gap-3 rounded-lg border border-charcoal/10 bg-cream p-6">
            <MapPin aria-hidden="true" className="h-6 w-6 text-burgundy" />
            <span className="font-serif text-2xl text-charcoal">Gönderim</span>
            <span className="text-sm text-charcoal/65">
              {siteConfig.city ? `${siteConfig.city}’dan ` : ""}Türkiye geneline kargo ile gönderim
            </span>
          </li>
        </ul>
      </div>

      {siteConfig.sellerName && siteConfig.sellerAddress && (
        <section id="satici-bilgileri" className="mt-20 scroll-mt-28 border-t border-charcoal/10 pt-10">
          <h2 className="font-serif text-4xl text-charcoal">Satıcı bilgileri</h2>
          <dl className="mt-6 grid gap-6 rounded-lg border border-charcoal/10 bg-cream p-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-semibold text-charcoal">Ticaret unvanı</dt>
              <dd className="mt-1 text-charcoal/70">{siteConfig.sellerName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-charcoal">İş adresi</dt>
              <dd className="mt-1 text-charcoal/70">{siteConfig.sellerAddress}</dd>
            </div>
            {siteConfig.sellerKep && (
              <div>
                <dt className="text-sm font-semibold text-charcoal">KEP adresi</dt>
                <dd className="mt-1 text-charcoal/70">{siteConfig.sellerKep}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
    </div>
  );
}
