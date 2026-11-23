import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  sizes?: string;
};

const availabilityTone: Record<Product["availability"], string> = {
  "Hazır": "text-charcoal/70",
  "Sipariş Üzerine": "text-burgundy",
  "Tükendi": "text-charcoal/50"
};

export function ProductCard({ product, priority = false, sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw" }: ProductCardProps) {
  const alt = product.imageDetails?.find((image) => image?.url === product.image)?.alt || `${product.name} el örgüsü çanta`;
  const summary = product.editorial?.intro ?? product.description;

  return (
    <article className="product-card group">
      <Link href={`/urunler/${product.slug}`} className="focus-ring block rounded-[0.375rem]">
        <div className="image-frame aspect-[4/5]">
          <Image
            src={product.image}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="product-card-image object-cover"
          />
          {product.availability === "Tükendi" && (
            <span className="absolute left-3 top-3 rounded-full bg-ivory/92 px-3 py-1 text-xs font-semibold text-charcoal">Tükendi</span>
          )}
        </div>
        <div className="pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl leading-none text-charcoal sm:text-[1.75rem]">{product.name}</h3>
            <p className="shrink-0 text-sm font-semibold tabular-nums text-charcoal">{product.price}</p>
          </div>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-charcoal/60">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className={availabilityTone[product.availability]}>{product.availability}</span>
          </p>
          <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-charcoal/70">{summary}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-burgundy underline decoration-transparent underline-offset-4 motion-safe:transition-colors group-hover:decoration-burgundy">
            Modeli incele
          </span>
        </div>
      </Link>
    </article>
  );
}
