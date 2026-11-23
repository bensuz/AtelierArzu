import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getBlogPosts } from "@/lib/sanity";

export const metadata = publicPageMetadata({
  title: "Atölye Notları · Kroşe Çanta Seçimi ve Bakımı",
  description:
    "Mini kroşe çanta seçerken ölçü ve askı boyuna nasıl bakılır? Örgünün formu nasıl korunur? Arzu’nun çanta seçimi, malzeme ve bakım üzerine notları.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [lead, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/blog", label: "Atölye notları" }]} />
      <header className="max-w-3xl">
        <p className="eyebrow">Atölye notları</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl lg:text-7xl">
          Çanta seçimi, malzeme ve bakım üzerine notlarım
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal/80">
          Mini bir çanta seçerken telefonunuzun kılıfıyla birlikte ağız açıklığından geçip geçmediğine bakın; askı boyu çantanın omuzda nereye oturacağını değiştirir. Burada seçim, kullanım ve bakım üzerine kısa, pratik yazılar var.
        </p>
        {categories.length > 1 && (
          <p className="mt-5 text-sm text-charcoal/60">Konular: {categories.join(" · ")}</p>
        )}
      </header>

      {lead && (
        <section aria-label="Öne çıkan yazı" className="mt-14 border-t border-charcoal/10 pt-10">
          <BlogCard post={lead} priority />
        </section>
      )}

      {rest.length > 0 && (
        <section aria-label="Diğer yazılar" className="mt-16 grid gap-x-6 gap-y-14 border-t border-charcoal/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => <BlogCard key={post.slug} post={post} />)}
        </section>
      )}

      <section className="mt-20 grid gap-6 rounded-lg bg-cream px-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10">
        <div>
          <h2 className="font-serif text-3xl text-charcoal">Bakım notlarını tek sayfada görmek ister misiniz?</h2>
          <p className="mt-2 max-w-xl leading-7 text-charcoal/75">Hasır ip, askı ve kapama detayları ile temizleme ve saklama önerileri.</p>
        </div>
        <Link href="/malzemeler-ve-bakim" className="btn-secondary">Malzemeler ve bakım</Link>
      </section>
    </div>
  );
}
