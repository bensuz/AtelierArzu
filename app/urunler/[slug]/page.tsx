import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BagCapacity } from "@/components/bag-capacity";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { StickyProductCta } from "@/components/sticky-product-cta";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { publicPageMetadata } from "@/lib/metadata";
import { getBlogPosts, getProduct, getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig, whatsappUrl } from "@/lib/site";
import type { Product } from "@/lib/types";

const offerAvailability = {
  "Hazır": "https://schema.org/InStock",
  "Sipariş Üzerine": "https://schema.org/MadeToOrder",
  "Tükendi": "https://schema.org/OutOfStock"
};

const availabilityCopy: Record<Product["availability"], { label: string; dot: string }> = {
  "Hazır": { label: "Hazır", dot: "bg-emerald-700" },
  "Sipariş Üzerine": { label: "Sipariş üzerine hazırlanır", dot: "bg-burgundy" },
  "Tükendi": { label: "Şu anda tükendi", dot: "bg-charcoal/40" }
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return publicPageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/urunler/${product.slug}`,
    image: {
      url: product.image,
      alt: product.imageDetails?.find((image) => image?.url === product.image)?.alt || `${product.name} el örgüsü çanta`
    }
  });
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [products, posts] = await Promise.all([getProducts(), getBlogPosts()]);

  const gallery = (product.gallery?.length ? product.gallery : [product.image]).map((src, index) => ({
    src,
    alt:
      product.imageDetails?.find((detail) => detail?.url === src)?.alt ||
      (index === 0 ? `${product.name} el örgüsü çanta` : `${product.name}, ${index + 1}. fotoğraf`)
  }));

  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);
  const guides = posts.filter((post) => post.relatedProducts?.includes(product.slug));
  const availability = availabilityCopy[product.availability];
  const whatsappMessage = `Merhaba, ${product.name} modeli hakkında bilgi almak istiyorum. ${absoluteUrl(`/urunler/${product.slug}`)}`;
  const whatsappHref = whatsappUrl(whatsappMessage);
  const intro = product.editorial?.intro ?? product.description;
  const usesPlaceholderImage = gallery.some((image) => image.src === "/images/atelier-hero.png");

  const facts = [
    { label: "Malzeme", value: product.materials.join(", ") },
    { label: "Ölçü", value: product.dimensions, hint: { href: "/canta-olcu-rehberi", label: "Ölçü rehberi" } },
    { label: "Renk", value: product.colors.join(", ") },
    { label: "Askı", value: product.strap },
    { label: "Kapama", value: product.closure }
  ].filter((fact) => Boolean(fact.value?.trim()));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: gallery.map((image) => absoluteUrl(image.src)),
          description: intro,
          sku: product.slug,
          category: product.category,
          color: product.colors.join(", "),
          brand: { "@type": "Brand", name: siteConfig.name },
          material: product.materials.join(", "),
          ...(product.priceAmount === undefined ? {} : {
            offers: {
              "@type": "Offer",
              priceCurrency: "TRY",
              price: product.priceAmount,
              availability: offerAvailability[product.availability],
              itemCondition: "https://schema.org/NewCondition",
              url: absoluteUrl(`/urunler/${product.slug}`),
              seller: { "@type": "Organization", name: siteConfig.name }
            }
          })
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        <Breadcrumbs items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/urunler", label: "Ürünler" },
          { href: `/urunler/${product.slug}`, label: product.name }
        ]} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <ProductGallery images={gallery} name={product.name} />

          <div className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:h-fit">
            <p className="eyebrow">
              {product.category}
              {product.collection && <span className="text-charcoal/40"> · {product.collection} koleksiyonu</span>}
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">{product.name}</h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <p className="text-2xl font-semibold tabular-nums text-charcoal">{product.price}</p>
              <p className="inline-flex items-center gap-2 text-sm text-charcoal/75">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${availability.dot}`} />
                {availability.label}
              </p>
            </div>

            <p className="mt-6 text-lg leading-8 text-charcoal/80">{intro}</p>

            {product.editorial?.highlights?.length ? (
              <ul className="mt-5 space-y-2 text-[0.9375rem] leading-7 text-charcoal/80">
                {product.editorial.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.8rem] h-px w-4 shrink-0 bg-burgundy" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <div id="urun-cta" className="mt-8 rounded-lg border border-burgundy/10 bg-cream/60 p-5">
              <WhatsAppButton label="WhatsApp’tan sor ve sipariş ver" message={whatsappMessage} className="w-full sm:w-auto" />
              <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                <div className="flex gap-2">
                  <dt className="text-charcoal/55">Hazırlık süresi</dt>
                  <dd className="font-medium text-charcoal">{product.makingTime}</dd>
                </div>
                {product.shippingEstimate && (
                  <div className="flex gap-2">
                    <dt className="text-charcoal/55">Kargoya veriliş</dt>
                    <dd className="font-medium text-charcoal">{product.shippingEstimate}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-xs leading-5 text-charcoal/60">
                Kargo ücreti, tahmini teslimat tarihi ve toplam tutar siparişi onaylamanızdan önce yazılı olarak paylaşılır.{" "}
                <Link href="/siparis-rehberi" className="text-link">Sipariş adımları</Link>
              </p>
            </div>

            <dl className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-charcoal/55">{fact.label}</dt>
                  <dd className="text-charcoal">
                    {fact.value}
                    {fact.hint && (
                      <>
                        {" "}
                        <Link href={fact.hint.href} className="text-link text-xs font-medium">{fact.hint.label}</Link>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-2 divide-y divide-charcoal/10 border-b border-charcoal/10">
              <details className="faq-item group py-1">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                  Bakım
                  <span aria-hidden="true" className="text-lg leading-none text-burgundy group-open:rotate-45 motion-safe:transition-transform">+</span>
                </summary>
                <p className="whitespace-pre-line pb-4 text-sm leading-6 text-charcoal/75">{product.care}</p>
                <Link href="/malzemeler-ve-bakim" className="text-link mb-4 inline-block text-xs">Malzemeler ve bakım önerileri</Link>
              </details>
              <details className="faq-item group py-1">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                  Hazırlık ve teslimat
                  <span aria-hidden="true" className="text-lg leading-none text-burgundy group-open:rotate-45 motion-safe:transition-transform">+</span>
                </summary>
                <div className="space-y-2 pb-4 text-sm leading-6 text-charcoal/75">
                  <p><span className="font-medium text-charcoal">Durum:</span> {availability.label}.</p>
                  <p><span className="font-medium text-charcoal">Hazırlık süresi:</span> {product.makingTime}. Bu süre siparişin hazırlanıp kargoya verilmesine kadar geçen süreyi kapsar; kesin tarihi onaydan önce birlikte netleştiririz.</p>
                  {product.shippingEstimate && <p><span className="font-medium text-charcoal">Tahmini kargoya veriliş:</span> {product.shippingEstimate}.</p>}
                  <p>Kargo süresi, teslimat adresine göre değişir ve hazırlık süresine dahil değildir.</p>
                </div>
              </details>
              <details className="faq-item group py-1">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                  Renk veya ölçü değişikliği
                  <span aria-hidden="true" className="text-lg leading-none text-burgundy group-open:rotate-45 motion-safe:transition-transform">+</span>
                </summary>
                <p className="pb-4 text-sm leading-6 text-charcoal/75">
                  Bazı modellerde iplik stoğuna göre farklı renk çalışılabiliyor. Modelin adını ve istediğiniz rengi yazarsanız uygun seçenekleri ve hazırlık süresini paylaşırım.{" "}
                  <Link href="/sik-sorulan-sorular" className="text-link">Sık sorulan sorular</Link>
                </p>
              </details>
            </div>

            <div className="mt-6 space-y-6">
              <BagCapacity fits={product.fits} note={product.capacity} />
              {(product.designNote || product.editorial?.makerNote) && (
                <section className="border-l-2 border-burgundy/40 pl-5">
                  <h2 className="eyebrow">Arzu’dan not</h2>
                  <p className="mt-2 whitespace-pre-line font-serif text-xl leading-relaxed text-charcoal/85">
                    {product.designNote || product.editorial?.makerNote}
                  </p>
                </section>
              )}
            </div>

            {usesPlaceholderImage && (
              <p className="mt-4 text-xs leading-5 text-charcoal/55">Bu model için ürün fotoğrafı henüz eklenmedi; geçici görsel gösteriliyor.</p>
            )}
          </div>
        </div>

        {product.editorial?.usage && (
          <section className="mx-auto mt-20 max-w-3xl text-center">
            <div className="thread-rule thread-rule-center" aria-hidden="true" />
            <h2 className="eyebrow mt-10">Günlük kullanım</h2>
            <p className="mt-4 font-serif text-2xl leading-snug text-charcoal sm:text-3xl">{product.editorial.usage}</p>
          </section>
        )}

        {guides.length > 0 && (
          <section className="mt-20 border-t border-charcoal/10 pt-10">
            <h2 className="font-serif text-3xl text-charcoal">Bu modelle ilgili atölye notları</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {guides.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="focus-ring group flex items-baseline justify-between gap-4 rounded-md border border-charcoal/10 bg-ivory px-5 py-4 hover:border-burgundy/40">
                    <span className="font-serif text-xl leading-snug text-charcoal">{post.title}</span>
                    <span className="shrink-0 text-xs text-charcoal/55">{post.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length ? (
          <section className="mt-20 border-t border-charcoal/10 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Benzer modeller" title="Bu dokuyu sevenler için" />
              <Link href="/urunler" className="text-link">Tüm modeller</Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <StickyProductCta href={whatsappHref} price={product.price} name={product.name} watchId="urun-cta" />
    </>
  );
}
