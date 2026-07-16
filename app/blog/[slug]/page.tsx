import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { getBlogPost, getBlogPosts, getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image, alt: post.title }]
    }
  };
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const products = await getProducts();
  if (!post) notFound();

  const relatedProducts = products.filter((product) =>
    post.relatedProducts.includes(product.slug)
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image),
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
        }}
      />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Sayfa yolu" className="mb-8 text-sm text-ink/58">
          <Link href="/" className="hover:text-ink">Ana sayfa</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span>{post.title}</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
          {post.category} · {post.readTime}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/68">{post.excerpt}</p>
        <div className="mt-8 text-sm text-ink/56">
          {new Intl.DateTimeFormat("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }).format(new Date(post.publishedAt))}{" "}
          · {post.author}
        </div>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg bg-linen">
          <Image
            src={post.image}
            alt={`${post.title} için kroşe çanta görseli`}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:leading-8 prose-p:text-ink/72">
          {typeof post.body[0] === "string" ? (
            post.body.map((paragraph) => <p key={String(paragraph)}>{String(paragraph)}</p>)
          ) : (
            <PortableText value={post.body as never} />
          )}
          {post.faq.length ? (
            <>
              <h2>Sık Sorulanlar</h2>
              {post.faq.map((item) => (
                <section key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </section>
              ))}
            </>
          ) : null}
        </div>
      </article>
      {relatedProducts.length ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-semibold">Yazıda geçen ürünler</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
