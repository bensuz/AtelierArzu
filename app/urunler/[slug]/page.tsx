import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProduct, getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";

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

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/urunler/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.image, alt: `${product.name} kroşe çanta` }],
      type: "website"
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const products = await getProducts();
  if (!product) notFound();
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const related = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .concat(products.filter((item) => item.slug !== product.slug))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: gallery.map((image) => absoluteUrl(image)),
          description: product.description,
          brand: { "@type": "Brand", name: siteConfig.name },
          material: product.materials.join(", "),
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            price: product.price.replace(/[^0-9]/g, ""),
            availability:
              product.availability === "Tükendi"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            url: absoluteUrl(`/urunler/${product.slug}`)
          }
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Sayfa yolu" className="mb-8 text-sm text-ink/58">
          <Link href="/" className="hover:text-ink">Ana sayfa</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/urunler" className="hover:text-ink">Ürünler</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={index === 0 ? "relative aspect-[4/5] overflow-hidden rounded-lg bg-linen sm:col-span-2" : "relative aspect-square overflow-hidden rounded-lg bg-linen"}
              >
                <Image
                  src={image}
                  alt={`${product.name} placeholder görsel ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 27vw, 50vw"}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
              {product.collection}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-linen px-4 py-2 text-sm font-semibold">
                {product.price}
              </span>
              <span className="rounded-full bg-linen px-4 py-2 text-sm font-semibold">
                {product.availability}
              </span>
              <span className="rounded-full bg-linen px-4 py-2 text-sm font-semibold">
                {product.makingTime}
              </span>
            </div>
            <dl className="mt-8 grid gap-4 border-y border-ink/10 py-6">
              {[
                ["Malzeme", product.materials.join(", ")],
                ["Ölçü", product.dimensions],
                ["Renkler", product.colors.join(", ")],
                ["Askı", product.strap],
                ["Kapama", product.closure],
                ["Bakım", product.care]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-sm font-semibold text-ink">{label}</dt>
                  <dd className="text-sm leading-6 text-ink/68">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <WhatsAppButton
                message={`Merhaba Atelier Arzu, ${product.name} hakkında bilgi almak istiyorum.`}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-ink/52">
              Görseller geçici ürün temsilleridir. Gerçek ürün fotoğrafları eklendiğinde
              bu galeri 5-8 açıyla güncellenecektir.
            </p>
          </div>
        </div>
        {related.length ? (
          <section className="mt-16 border-t border-ink/10 pt-10">
            <SectionHeading
              eyebrow="Benzer modeller"
              title="Bu dokuyu sevenler için"
            />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <RelatedProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="focus-ring group grid grid-cols-[104px_1fr] overflow-hidden rounded-lg border border-ink/10 bg-shell transition-shadow hover:shadow-soft sm:grid-cols-[132px_1fr]"
    >
      <div className="relative h-32 overflow-hidden bg-linen sm:h-36">
        <Image
          src={product.image}
          alt={`${product.name} el yapımı kroşe çanta`}
          fill
          sizes="132px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 font-serif text-2xl font-semibold leading-tight text-ink">
          {product.name}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink/68">
          <span>{product.price}</span>
          <span aria-hidden="true">·</span>
          <span>{product.availability}</span>
        </div>
      </div>
    </Link>
  );
}
