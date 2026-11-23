import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { CollectionCarousel } from "@/components/collection-carousel";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { optionalImage } from "@/lib/assets";
import { getFeaturedFaq } from "@/lib/faq";
import { getBlogPosts, getProducts } from "@/lib/sanity";
import { absoluteUrl, instagramUrl, siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const orderSteps = [
  { title: "Ürünü keşfet", text: "Koleksiyondan beğendiğiniz modeli seçin; ölçü, askı ve renk bilgisi ürün sayfasında." },
  { title: "WhatsApp’tan yazın", text: "Modelin adını ya da bağlantısını gönderin. Renk isteğiniz varsa ilk mesajda belirtin." },
  { title: "Detayları ve tutarı öğrenin", text: "Uygun renkleri, hazırlık süresini ve kargo dahil toplam tutarı yazılı olarak paylaşırım." },
  { title: "Siparişi onaylayın", text: "Özeti onayladığınızda ödeme ve gönderim bilgilerini netleştirir, çantanızı hazırlamaya başlarım." }
];

const craftDetails = [
  {
    number: "01",
    title: "İplik ve doku",
    text: "İpliğin kalınlığı ve ilmeklerin sıklığı, çantanın elde nasıl hissedildiğini ve formunun ne kadar tok durduğunu belirliyor. Her modelde önce küçük bir örnek örüp dokuya bakıyorum.",
    slug: "flora",
    position: "object-[50%_70%]"
  },
  {
    number: "02",
    title: "Askı ve kapama",
    text: "Askının boyu çantanın omuzda nereye oturacağını, kapamanın biçimi ise içindekilere ne kadar rahat ulaşacağınızı belirliyor. Askıyı çoğu modelde gövdeyle aynı iple örüyorum.",
    slug: "luna",
    position: "object-[50%_35%]"
  },
  {
    number: "03",
    title: "İç düzen ve son kontrol",
    text: "Bitirdiğim her çantayı doldurup omuzda deniyorum: ağız açıklığı, askı bağlantıları ve çantanın doluyken nasıl durduğu bu kontrolde belli oluyor.",
    slug: "marina",
    galleryIndex: 1,
    position: "object-center"
  }
];

function pickImage(products: Product[], slug: string, galleryIndex = 0) {
  const product = products.find((item) => item.slug === slug) ?? products[0];
  if (!product) return undefined;
  const src = product.gallery?.[galleryIndex] ?? product.image;
  const alt = product.imageDetails?.find((detail) => detail?.url === src)?.alt || `${product.name} el örgüsü çanta, yakın plan`;
  return { src, alt, product };
}

export default async function HomePage() {
  const [products, blogPosts] = await Promise.all([getProducts(), getBlogPosts()]);
  const collection = products.slice(0, 10);
  const heroPrimary = pickImage(products, "flora");
  const heroImage = optionalImage("hero") ?? "/images/atelier-hero.png";
  const portrait = optionalImage("makerPortrait");
  const faq = getFeaturedFaq(siteConfig.city).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: absoluteUrl("/images/arzudan-logo.png"),
          founder: { "@type": "Person", name: siteConfig.maker },
          ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
          contactPoint: {
            "@type": "ContactPoint",
            ...(siteConfig.email ? { email: siteConfig.email } : {}),
            ...(siteConfig.phone ? { telephone: `+${siteConfig.phone}` } : {}),
            contactType: "customer service",
            availableLanguage: ["Turkish"]
          }
        }}
      />

      {/* Hero */}
      <section className="relative -mt-[var(--site-header-height)] overflow-hidden bg-charcoal text-ivory">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,37,35,0.86)_0%,rgba(43,37,35,0.66)_36%,rgba(43,37,35,0.18)_62%,rgba(43,37,35,0.06)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,37,35,0.1)_0%,rgba(43,37,35,0.35)_40%,rgba(43,37,35,0.82)_100%)] lg:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-40 bg-[linear-gradient(180deg,rgba(43,37,35,0)_0%,rgba(43,37,35,0.45)_100%)] lg:block" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-[calc(var(--site-header-height)+3rem)] sm:px-6 lg:justify-center lg:px-8 lg:pb-24">
          <div className="max-w-2xl">
            <p className="eyebrow !text-ivory/80">El örgüsü çantalar · Arzu’nun atölyesinden</p>
            <h1 className="brand-wordmark mt-5 text-[clamp(4rem,12vw,9rem)] leading-[0.92] text-ivory">
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-ivory sm:text-3xl">
              Her ilmeği tek tek, kendi ellerimle örüyorum.
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-ivory/80 sm:text-lg sm:leading-8">
              Çantalarımı kendim tasarlıyor, hasır iple örüyor ve az sayıda hazırlıyorum. Beğendiğiniz modeli WhatsApp’tan yazmanız yeterli.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={collection.length ? "#koleksiyon" : "/urunler"} className="btn-light">
                Koleksiyonu keşfet
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/siparis-rehberi" className="btn-outline-light">
                Nasıl sipariş verilir?
              </Link>
            </div>
          </div>
          {heroPrimary && (
            <Link
              href={`/urunler/${heroPrimary.product.slug}`}
              className="focus-ring absolute bottom-6 right-4 hidden items-center gap-3 rounded-full bg-ivory/90 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-charcoal shadow-sm backdrop-blur hover:text-burgundy sm:right-6 lg:right-8 lg:inline-flex"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image src={heroPrimary.src} alt="" fill sizes="36px" className="object-cover" />
              </span>
              Koleksiyondan: {heroPrimary.product.name} · {heroPrimary.product.price}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </section>

      {/* Collection */}
      {collection.length > 0 && (
        <section id="koleksiyon" aria-labelledby="koleksiyon-baslik" className="scroll-mt-[calc(var(--site-header-height)+1rem)] border-t border-charcoal/10 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow">Koleksiyon</p>
                <h2 id="koleksiyon-baslik" className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl">
                  Şu an atölyede olan modeller
                </h2>
                <p className="mt-4 text-charcoal/70">
                  Her model az sayıda hazırlanıyor. Fiyatlar ürün sayfasında; kargo dahil toplam tutar siparişten önce paylaşılır.
                </p>
              </div>
              <Link href="/urunler" className="text-link">
                Tüm modelleri gör
              </Link>
            </div>
            <div className="mt-8">
              <CollectionCarousel>
                {collection.map((product, index) => (
                  <li key={product.slug} className="min-w-0 shrink-0 basis-[78%] snap-start sm:basis-[46%] lg:basis-[31%]">
                    <ProductCard product={product} priority={index < 2} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw" />
                  </li>
                ))}
              </CollectionCarousel>
            </div>
          </div>
        </section>
      )}

      {/* Meet Arzu */}
      <section className="bg-cream">
        <div className={`mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${portrait ? "grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20" : ""}`}>
          {portrait && (
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="image-frame aspect-[4/5] bg-sand">
                <Image src={portrait} alt="Arzu, atölyesinde çanta örerken" fill sizes="(min-width: 1024px) 32vw, 90vw" className="object-cover" />
              </div>
              <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[0.5rem] border border-burgundy/20" />
            </div>
          )}
          <div className={portrait ? "" : "mx-auto max-w-3xl"}>
            <p className="eyebrow">Merhaba</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1] text-charcoal sm:text-6xl">Ben Arzu.</h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-charcoal/80">
              <p>
                Arzu’dan, günlük hayatta kullanmayı seveceğinizi düşündüğüm çantaları bir araya getirdiğim küçük bir tasarım markası. Renkleri, dokuları ve ölçüleri ben seçiyorum.
              </p>
              <p>
                Bir çantaya başlarken önce onu gün içinde nasıl kullanacağınızı düşünüyorum. Sonra ipliği, ölçüyü ve askının omuzda nasıl duracağını seçiyorum. Her modeli kendim örüyor, bitirdiğimde astarından son dikişine kadar tek tek kontrol ediyorum.
              </p>
            </div>
            <Link href="/hakkimizda" className="btn-secondary mt-8">
              Hikâyemi okuyun
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="İpten son dikişe"
            title="Bir çantanın görünümü kadar her gün nasıl kullanıldığı da önemli."
            description="Her modelde şu üç ayrıntıya bakıyorum."
          />
          <ol className="mt-14 space-y-14 lg:space-y-20">
            {craftDetails.map((detail, index) => {
              const picture = pickImage(products, detail.slug, detail.galleryIndex);
              const reverse = index % 2 === 1;
              return (
                <li key={detail.title} className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${reverse ? "lg:[&>*:first-child]:col-start-7" : ""}`}>
                  <div className={`lg:col-span-6 ${reverse ? "lg:row-start-1" : ""}`}>
                    <div className={`image-frame ${index === 1 ? "aspect-[5/4]" : "aspect-[4/3]"}`}>
                      <Image
                        src={picture?.src ?? "/images/atelier-hero.png"}
                        alt={picture?.alt ?? "El örgüsü çanta dokusu"}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={`object-cover ${detail.position}`}
                      />
                    </div>
                  </div>
                  <div className={`lg:col-span-5 ${reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
                    <p className="font-serif text-5xl italic text-burgundy/60">{detail.number}</p>
                    <h3 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">{detail.title}</h3>
                    <p className="mt-4 text-base leading-8 text-charcoal/75 sm:text-lg">{detail.text}</p>
                    {picture && (
                      <Link href={`/urunler/${picture.product.slug}`} className="text-link mt-5 inline-block text-sm">
                        Fotoğraftaki model: {picture.product.name}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Ordering */}
      <section className="bg-olive text-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow !text-ivory/60">Sipariş</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-ivory sm:text-5xl">Nasıl sipariş verilir?</h2>
              <p className="mt-4 text-ivory/75">
                Sitede sepet yok; siparişler WhatsApp üzerinden, birlikte konuşarak alınıyor. Dört adımda tamamlanıyor.
              </p>
            </div>
            <Link href="/siparis-rehberi" className="footer-link text-sm font-semibold text-ivory/85">
              Ayrıntılı sipariş rehberi
            </Link>
          </div>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {orderSteps.map((step, index) => (
              <li key={step.title} className="relative border-t border-ivory/20 pt-6">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border border-ivory bg-olive" />
                <p className="font-serif text-4xl italic text-ivory/50">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-ivory">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ivory/75">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton variant="light" label="WhatsApp’tan yazın" message="Merhaba, kroşe çantalarınız hakkında bilgi almak istiyorum." />
            <p className="text-sm text-ivory/65">Toplam tutar ve teslimat tarihi onaydan önce yazılı olarak paylaşılır.</p>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Atölye notları"
              title="Çanta seçimi ve bakımı üzerine"
              description="Mini bir çantaya neler sığar? Örgünün formu nasıl korunur? Seçerken nelere baktığımı ve bakım için neler önerdiğimi yazıyorum."
            />
            <Link href="/blog" className="text-link shrink-0">
              Tüm notlar
            </Link>
          </div>
          {blogPosts.length > 0 && (
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} heading="h3" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="border-t border-charcoal/10 bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">Sık sorulanlar</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl">Merak ettikleriniz</h2>
            <p className="mt-4 text-charcoal/70">Sipariş, hazırlık süresi, renk ve bakımla ilgili en sık gelen sorular.</p>
            <Link href="/sik-sorulan-sorular" className="btn-secondary mt-7">
              Tüm soruları görün
            </Link>
          </div>
          <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {faq.map((item) => (
              <div key={item.question} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
                <dt className="font-serif text-xl leading-snug text-charcoal">{item.question}</dt>
                <dd className="text-sm leading-7 text-charcoal/75">
                  {item.answer}
                  {item.link && (
                    <>
                      {" "}
                      <Link href={item.link.href} className="text-link">{item.link.label}</Link>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
