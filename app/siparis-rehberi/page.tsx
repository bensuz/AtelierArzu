import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "WhatsApp’tan Kroşe Çanta Siparişi Nasıl Verilir?",
  description: "Arzu’dan el örgüsü çanta siparişinin adımları: modeli seçin, WhatsApp’tan yazın, kargo dahil toplam tutarı ve teslimat süresini onaydan önce öğrenin.",
  path: "/siparis-rehberi"
});

const steps = [
  {
    title: "Modeli seçin",
    text: "Ürün sayfasında çantanın ölçüsüne, askısına, rengine ve hazırlık süresine bakın. Farklı bir renk düşünüyorsanız ilk mesajınızda belirtin.",
    link: { href: "/urunler", label: "Koleksiyon" }
  },
  {
    title: "WhatsApp’tan sorun",
    text: "Modelin adını ya da sayfa bağlantısını gönderin. Ürün sayfasındaki buton, modelin adını içeren hazır bir mesaj açar."
  },
  {
    title: "Uygunluğu teyit edin",
    text: "Modelin ve istediğiniz rengin şu anda çalışılıp çalışılamayacağını, hazırlık süresini ve tahmini kargoya veriliş tarihini yazarım."
  },
  {
    title: "Toplam tutarı öğrenin",
    text: "Gönderim adresinize göre kargo ücretini hesaplar, kargo dahil ödeyeceğiniz toplam tutarı yazılı olarak paylaşırım."
  },
  {
    title: "Sipariş özetini okuyun",
    text: "Onay vermeden önce model, renk, toplam tutar, tahmini teslimat ve sipariş koşullarını içeren bir özet alırsınız. Özel üretimlerde cayma hakkı istisnası varsa burada belirtilir."
  },
  {
    title: "Onaylayın ve ödeyin",
    text: "Özeti onayladığınızda ödeme bilgilerini paylaşırım. Ödeme teyit edildiğinde çantanız hazırlanmaya başlar."
  },
  {
    title: "Kargoya veriliş",
    text: "Çanta hazır olduğunda kargoya verilir; takip bilgisini aynı görüşmeden iletirim. Kargo süresi hazırlık süresine dahil değildir."
  }
];

export default function OrderGuidePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "WhatsApp’tan kroşe çanta siparişi nasıl verilir?",
          description: metadata.description,
          step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.text,
            url: `${absoluteUrl("/siparis-rehberi")}#adim-${index + 1}`
          }))
        }}
      />
      <article className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/siparis-rehberi", label: "Sipariş rehberi" }]} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <header className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:h-fit">
            <p className="eyebrow">Sipariş rehberi</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">Nasıl sipariş verilir?</h1>
            <p className="mt-6 text-lg leading-8 text-charcoal/80">
              Sitede sepet ya da ödeme adımı yok. Siparişler WhatsApp üzerinden, birlikte konuşarak alınıyor; böylece renk, ölçü ve teslimat tarihi gibi ayrıntıları başta netleştirebiliyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.phone ? (
                <WhatsAppButton message="Merhaba, sipariş hakkında bilgi almak istiyorum." />
              ) : (
                <Link href="/iletisim" className="btn-primary">Bana ulaşın</Link>
              )}
              <Link href="/urunler" className="btn-secondary">Koleksiyonu incele</Link>
            </div>
            <dl className="mt-10 grid gap-4 border-t border-charcoal/10 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="font-semibold text-charcoal">Ne zaman ödeme yaparım?</dt>
                <dd className="mt-1 leading-6 text-charcoal/70">Yalnızca yazılı sipariş özetini onayladıktan sonra.</dd>
              </div>
              <div>
                <dt className="font-semibold text-charcoal">Kargo ücreti dahil mi?</dt>
                <dd className="mt-1 leading-6 text-charcoal/70">Toplam tutar, kargo dahil olarak onaydan önce paylaşılır.</dd>
              </div>
            </dl>
          </header>

          <ol className="relative border-l border-burgundy/20 pl-8 sm:pl-10">
            {steps.map((step, index) => (
              <li key={step.title} id={`adim-${index + 1}`} className="relative pb-10 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-burgundy/30 bg-ivory font-serif text-lg italic text-burgundy sm:-left-[3.1rem]">
                  {index + 1}
                </span>
                <h2 className="font-serif text-3xl leading-tight text-charcoal">{step.title}</h2>
                <p className="mt-3 max-w-xl text-base leading-8 text-charcoal/75">{step.text}</p>
                {step.link && (
                  <Link href={step.link.href} className="text-link mt-3 inline-block text-sm">{step.link.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </div>

        <section className="mt-20 grid gap-6 border-t border-charcoal/10 pt-10 sm:grid-cols-3">
          {[
            { href: "/sik-sorulan-sorular", title: "Sık sorulan sorular", text: "Renk, hazırlık süresi, kargo ve iade hakkında yanıtlar." },
            { href: "/canta-olcu-rehberi", title: "Çanta ölçü rehberi", text: "Ölçüleri kendi eşyalarınızla nasıl karşılaştıracağınız." },
            { href: "/malzemeler-ve-bakim", title: "Malzemeler ve bakım", text: "Hasır ip, aksesuarlar ve temizleme önerileri." }
          ].map((card) => (
            <Link key={card.href} href={card.href} className="focus-ring group rounded-lg border border-charcoal/10 bg-ivory p-6 hover:border-burgundy/40">
              <h2 className="font-serif text-2xl text-charcoal group-hover:text-burgundy">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">{card.text}</p>
            </Link>
          ))}
        </section>
      </article>
    </>
  );
}
