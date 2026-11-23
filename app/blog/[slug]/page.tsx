import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { publicPageMetadata } from "@/lib/metadata";
import { getBlogPost, getBlogPosts, getProducts } from "@/lib/sanity";
import { absoluteUrl, instagramUrl, siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const articleComponents = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string; width?: number; height?: number } }) => {
      if (!value.url || !value.width || !value.height) return null;

      return (
        <figure>
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={value.width}
            height={value.height}
            sizes="(min-width: 768px) 680px, 100vw"
            className="h-auto rounded-[0.375rem]"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    }
  }
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return publicPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    image: { url: post.image, alt: post.imageAlt || post.title },
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author]
    }
  });
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const [allPosts, allProducts] = await Promise.all([
    getBlogPosts().catch(() => [] as Awaited<ReturnType<typeof getBlogPosts>>),
    getProducts().catch((error: unknown) => {
      console.error("Could not load products for blog post", error);
      return [] as Awaited<ReturnType<typeof getProducts>>;
    })
  ]);

  const relatedSlugs = post.relatedProducts ?? [];
  const relatedProducts = allProducts.filter((product) => relatedSlugs.includes(product.slug)).slice(0, 3);
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const isPlainBody = typeof post.body?.[0] === "string";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          inLanguage: "tr-TR",
          author: {
            "@type": "Person",
            name: post.author,
            url: absoluteUrl("/hakkimizda"),
            ...(instagramUrl ? { sameAs: [instagramUrl] } : {})
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: absoluteUrl("/images/arzudan-logo.png") }
          },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
        }}
      />

      <article className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Breadcrumbs items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/blog", label: "Atölye notları" },
          { href: `/blog/${post.slug}`, label: post.title }
        ]} />

        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{post.category} · {post.readTime} okuma</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-charcoal sm:text-6xl">{post.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-charcoal/75">{post.excerpt}</p>
          <p className="mt-6 text-sm text-charcoal/60">
            <Link href="/hakkimizda" className="font-semibold text-charcoal hover:text-burgundy">{post.author}</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
          </p>
        </header>

        <figure className="mx-auto mt-10 max-w-5xl">
          <div className="image-frame aspect-[16/9] sm:aspect-[2/1]">
            <Image
              src={post.image}
              alt={post.imageAlt || `${post.title} için kroşe çanta görseli`}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
          {post.imageAlt && <figcaption className="mt-3 text-center text-sm text-charcoal/55">{post.imageAlt}</figcaption>}
        </figure>

        <div className="article-body mx-auto mt-12 max-w-[42rem]">
          {isPlainBody ? (
            post.body.map((paragraph) => <p key={String(paragraph)}>{String(paragraph)}</p>)
          ) : (
            <PortableText value={(post.body ?? []) as never} components={articleComponents} />
          )}
          {post.faq?.length ? (
            <section aria-labelledby="yazi-sss">
              <h2 id="yazi-sss">Sık sorulanlar</h2>
              {post.faq.map((item) => (
                <div key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </section>
          ) : null}
        </div>

        <aside className="mx-auto mt-14 max-w-[42rem] border-y border-charcoal/10 py-8">
          <div className="flex items-start gap-5">
            <Image src="/images/arzudan-monogram.png" alt="" width={706} height={422} sizes="72px" className="h-auto w-[72px] shrink-0" />
            <div>
              <p className="eyebrow">Yazan</p>
              <p className="mt-1 font-serif text-2xl text-charcoal">{post.author}</p>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">
                Arzu’dan çantalarını tasarlıyor ve her birini kendi elleriyle örüyor. Yazılarında kendi atölyesinde edindiği deneyimi paylaşıyor.
              </p>
              <Link href="/hakkimizda" className="text-link mt-2 inline-block text-sm">Hakkımda</Link>
            </div>
          </div>
        </aside>

        <div className="mx-auto mt-10 flex max-w-[42rem] flex-wrap items-center gap-4">
          <WhatsAppButton message={`Merhaba, "${post.title}" yazınızı okudum, bir sorum olacaktı.`} label="Soru sorun" />
          <Link href="/sik-sorulan-sorular" className="text-link text-sm">Sık sorulan sorular</Link>
        </div>
      </article>

      {relatedProducts.length ? (
        <section className="border-t border-charcoal/10 bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-4xl text-charcoal">Yazıda geçen modeller</h2>
              <Link href="/urunler" className="text-link">Tüm modeller</Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-charcoal">Okumaya devam edin</h2>
          <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-3">
            {relatedPosts.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="focus-ring group block rounded-[0.375rem]">
                  <div className="image-frame aspect-[4/3]">
                    <Image src={item.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
                  </div>
                  <p className="eyebrow mt-4 !tracking-[0.2em]">{item.category} · {item.readTime}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-charcoal group-hover:text-burgundy">{item.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
