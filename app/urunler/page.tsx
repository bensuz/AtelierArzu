import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getProducts } from "@/lib/sanity";

export const metadata = publicPageMetadata({
  title: "Ürünler",
  description:
    "Arzu’dan el yapımı kroşe çanta koleksiyonu: omuz çantaları, mini tote modeller ve sipariş üzerine hazırlanan tasarımlar.",
  path: "/urunler"
});

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ kategori?: string; renk?: string; durum?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const colors = Array.from(new Set(products.flatMap((product) => product.colors)));
  const availability = Array.from(new Set(products.map((product) => product.availability)));

  const filtered = products.filter((product) => {
    const categoryMatch = !params.kategori || product.category === params.kategori;
    const colorMatch = !params.renk || product.colors.includes(params.renk);
    const availabilityMatch = !params.durum || product.availability === params.durum;
    return categoryMatch && colorMatch && availabilityMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Koleksiyon"
        title="El yapımı kroşe çantalar"
        description="Arzu’nun tasarlayıp elde ördüğü küçük koleksiyonlar. Renk ve ölçü seçenekleri için ilgilendiğiniz modelin adını bize yazabilirsiniz."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-ink/10 bg-linen p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/60">
            Filtrele
          </h2>
          <FilterGroup title="Kategori" name="kategori" values={categories} active={params.kategori} />
          <FilterGroup title="Renk" name="renk" values={colors} active={params.renk} />
          <FilterGroup title="Durum" name="durum" values={availability} active={params.durum} />
          <Link
            href="/urunler"
            className="focus-ring mt-5 inline-flex rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold"
          >
            Filtreleri temizle
          </Link>
        </aside>
        <div>
          <h2 className="sr-only">Koleksiyondaki modeller</h2>
          <p className="mb-5 text-sm text-ink/62">{filtered.length} ürün gösteriliyor.</p>
          {filtered.length === 0 && (
            <p className="text-sm text-ink/70">
              {products.length ? "Bu filtrelere uyan ürün bulunamadı." : "Şu anda yayında ürün bulunmuyor."}
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  name,
  values,
  active
}: {
  title: string;
  name: string;
  values: string[];
  active?: string;
}) {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <Link
            key={value}
            href={{ pathname: "/urunler", query: { [name]: value } }}
            className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              active === value ? "bg-ink text-shell" : "bg-shell text-ink/72 hover:bg-oat"
            }`}
          >
            {value}
          </Link>
        ))}
      </div>
    </div>
  );
}
