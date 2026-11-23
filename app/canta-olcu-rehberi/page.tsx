import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata = publicPageMetadata({
  title: "Kroşe Çanta Ölçü Rehberi",
  description: "Mini kroşe çantaya ne sığar? Çantanın genişliğini, ağız açıklığını ve askı boyunu kendi eşyalarınızla nasıl karşılaştıracağınızı öğrenin.",
  path: "/canta-olcu-rehberi"
});

const checks = [
  {
    title: "İçine ne sığar?",
    text: "Telefonu kılıfıyla, cüzdanı dolu hâliyle ölçün. Örgü kalınlığı ve varsa astar kullanılabilir iç alanı etkiler. Anahtarınızı da ekleyip eşyaların birlikte ne kadar yer kapladığına bakın."
  },
  {
    title: "Ağız açıklığı",
    text: "Gövdenin en geniş yeriyle çantanın girişi farklı olabilir. Sert ve uzun bir eşya taşıyacaksanız düz biçimde girişten geçebildiğini kontrol edin."
  },
  {
    title: "Askı boyu",
    text: "Rahat kullandığınız bir çantayı referans alın. Askının toplam boyu ile askının tepe noktası ve çantanın üst kenarı arasındaki düşüş farklı ölçülerdir."
  }
];

export default function BagSizeGuidePage() {
  return (
    <article className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/canta-olcu-rehberi", label: "Çanta ölçü rehberi" }]} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <header>
          <p className="eyebrow">Ölçü rehberi</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">Kroşe çanta ölçü rehberi</h1>
          <p className="mt-6 text-lg leading-8 text-charcoal/80">
            Yanınızda en çok taşıdığınız eşyaları çıkarın. Yalnızca çantanın dış ölçülerine bakmak yerine, bu eşyaların çantanın ağzından geçip geçmeyeceğini de düşünün.
          </p>
          <p className="mt-4 leading-7 text-charcoal/70">
            Ürün sayfalarındaki ölçüler çantanın dış ölçüleridir. Emin değilseniz modelin adını ve taşımak istediğiniz eşyanın ölçüsünü bana gönderin; birlikte kontrol edelim.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton message="Merhaba, bir modelin ölçüsü hakkında soru sormak istiyorum." label="Ölçü hakkında sorun" />
            <Link href="/urunler" className="btn-secondary">Model ölçülerini karşılaştır</Link>
          </div>
        </header>
        <ol className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {checks.map((check, index) => (
            <li key={check.title} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr]">
              <span className="font-serif text-4xl italic leading-none text-burgundy/60">0{index + 1}</span>
              <div>
                <h2 className="font-serif text-3xl leading-tight text-charcoal">{check.title}</h2>
                <p className="mt-3 leading-8 text-charcoal/75">{check.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-16 max-w-2xl text-sm leading-6 text-charcoal/60">
        İlgili yazı:{" "}
        <Link href="/blog/mini-krose-cantaya-ne-sigar" className="text-link">Mini kroşe çantaya ne sığar?</Link>
        {" · "}
        <Link href="/sik-sorulan-sorular" className="text-link">Sık sorulan sorular</Link>
      </p>
    </article>
  );
}
