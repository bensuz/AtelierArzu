import Image from "next/image";
import Link from "next/link";
import { CrochetLoopIcon } from "@/components/craft-icons";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card overflow-hidden rounded-lg border border-ink/10 bg-shell shadow-sm hover:shadow-soft focus-within:ring-2 focus-within:ring-olive focus-within:ring-offset-2">
      <Link href={`/urunler/${product.slug}`} className="focus-ring block">
        <div className="relative aspect-[4/5] overflow-hidden bg-linen">
          <Image
            src={product.image}
            alt={product.imageDetails?.find((image) => image?.url === product.image)?.alt || `${product.name} el yapımı kroşe çanta`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="product-card-image object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full bg-shell/92 px-3 py-1 text-xs font-semibold text-ink">
            {product.availability}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-olive">
                <CrochetLoopIcon className="h-4 w-4 text-clay" />
                {product.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
                {product.name}
              </h3>
            </div>
            <p className="shrink-0 text-sm font-semibold text-ink">{product.price}</p>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/66">
            {product.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
