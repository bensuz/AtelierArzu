import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { publicPageMetadata } from "@/lib/metadata";
import { getBlogPost, getBlogPosts, getProducts } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";

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
            sizes="(min-width: 896px) 848px, 100vw"
            className="h-auto rounded-lg"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    }
  }
};

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

  const relatedSlugs = post.relatedProducts ?? [];
  const relatedProducts = relatedSlugs.length
    ? (await getProducts().catch((error: unknown) => {
      console.error("Could not load products for blog post", error);
      return [];
    })).filter((product) => relatedSlugs.includes(product.slug))
    : [];

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
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
        }}
      />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/blog", label: "Atölye notları" },
          { href: `/blog/${post.slug}`, label: post.title }
        ]} />
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
            alt={post.imageAlt || `${post.title} için kroşe çanta görseli`}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:leading-8 prose-p:text-ink/72">
          {typeof post.body?.[0] === "string" ? (
            post.body.map((paragraph) => <p key={String(paragraph)}>{String(paragraph)}</p>)
          ) : (
            <PortableText value={(post.body ?? []) as never} components={articleComponents} />
          )}
          {post.faq?.length ? (
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
