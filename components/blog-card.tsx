import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

type BlogCardProps = {
  post: BlogPost;
  heading?: "h2" | "h3";
};

export function BlogCard({ post, heading: Heading = "h2" }: BlogCardProps) {
  const titleId = `blog-card-${post.slug}`;
  const details = [post.category, post.readTime].filter(Boolean).join(" · ");

  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        aria-labelledby={titleId}
        className="group focus-ring flex h-full flex-col rounded-lg border border-ink/10 bg-shell hover:border-ink/40 hover:shadow-soft focus-visible:border-ink/40 motion-safe:transition-[border-color,box-shadow]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-linen">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {details && <p className="text-sm font-medium text-[#741616]">{details}</p>}
          <Heading
            id={titleId}
            className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink/90 group-hover:text-ink group-focus-visible:text-ink"
          >
            {post.title}
          </Heading>
          <p className="mb-5 mt-3 text-base leading-7 text-ink/75">{post.excerpt}</p>
          <span className="mt-auto text-sm font-semibold text-[#741616] underline decoration-transparent underline-offset-4 group-hover:text-ink group-hover:decoration-current group-focus-visible:text-ink group-focus-visible:decoration-current">
            Yazıyı oku
          </span>
        </div>
      </Link>
    </article>
  );
}
