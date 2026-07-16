import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CrochetLoopIcon, StitchSwatchIcon, YarnBallIcon } from "@/components/craft-icons";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { blogPosts, materials, team } from "@/lib/data";
import { getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: absoluteUrl("/images/atelier-hero.png"),
          sameAs: [siteConfig.instagram],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: `+${siteConfig.phone}`,
            contactType: "customer service",
            availableLanguage: ["Turkish"],
          },
        }}
      />
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-ink text-shell">
        <Image
          src="/images/atelier-hero.png"
          alt="Atelier Arzu atölyesinde el yapımı kroşe çantalar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,41,37,0.84)_0%,rgba(45,41,37,0.62)_34%,rgba(45,41,37,0.12)_58%,rgba(45,41,37,0.08)_82%,rgba(45,41,37,0.00)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shell/90">
              El yapımı kroşe çantalar
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.95] text-shell sm:text-7xl">
              Atelier Arzu
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-shell/92">
              Pamuk iplik, sade formlar ve atölye emeğiyle örülen; günlük hayata zarif ama
              ulaşılabilir bir sıcaklık katan çantalar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/urunler"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-shell px-6 py-3 text-sm font-semibold text-ink transition hover:bg-linen"
              >
                Koleksiyonu incele
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <WhatsAppButton
                label="Sipariş için yaz"
                message="Merhaba Atelier Arzu, kroşe çantalarınız hakkında bilgi almak istiyorum."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Seçili modeller"
            title="Az sayıda, özenli ve günlük kullanıma hazır."
            description="Her çanta gerçek kullanım alışkanlıkları düşünülerek; ölçüsü, askısı, kapaması ve malzemesiyle birlikte tasarlanır."
          />
          <div className="grid gap-3 text-sm leading-6 text-ink/68 sm:grid-cols-3">
            {["Pamuk iplik", "Siparişe göre renk", "WhatsApp danışma"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full bg-linen px-4 py-3">
                {item === "Pamuk iplik" ? (
                  <YarnBallIcon className="h-5 w-5 text-clay" />
                ) : item === "Siparişe göre renk" ? (
                  <CrochetLoopIcon className="h-5 w-5 text-olive" />
                ) : (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-olive" />
                )}
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-linen py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow="Atölye yaklaşımı"
            title="Lüks hissi, ulaşılabilir ve samimi bir emeğin içinden gelir."
            description="Atelier Arzu'da amaç gösterişli olmak değil; iyi malzemeyi, temiz örgüyü ve uzun süre sevilecek bir formu bir araya getirmek."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {materials.map((material) => (
              <article key={material.name} className="rounded-lg border border-ink/10 bg-shell p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linen text-clay">
                  <YarnBallIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{material.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/66">{material.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-oat">
          <Image
            src="/images/atelier-hero.png"
            alt="Atelier Arzu atölyesinde iplikler ve kroşe çantalar"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <SectionHeading
            eyebrow="Ekip"
            title="Her model, elde ve yavaş bir ritimle tamamlanır."
            description={team[0].bio}
          />
          <Link
            href="/hakkimizda"
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-shell"
          >
            Atölyeyi tanı
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-shell py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Blog"
              title="Kroşe çanta rehberleri ve stil notları."
              description="Bakım, kombin ve satın alma kararını kolaylaştıran Türkçe içerikler."
            />
            <Link
              href="/blog"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold"
            >
              Tüm yazılar
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="rounded-lg border border-ink/10 bg-linen p-6">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                  <StitchSwatchIcon className="h-4 w-4 text-olive" />
                  {post.category}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/66">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-ring mt-5 inline-flex rounded-sm text-sm font-semibold text-olive"
                >
                  Oku
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
