import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Atelier Arzu blog: kroşe çanta bakımı, kombin önerileri, el yapımı çanta seçimi ve güncel stil notları.",
  alternates: { canonical: "/blog" }
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Blog"
        title="Kroşe çanta rehberleri"
        description="Atelier Arzu'dan bakım, stil ve satın alma kararını kolaylaştıran Türkçe içerikler."
      />
      <div className="mt-10 grid gap-7 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-lg border border-ink/10 bg-shell">
            <Link href={`/blog/${post.slug}`} className="focus-ring block">
              <div className="relative aspect-[4/3] bg-linen">
                <Image
                  src={post.image}
                  alt={`${post.title} blog görseli`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                  {post.category} · {post.readTime}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink/66">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-olive">
                  Yazıyı oku
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
