import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, Link2 } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { CollectionCarousel } from "@/components/collection-carousel";
import { YarnBallIcon } from "@/components/craft-icons";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBlogPosts, getProducts } from "@/lib/sanity";
import { absoluteUrl, instagramUrl, siteConfig } from "@/lib/site";

const workshopDetails = [
  { icon: YarnBallIcon, title: "İplik ve doku", text: "İpliğin kalınlığı ve ilmeklerin sıklığı, çantanın elde nasıl hissedildiğini ve formunun ne kadar tok durduğunu belirliyor." },
  { icon: Link2, title: "Askı ve kapama", text: "Askı boyu çantanın omuzda nereye oturacağını, kapama biçimi ise içindekilere ne kadar rahat ulaşılacağını etkiliyor." },
  { icon: Layers3, title: "Astar ve iç düzen", text: "Astarlı modellerde iç yüzey küçük eşyaların takılmasını azaltıyor. Ağız açıklığı ve iç ölçü, çantanın günlük kullanımını şekillendiriyor." }
];

export default async function HomePage() {
  const [products, blogPosts] = await Promise.all([getProducts(), getBlogPosts()]);
  const collection = products.slice(0, 10);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: absoluteUrl("/images/arzudan-logo.png"),
          ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
          contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.email,
            ...(siteConfig.phone ? { telephone: `+${siteConfig.phone}` } : {}),
            contactType: "customer service",
            availableLanguage: ["Turkish"],
          },
        }}
      />
      <section className="relative overflow-hidden bg-ink text-shell">
        <Image
          src="/images/atelier-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,41,37,0.84)_0%,rgba(45,41,37,0.62)_34%,rgba(45,41,37,0.12)_58%,rgba(45,41,37,0.08)_82%,rgba(45,41,37,0.00)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh_-_var(--site-header-height))] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shell/90">
              El yapımı kroşe çantalar
            </p>
            <h1 className="brand-wordmark mt-5 text-[clamp(3.75rem,11vw,8.25rem)] leading-[0.96] text-shell">
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-shell/92">
              Arzu’nun tasarlayıp elde ördüğü çantalar, az sayıda hazırlanan küçük koleksiyonlarda buluşuyor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={collection.length ? "#koleksiyon" : "/urunler"}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-shell px-6 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
              >
                Koleksiyonu incele
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <WhatsAppButton
                message="Merhaba, kroşe çanta koleksiyonunuz hakkında bilgi almak istiyorum."
              />
            </div>
          </div>
        </div>
      </section>

      {collection.length > 0 && (
        <section id="koleksiyon" aria-labelledby="koleksiyon-baslik" className="mx-auto max-w-7xl scroll-mt-[calc(var(--site-header-height)+1rem)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="scroll-reveal flex flex-wrap items-end justify-between gap-4">
            <h2 id="koleksiyon-baslik" className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Koleksiyon
            </h2>
            <Link href="/urunler" className="focus-ring rounded-sm font-semibold text-[#741616] underline underline-offset-4 hover:text-ink">
              Tüm modelleri gör
            </Link>
          </div>
          <CollectionCarousel>
            {collection.map((product) => (
              <li key={product.slug} className="min-w-0 shrink-0 basis-[82%] snap-start sm:basis-[46%] lg:basis-[30%]">
                <ProductCard product={product} />
              </li>
            ))}
          </CollectionCarousel>
        </section>
      )}

      <section className="bg-linen px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="scroll-reveal mx-auto max-w-3xl">
          <Image
            src="/images/arzudan-monogram.png"
            alt=""
            width={706}
            height={422}
            sizes="112px"
            className="mb-5 h-auto w-28"
          />
          <h2 className="font-serif text-4xl font-semibold text-ink">Merhaba, ben Arzu.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/75 sm:text-lg">
            Arzu’dan, günlük hayatta kullanmayı seveceğinizi düşündüğüm çantaları bir araya
            getirdiğim küçük bir tasarım markası. Renkleri, dokuları ve ölçüleri ben seçiyorum.
            Her çantayı ilk ilmekten son dikişe kadar kendim hazırlıyorum.
          </p>
          <Link
            href="/hakkimizda"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-shell"
          >
            Atölyenin hikâyesi
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-[#741616]/10 bg-shell py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal max-w-2xl">
            <SectionHeading
              eyebrow="Atölye yaklaşımı"
              title="İpten son dikişe"
              description="Bir çantanın görünümü kadar onu her gün nasıl kullandığınız da önemli. Her modelde bu üç ayrıntıya bakıyoruz."
            />
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {workshopDetails.map(({ icon: Icon, title, text }) => (
              <div key={title} className="scroll-reveal">
                <article className="h-full rounded-xl border border-[#741616]/15 bg-linen/60 p-6 hover:border-[#741616]/35 hover:shadow-soft motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 sm:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#741616]/15 bg-shell text-[#741616]">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-ink/75">{text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-shell py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              title="Kroşe çanta seçimi ve bakımı"
              description="Mini bir çantaya neler sığar? Örgünün formu nasıl korunur? Çanta seçerken nelere baktığımı ve bakım için neler önerdiğimi atölye notlarımda paylaşıyorum."
            />
            <Link
              href="/blog"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold"
            >
              Atölye notlarını oku
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          {blogPosts.length > 0 && (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.slug} className="scroll-reveal">
                  <BlogCard post={post} heading="h3" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
