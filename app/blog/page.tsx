import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts } from "@/lib/sanity";

export const metadata = publicPageMetadata({
  title: "Kroşe Çanta Seçimi ve Bakımı",
  description:
    "Mini kroşe çanta seçerken ölçü ve askı boyuna nasıl bakılır? Örgünün formu nasıl korunur? Arzu’nun çanta seçimi ve bakımı üzerine notları.",
  path: "/blog"
});

const studioNotes = [
  {
    title: "Çantayı içinden başlayarak seçin",
    text: "Telefonunuzu, cüzdanınızı ve yanınızdan ayırmadığınız diğer eşyaları yan yana koyun. Çantanın dış ölçüleriyle birlikte ağız açıklığına ve askı boyuna da bakın. Omuzda kullanacaksanız askının montunuzun üzerinden rahatça geçmesi önemli."
  },
  {
    title: "Örgünün formunu koruyun",
    text: "Çantanızı kullanmadığınızda içini boşaltıp düz bir yerde saklayın. Uzun süre askıda ve dolu kalması örgüyü esnetebilir. Temizliğe başlamadan önce modelin iplik ve astarına uygun bakım notlarına göz atın."
  },
  {
    title: "Dokuyla başlayın, rengi sonra seçin",
    text: "Belirgin dokulu bir kroşe çantayı düz renk bir gömlek veya keten bir elbiseyle deneyin. Çantayı kıyafetinizle aynı renkte seçmek yerine, gardırobunuzda sık giydiğiniz iki renkle nasıl durduğuna bakın."
  }
];

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-3xl border-b border-ink/10 pb-10">
        <h1 className="font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
          Arzu’nun atölye notları
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-ink/75 sm:text-lg">
          Mini bir çanta seçerken telefonunuzun kılıfıyla birlikte ağız açıklığından
          geçip geçmediğine bakın. Askı boyu da çantanın omuzda nereye oturacağını
          değiştirir. Burada çanta seçimine ve örgünün formunu korumaya dair önerilerimi
          bulabilirsiniz.
        </p>
      </header>

      {posts.length > 0 && (
        <section aria-label="Son yazılar" className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </section>
      )}

      <section className="mt-12">
        <SectionHeading title="Kroşe çantalar için üç küçük not" />
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {studioNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-ink/10 bg-linen p-6">
              <h3 className="font-serif text-3xl font-semibold leading-tight">{note.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/75">{note.text}</p>
            </article>
          ))}
        </div>
        <Link href="/malzemeler-ve-bakim" className="focus-ring mt-7 inline-block rounded-sm font-semibold !text-olive underline underline-offset-4 hover:!text-ink focus-visible:!text-ink">
          Malzemeler ve bakım önerileri
        </Link>
      </section>
    </div>
  );
}
