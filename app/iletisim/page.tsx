import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "İletişim",
  description:
    "Arzu’dan ile WhatsApp, Instagram veya e-posta üzerinden iletişime geçin. Kroşe çanta siparişi ve ürün bilgisi alın.",
  path: "/iletisim"
});

export default function ContactPage() {
  const whatsapp = whatsappUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          as="h1"
          eyebrow="İletişim"
          title="Bize ulaşın"
          description="Model, renk veya siparişle ilgili sorularınız için bize yazın. İlgilendiğiniz ürünün bağlantısını paylaşırsanız fiyat ve teslimat bilgilerini iletebiliriz."
        />
        <div className="rounded-lg border border-ink/10 bg-linen p-7">
          <WhatsAppButton message="Merhaba, kroşe çanta siparişi hakkında bilgi almak istiyorum." />
          <div className="mt-8 grid gap-4 text-sm text-ink/70">
            {whatsapp && (
              <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={whatsapp}>
                <MessageCircle aria-hidden="true" className="h-5 w-5 text-olive" />
                WhatsApp: +{siteConfig.phone}
              </a>
            )}
            {instagramUrl && (
              <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={instagramUrl}>
                <Instagram aria-hidden="true" className="h-5 w-5 text-olive" />
                Instagram · @{siteConfig.instagramHandle}
              </a>
            )}
            <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" className="h-5 w-5 text-olive" />
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-3 rounded-md bg-shell p-4">
              <MapPin aria-hidden="true" className="h-5 w-5 text-olive" />
              {siteConfig.city} merkezli, Türkiye geneli gönderim
            </div>
          </div>
        </div>
      </div>
      {siteConfig.sellerName && siteConfig.sellerAddress && (
        <section id="satici-bilgileri" className="mt-16 scroll-mt-28">
          <h2 className="font-serif text-4xl font-semibold">Satıcı bilgileri</h2>
          <dl className="mt-6 space-y-4 rounded-lg border border-ink/10 bg-linen p-6">
            <div>
              <dt className="text-sm font-semibold">Ticaret unvanı</dt>
              <dd className="mt-1 text-ink/70">{siteConfig.sellerName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">İş adresi</dt>
              <dd className="mt-1 text-ink/70">{siteConfig.sellerAddress}</dd>
            </div>
            {siteConfig.sellerKep && (
              <div>
                <dt className="text-sm font-semibold">KEP adresi</dt>
                <dd className="mt-1 text-ink/70">{siteConfig.sellerKep}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
      <div className="mt-10 flex flex-wrap gap-5">
        <Link href="/siparis-rehberi" className="focus-ring rounded-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
          Nasıl sipariş verilir?
        </Link>
        <Link href="/sik-sorulan-sorular" className="focus-ring rounded-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
          Sık sorulan sorular
        </Link>
      </div>
    </div>
  );
}
