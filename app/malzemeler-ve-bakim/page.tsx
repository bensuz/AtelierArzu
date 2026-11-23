import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { materials } from "@/lib/data";

export const metadata = publicPageMetadata({
  title: "Malzemeler ve Bakım",
  description:
    "Arzu’dan el örgüsü çantalarında kullanılan hasır ip, askı ve kapama detayları ile temizleme, kurutma ve saklama önerileri.",
  path: "/malzemeler-ve-bakim"
});

const careSteps = [
  { title: "Makinede yıkamayın", text: "Örgü çantaları makinede yıkamak formu bozar. Lekeli alanı nemli bir bezle, ovalamadan temizleyin; önce görünmeyen küçük bir alanda deneyin." },
  { title: "Düz zeminde, gölgede kurutun", text: "Temizlik sonrası çantayı destekleyerek düz bir yüzeye yatırın. Doğrudan güneş rengi soldurabilir; ısı kaynağından uzak tutun." },
  { title: "İçini boşaltıp saklayın", text: "Kullanmadığınızda içini boşaltın ve düz bir yerde saklayın. Formunu korumak gerekiyorsa içini hafifçe destekleyin." },
  { title: "Dolu hâlde asmayın", text: "Uzun süre dolu hâlde askıda kalması özellikle askı ve ağız bölümünde esnemeye yol açabilir. Ağır eşyaları dengeli yerleştirin." }
];

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/malzemeler-ve-bakim", label: "Malzemeler ve bakım" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Malzemeler ve bakım"
        title="Dokusu güzel, kullanımı rahat, bakımı sade."
        description="Her malzeme çantanın hem görünümünü hem de günlük kullanımını etkiler. Bu yüzden seçimi yalnızca renk üzerinden değil, dayanıklılık ve his üzerinden de yapıyorum. Her modelin kendi bakım notu ürün sayfasında yazar."
        size="lg"
      />

      <div className="mt-14 divide-y divide-charcoal/10 border-y border-charcoal/10">
        {materials.map((material, index) => (
          <article key={material.name} className="grid gap-4 py-10 lg:grid-cols-12 lg:gap-10">
            <p className="font-serif text-4xl italic leading-none text-burgundy/60 lg:col-span-1">0{index + 1}</p>
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">{material.name}</h2>
              <p className="mt-3 text-base leading-7 text-charcoal/80">{material.summary}</p>
            </div>
            <p className="leading-8 text-charcoal/70 lg:col-span-7">{material.details}</p>
          </article>
        ))}
      </div>

      <section className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <p className="eyebrow">Bakım</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl">Dört basit öneri</h2>
          <p className="mt-5 text-charcoal/75">
            İplik, astar ve aksesuarlar farklı bakım gerektirebilir. Çantayı tamamen yıkamadan önce modelin kendi bakım notunu kontrol edin.
          </p>
          <Link href="/blog/orgu-canta-nasil-temizlenir-ve-saklanir" className="text-link mt-6 inline-block">
            Temizleme ve saklama hakkında ayrıntılı yazı
          </Link>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2">
          {careSteps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-charcoal/10 bg-cream p-6">
              <p className="font-serif text-2xl italic text-burgundy/60">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-charcoal/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
