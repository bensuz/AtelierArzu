import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { publicPageMetadata } from "@/lib/metadata";
import { getBlogPosts, getProduct, getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";

const offerAvailability = {
  "Hazır": "https://schema.org/InStock",
  "Sipariş Üzerine": "https://schema.org/MadeToOrder",
  "Tükendi": "https://schema.org/OutOfStock"
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
      alt: product.imageDetails?.find((image) => image?.url === product.image)?.alt || `${product.name} el yapımı kroşe çanta`
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
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 2);
  const guides = posts.filter((post) => post.relatedProducts?.includes(product.slug));

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
          offers: product.priceAmount === undefined ? undefined : {
            "@type": "Offer",
            priceCurrency: "TRY",
            price: product.priceAmount,
            availability: offerAvailability[product.availability],
            url: absoluteUrl(`/urunler/${product.slug}`)
          }
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/urunler", label: "Ürünler" },
          { href: `/urunler/${product.slug}`, label: product.name }
        ]} />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={index === 0 ? "relative aspect-[4/5] overflow-hidden rounded-lg bg-linen sm:col-span-2" : "relative aspect-square overflow-hidden rounded-lg bg-linen"}
              >
                <Image
                  src={image}
                  alt={product.imageDetails?.find((detail) => detail?.url === image)?.alt || (index === 0 ? `${product.name} el yapımı kroşe çanta` : "")}
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
                ["İçine ne sığar?", product.capacity],
                ["Renkler", product.colors.join(", ")],
                ["Askı", product.strap],
                ["Kapama", product.closure],
                ["Bakım", product.care],
                ["Tahmini kargoya veriliş", product.shippingEstimate]
              ].filter(([, value]) => Boolean(value?.trim())).map(([label, value]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-sm font-semibold text-ink">{label}</dt>
                  <dd className="text-sm leading-6 text-ink/68">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/canta-olcu-rehberi" className="focus-ring mt-3 inline-block rounded-sm text-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
              Çanta ölçü rehberi
            </Link>
            {product.designNote && (
              <section className="mt-6 rounded-lg bg-linen p-5">
                <h2 className="font-serif text-2xl font-semibold">Arzu’dan tasarım notu</h2>
                <p className="mt-2 whitespace-pre-line text-base leading-7 text-ink/75">{product.designNote}</p>
              </section>
            )}
            <div className="mt-8">
              <WhatsAppButton
                message={`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-ink/52">
              {siteConfig.phone && "WhatsApp’ta bu modelin adını içeren hazır bir mesaj açılır. "}
              Kargo ücreti, teslimat tahmini ve toplam tutar sipariş onayından önce paylaşılır.
            </p>
            <Link href="/siparis-rehberi" className="focus-ring mt-2 inline-block rounded-sm text-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
              Sipariş nasıl verilir?
            </Link>
            {gallery.includes("/images/atelier-hero.png") && (
              <p className="mt-2 text-xs leading-5 text-ink/65">Genel kapak görseli kullanılıyor.</p>
            )}
          </div>
        </div>
        {guides.length > 0 && (
          <section className="mt-16 border-t border-ink/10 pt-10">
            <h2 className="font-serif text-4xl font-semibold">Bu modelle ilgili atölye notları</h2>
            <ul className="mt-5 space-y-3">
              {guides.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="focus-ring font-semibold underline underline-offset-4 hover:text-[#741616]">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
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
