import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

type BlogCardProps = {
  post: BlogPost;
  heading?: "h2" | "h3";
  priority?: boolean;
};

export function BlogCard({ post, heading: Heading = "h2", priority = false }: BlogCardProps) {
  const titleId = `blog-card-${post.slug}`;
  const details = [post.category, post.readTime].filter(Boolean).join(" · ");

  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        aria-labelledby={titleId}
        className="focus-ring flex h-full flex-col rounded-[0.375rem]"
      >
        <div className="image-frame aspect-[4/3]">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col pt-5">
          {details && <p className="eyebrow !tracking-[0.2em]">{details}</p>}
          <Heading
            id={titleId}
            className="mt-3 font-serif text-[1.75rem] leading-[1.1] text-charcoal group-hover:text-burgundy motion-safe:transition-colors"
          >
            {post.title}
          </Heading>
          <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-7 text-charcoal/70">{post.excerpt}</p>
          <span className="mt-4 text-sm font-semibold text-burgundy underline decoration-transparent underline-offset-4 group-hover:decoration-burgundy motion-safe:transition-colors">
            Yazıyı oku
          </span>
        </div>
      </Link>
    </article>
  );
}
