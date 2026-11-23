import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getProducts } from "@/lib/sanity";

export const metadata = publicPageMetadata({
  title: "El Yapımı Kroşe Çantalar",
  description:
    "Arzu’dan el örgüsü çanta koleksiyonu: omuz çantaları, mini tote modeller ve renkli hasır ip tasarımlar. Fiyat, ölçü ve askı bilgileriyle.",
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
  const colors = Array.from(new Set(products.flatMap((product) => product.colors))).sort((a, b) => a.localeCompare(b, "tr"));
  const availability = Array.from(new Set(products.map((product) => product.availability)));
  const hasActiveFilter = Boolean(params.kategori || params.renk || params.durum);

  const filtered = products.filter((product) => {
    const categoryMatch = !params.kategori || product.category === params.kategori;
    const colorMatch = !params.renk || product.colors.includes(params.renk);
    const availabilityMatch = !params.durum || product.availability === params.durum;
    return categoryMatch && colorMatch && availabilityMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Koleksiyon"
        title="Elde örülen çantalar"
        description="Her modeli kendim tasarlayıp örüyorum. Beğendiğiniz çantanın adını WhatsApp’tan yazın; renk seçeneklerini, hazırlık süresini ve toplam tutarı birlikte netleştirelim."
        size="lg"
      />

      {products.length > 0 && (
        <div className="mt-10 border-y border-charcoal/10 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
            <FilterGroup title="Kategori" name="kategori" values={categories} active={params.kategori} current={params} />
            <FilterGroup title="Renk" name="renk" values={colors} active={params.renk} current={params} />
            {availability.length > 1 && (
              <FilterGroup title="Durum" name="durum" values={availability} active={params.durum} current={params} />
            )}
            {hasActiveFilter && (
              <Link href="/urunler" className="text-link self-start text-sm lg:ml-auto lg:mt-7">
                Filtreleri temizle
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="sr-only">Koleksiyondaki modeller</h2>
        <p className="text-sm text-charcoal/60">
          {filtered.length} model{hasActiveFilter ? " bu seçime uyuyor" : ""}.
        </p>
        {filtered.length === 0 && (
          <p className="mt-4 text-charcoal/70">
            {products.length ? "Bu filtrelere uyan model bulunamadı." : "Şu anda yayında ürün bulunmuyor."}
          </p>
        )}
        <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 3} />
          ))}
        </div>
      </div>

      <section className="mt-20 grid gap-8 rounded-lg bg-cream px-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10">
        <div>
          <h2 className="font-serif text-3xl text-charcoal">Aradığınız renk ya da ölçü yok mu?</h2>
          <p className="mt-2 max-w-xl leading-7 text-charcoal/75">
            Bazı modeller iplik stoğuna göre farklı renklerde çalışılabiliyor. Beğendiğiniz modelin adını ve düşündüğünüz rengi yazın; uygun seçenekleri paylaşayım.
          </p>
        </div>
        <Link href="/iletisim" className="btn-secondary">Bana yazın</Link>
      </section>
    </div>
  );
}

function FilterGroup({
  title,
  name,
  values,
  active,
  current
}: {
  title: string;
  name: string;
  values: string[];
  active?: string;
  current: Record<string, string | undefined>;
}) {
  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-charcoal/55">{title}</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {values.map((value) => {
          const isActive = active === value;
          const query = Object.fromEntries(
            Object.entries({ ...current, [name]: isActive ? undefined : value }).filter(([, v]) => Boolean(v))
          ) as Record<string, string>;
          return (
            <li key={value}>
              <Link
                href={{ pathname: "/urunler", query }}
                aria-pressed={isActive}
                className={`focus-ring inline-flex min-h-9 items-center rounded-full border px-3.5 py-1 text-sm motion-safe:transition-colors ${
                  isActive
                    ? "border-burgundy bg-burgundy text-ivory"
                    : "border-charcoal/15 bg-ivory text-charcoal/80 hover:border-charcoal/40"
                }`}
              >
                {value}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
